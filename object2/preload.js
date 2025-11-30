"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    onPoints: (callback) => electron_1.ipcRenderer.on("points", (_, points) => callback(points))
});
