"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
let win = null;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
        }
    });
    // When running from dist, __dirname is dist/lab6. The project's HTML is in ../../lab6/index.html
    const distIndex = path_1.default.join(__dirname, 'index.html'); // dist/lab6/index.html
    const projectIndex = path_1.default.resolve(__dirname, '..', '..', 'lab6', 'index.html'); // project/lab6/index.html
    // Prefer the project (source) index.html if it exists (so we don't need to copy HTML into dist)
    let indexToLoad;
    if (fs_1.default.existsSync(projectIndex)) {
        indexToLoad = projectIndex;
    }
    else if (fs_1.default.existsSync(distIndex)) {
        indexToLoad = distIndex;
    }
    else {
        console.error('index.html not found in dist or project folder', { distIndex, projectIndex });
        // fallback to dist path so Electron shows the same error, but we logged helpful info
        indexToLoad = distIndex;
    }
    win.loadFile(indexToLoad);
}
electron_1.app.whenReady().then(createWindow);
electron_1.ipcMain.handle("start-object2", async (_, n, min, max) => {
    (0, child_process_1.spawn)(process.execPath, [
        path_1.default.join(__dirname, '..', 'object2', 'main.js'),
        n.toString(),
        min.toString(),
        max.toString()
    ]);
    return true;
});
electron_1.ipcMain.handle("start-object3", async () => {
    (0, child_process_1.spawn)(process.execPath, [
        path_1.default.join(__dirname, '..', 'object3', 'main.js')
    ]);
    return true;
});
