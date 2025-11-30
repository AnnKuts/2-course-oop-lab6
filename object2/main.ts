import { app, BrowserWindow, clipboard } from "electron";
import path from "path";

let win: BrowserWindow;

const [,, nArg, minArg, maxArg] = process.argv;
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
clipboard.writeText(JSON.stringify(points));

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "object2_preload.js"),
      contextIsolation: true,
      sandbox: false
    }
  });

  const htmlPath = path.resolve(__dirname, "..", "object2", "index.html");
  win.loadFile(htmlPath);

  win.webContents.once("did-finish-load", () => {
    win.webContents.send("points", points);
  });

  win.on("closed", () => process.exit(0));
}

app.whenReady().then(createWindow);
