"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    startObject2: (n, min, max) => electron_1.ipcRenderer.invoke("start-object2", n, min, max),
    startObject3: () => electron_1.ipcRenderer.invoke("start-object3")
});
