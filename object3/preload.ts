import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  onData: (callback: (points: any[]) => void) =>
    ipcRenderer.on("data", (_, points) => callback(points))
});
