import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  onPoints: (callback: (points: any[]) => void) =>
    ipcRenderer.on("points", (_, points) => callback(points))
});
