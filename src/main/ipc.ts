import { IPCEvents } from "common/IPCEvents";
import IPeeSee from "common/IPeeSee";
import { ipcMain } from "electron";

const ipc = new IPeeSee(ipcMain);

ipc.reply(IPCEvents.FOO, async (data: string) => {
  // tslint:disable-next-line:no-console
  console.log("data", data);
  return { response: 42 };
});
