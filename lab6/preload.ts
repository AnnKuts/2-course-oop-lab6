import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  startDialog: () => ipcRenderer.invoke('start-dialog'),
});

