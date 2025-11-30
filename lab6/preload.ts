import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld("api", {
  startObject2: (n: number, min: number, max: number) =>
    ipcRenderer.invoke("start-object2", n, min, max),
  startObject3: () => ipcRenderer.invoke("start-object3")
});
