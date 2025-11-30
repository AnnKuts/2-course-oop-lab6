"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: { preload: path_1.default.join(__dirname, "preload.js") }
    });
    win.loadFile("index.html");
    win.webContents.once("did-finish-load", () => {
        const raw = electron_1.clipboard.readText();
        try {
            const parsed = JSON.parse(raw);
            win.webContents.send("data", parsed);
        }
        catch (err) {
            console.error('Failed to parse clipboard JSON:', err);
            win.webContents.send("data", []);
        }
    });
}
electron_1.app.whenReady().then(createWindow);
