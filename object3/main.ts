import { app, BrowserWindow, clipboard } from "electron";
import path from "path";
import fs from 'fs';

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: { preload: path.join(__dirname, "object3_preload.js") }
  });

  const projectIndex = path.resolve(__dirname, '..', 'object3', 'index.html');
  if (!fs.existsSync(projectIndex)) console.error('object3 index.html not found at', projectIndex);

  win.loadFile(projectIndex);
  win.webContents.once("did-finish-load", () => {
    const raw = clipboard.readText();
    try {
      const parsed = JSON.parse(raw);
      win.webContents.send("data", parsed);
    } catch (err) {
      console.error('Failed to parse clipboard JSON:', err);
      win.webContents.send("data", []);
    }
  });
  win.on("closed", () => {
    process.exit(0);
  });
}

app.whenReady().then(createWindow);
