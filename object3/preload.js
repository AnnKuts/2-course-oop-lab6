"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    onData: (callback) => electron_1.ipcRenderer.on("data", (_, points) => callback(points))
});
