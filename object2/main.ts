import { app, BrowserWindow, clipboard } from "electron";
import path from "path";

let win: BrowserWindow;

function generateAndSendData(nStr: string, minStr: string, maxStr: string) {
  const n = Number(nStr);
  const min = Number(minStr);
  const max = Number(maxStr);

  if (isNaN(n) || isNaN(min) || isNaN(max)) {
    console.error("Invalid input for object2:", { n, min, max });
    return;
  }

  const arr: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const v = min + Math.random() * (max - min);
    arr.push({ x: i + 1, y: Number(v.toFixed(2)) });
  }

  const jsonData = JSON.stringify(arr);
  clipboard.writeText(jsonData);
  console.log("Written to clipboard:", jsonData.substring(0, 100) + "...");
  console.log("CLIPBOARD_READY");

  if (win) {
    win.webContents.send("points", arr);
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    x: 0,
    y: 350,
    webPreferences: {
      preload: path.join(__dirname, "object2_preload.js"),
      contextIsolation: true,
      sandbox: false
    }
  });

  const htmlPath = path.resolve(__dirname, "..", "object2", "index.html");
  win.loadFile(htmlPath);

  win.on("closed", () => {
    process.exit(0);
  });

  const [,, nArg, minArg, maxArg] = process.argv;
  win.webContents.once("did-finish-load", () => {
    generateAndSendData(nArg, minArg, maxArg);
  });

  process.stdin.on('data', (data) => {
    const [n, min, max] = data.toString().trim().split(' ');
    generateAndSendData(n, min, max);
  });
}

app.whenReady().then(createWindow);