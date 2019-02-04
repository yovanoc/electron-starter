import { BrowserWindow, Event, IpcMain, IpcRenderer } from "electron";
import { IIPCResponse, IPCError, IPCResponse } from "./types";

const PROCESS_TYPE_MAIN: boolean = process.type === "browser";
const PROCESS_TYPE_RENDERER: boolean = process.type === "renderer";

export interface IDataResponse<T> {
  response?: T;
  IPC_RESPONSE: IIPCResponse;
}

export default class IPeeSee {
  private ipc: IpcRenderer | IpcMain;
  private window?: BrowserWindow;

  constructor(ipc: IpcRenderer | IpcMain, window?: BrowserWindow) {
    this.ipc = ipc;
    this.window = window;
  }

  /**
   * @param {string} channel - A channel we want to send a message to
   * @param {*} [data] - Data you want to send
   * @param {{ window?: BrowserWindow; timeout?: number; reply?: boolean }} [options]
   * @param browserWindow - A window you want to send the message to. If your application has only
   * one window, you can pass its reference to the constructor and ignore this argument further on.
   * Moreover, this parameter has higher precedence then the argument passed to the constructor, so
   * feel safe to use it in conjunction if you maybe have multiple windows but mostly communication
   * to only one of them.
   * @param timeout - An optional timeout you can specify how long you want to wait for the reply
   * before removing the listener
   * @reply - If you want to send a message without waiting for reply, set this to false
   * @returns {Promise<{}>}
   * @memberof IPeeSee
   */
  public send<T, U>(
    channel: string,
    data?: U,
    options?: { window?: BrowserWindow; timeout?: number; reply?: boolean }
  ): Promise<IDataResponse<T>> {
    return new Promise((resolve, reject) => {
      const opts = options ? options : {};

      const window = opts.window || this.window;
      const replyChannel = this.__addReplySuffix(channel);
      let timeoutId: NodeJS.Timeout | null = null;

      const shouldReply =
        typeof opts.reply !== "boolean" ||
        (typeof opts.reply === "boolean" && opts.reply);

      if (shouldReply) {
        if (opts && opts.timeout) {
          const timeoutDuration = opts.timeout * 1000;

          timeoutId = setTimeout(() => {
            this.__removeAllListeners(replyChannel);

            resolve(
              new IPCResponse(
                408,
                `Timed out after ${timeoutDuration *
                  0.001}s on channel ${replyChannel}.`
              )
            );
          }, timeoutDuration);
        }

        this.ipc.on(
          replyChannel,
          (_event: Event, response?: { data: T; error?: any }) => {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            this.__removeAllListeners(replyChannel);
            if (response && response.error) {
              reject(new IPCError(response.error));
            } else if (!response) {
              resolve(
                new IPCResponse(
                  204,
                  `Got an undefined reply from ${replyChannel}. This means that you are listening for a reply but not returning anything from ${replyChannel}. You should probably remove this listener and send the message one way, without waiting for the reply.`
                )
              );
            } else {
              resolve({ ...response, ...new IPCResponse(200) });
            }
          }
        );
      }

      if (PROCESS_TYPE_RENDERER) {
        const ipc = this.ipc as IpcRenderer;
        ipc.send(channel, data);
      }

      if (PROCESS_TYPE_MAIN && window && window.webContents) {
        window.webContents.on("did-finish-load", () => {
          window.webContents.send(channel, data);
        });
      }
    });
  }

  /**
   * Adds a listener that replies to a given channel
   * @param {string} channel - A channel to listen on
   * @param {(data: any) => any} cb - To reply back, it's mandatory to return from this callback
   * @returns {() => void}
   * @memberof IPeeSee
   */
  public reply<T, U>(
    channel: string,
    cb: (data: T) => Promise<{ response: U }>
  ): () => void {
    const listener = async (event: Event, data: T) => {
      const response = await cb(data);
      if (PROCESS_TYPE_MAIN) {
        this.replyRenderer(event, channel, response);
      }

      if (PROCESS_TYPE_RENDERER) {
        this.__replyMain(channel, response);
      }
    };

    this.ipc.on(channel, listener);

    return () => {
      this.ipc.removeListener(channel, listener);
    };
  }

  private replyRenderer<T>(event: Event, channel: string, data: T) {
    const window = BrowserWindow.fromWebContents(event.sender);
    const isWindowsDestroyed = window && window.isDestroyed();

    if (!isWindowsDestroyed) {
      event.sender.send(this.__addReplySuffix(channel), data);
    }
  }

  private __replyMain<T>(channel: string, data: T) {
    const ipc = this.ipc as IpcRenderer;
    ipc.send(this.__addReplySuffix(channel), data);
  }

  private __addReplySuffix(channelName: string) {
    return `${channelName}-reply`;
  }

  private __removeAllListeners(channelName: string) {
    this.ipc.removeAllListeners(channelName);
  }
}
