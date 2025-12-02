import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld("api", {
  execute: (data: { n: number, min: number, max: number }) => ipcRenderer.invoke("execute", data),
  cancel: () => ipcRenderer.invoke("cancel"),
});
