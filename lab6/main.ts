import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

let win: BrowserWindow | null = null;
let childObject2: ChildProcessWithoutNullStreams | null = null;
let childObject3: ChildProcessWithoutNullStreams | null = null;

let isQuitting = false;

function killAll() {
  if (isQuitting) return;
  isQuitting = true;

  console.log("Killing all processes...");

  try { if (childObject2) childObject2.kill("SIGTERM"); } catch {}
  try { if (childObject3) childObject3.kill("SIGTERM"); } catch {}

  app.quit();
}

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'lab6_preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.resolve(__dirname, "..", "lab6", "index.html"));

  win.on("closed", () => {
    win = null;
    killAll();
  });
}

app.whenReady().then(createWindow);

ipcMain.handle("start-object2", async (_, n, min, max) => {
  if (childObject2) {
    childObject2.stdin.write(`${n} ${min} ${max}\n`);
    return true;
  }

  childObject2 = spawn(process.execPath, [
    path.join(__dirname, "object2_main.js"),
    String(n),
    String(min),
    String(max)
  ], { stdio: ['pipe', 'pipe', 'pipe'] });

  childObject2.on("exit", () => {
    childObject2 = null;
  });

  return new Promise<boolean>((resolve) => {
    const onData = (data: Buffer) => {
      if (data.toString().includes("CLIPBOARD_READY")) {
        childObject2?.stdout?.removeListener('data', onData);
        resolve(true);
      }
    };
    childObject2.stdout?.on('data', onData);
  });
});

ipcMain.handle("start-object3", async () => {
  if (childObject3) {
    childObject3.stdin.write('update\n');
    return true;
  }

  childObject3 = spawn(process.execPath, [
    path.join(__dirname, "object3_main.js")
  ], { stdio: ['pipe', 'pipe', 'pipe'] });

  childObject3.on("exit", () => {
    childObject3 = null;
  });

  return true;
});