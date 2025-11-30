"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let win;
const [, , nArg, minArg, maxArg] = process.argv;
const n = Number(nArg);
const min = Number(minArg);
const max = Number(maxArg);
function generatePoints() {
    const arr = [];
    for (let i = 0; i < n; i++) {
        const v = min + Math.random() * (max - min);
        arr.push({ x: i + 1, y: Number(v.toFixed(2)) });
    }
    return arr;
}
const points = generatePoints();
electron_1.clipboard.writeText(JSON.stringify(points));
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: { preload: path_1.default.join(__dirname, "preload.js") }
    });
    win.loadFile("index.html");
    win.webContents.once("did-finish-load", () => {
        win.webContents.send("points", points);
    });
}
electron_1.app.whenReady().then(createWindow);
