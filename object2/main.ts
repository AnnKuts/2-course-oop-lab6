import { app, BrowserWindow, clipboard } from "electron";
import path from "path";

let win: BrowserWindow;

const [,, nArg, minArg, maxArg] = process.argv;
console.log("object2 debug");
console.log("Raw args:", process.argv);
console.log("nArg:", nArg, "minArg:", minArg, "maxArg:", maxArg);

const n = Number(nArg);
const min = Number(minArg);
const max = Number(maxArg);

console.log("Parsed n:", n, "min:", min, "max:", max);

function generatePoints() {
  const arr: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const v = min + Math.random() * (max - min);
    arr.push({ x: i + 1, y: Number(v.toFixed(2)) });
  }
  return arr;
}

const points = generatePoints();
console.log("Generated points:", points);

const jsonData = JSON.stringify(points);
clipboard.writeText(jsonData);
console.log("Written to clipboard:", jsonData.substring(0, 100) + "...");

console.log("CLIPBOARD_READY");

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
  console.log("Loading HTML from:", htmlPath);

  win.loadFile(htmlPath);

  win.webContents.once("did-finish-load", () => {
    console.log("Window loaded, sending points:", points);
    win.webContents.send("points", points);
  });

  win.on("closed", () => {
    console.log("object2 window closed");
    process.exit(0);
  });
}

app.whenReady().then(createWindow);