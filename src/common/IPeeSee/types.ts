export type IPCResponseType = "IPC_RESPONSE" | "IPC_ERROR";

export interface IIPCResponse {
  type: IPCResponseType;
  statusCode: number;
  message?: string;
}

export class IPCResponse {
  public IPC_RESPONSE: IIPCResponse;

  constructor(statusCode: number, message?: string) {
    this.IPC_RESPONSE = {
      message,
      statusCode,
      type: "IPC_RESPONSE"
    };
  }
}

// tslint:disable-next-line:max-classes-per-file
export class IPCError extends Error {
  public type: IPCResponseType;
  public error: any;
  constructor(error: any, ...params: any) {
    super(...params);
    this.type = "IPC_ERROR";
    this.error = error;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, IPCError);
    }
  }
}
