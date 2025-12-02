import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

let win: BrowserWindow | null = null;
let childObject2: ChildProcessWithoutNullStreams | null = null;
let childObject3: ChildProcessWithoutNullStreams | null = null;

function killAll() {
  console.log("Killing all processes...");

  try { if (win) win.close(); } catch {}
  try { if (childObject2) childObject2.kill("SIGTERM"); } catch {}
  try { if (childObject3) childObject3.kill("SIGTERM"); } catch {}

  process.exit(0);
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

  win.on("closed", () => killAll());
}

app.whenReady().then(createWindow);

ipcMain.handle("start-object2", async (_, n, min, max) => {
  if (childObject2) {
    try {
      childObject2.kill("SIGTERM");
    } catch {}
    childObject2 = null;
  }

  await new Promise(resolve => setTimeout(resolve, 100));

  childObject2 = spawn(process.execPath, [
    path.join(__dirname, "object2_main.js"),
    String(n),
    String(min),
    String(max)
  ]);

  childObject2.stdout?.on('data', (data) => {
    console.log(`object2 stdout: ${data}`);
  });

  childObject2.stderr?.on('data', (data) => {
    console.error(`object2 stderr: ${data}`);
  });

  childObject2.on("exit", (code) => {
    console.log(`object2 exited with code ${code}`);
    killAll();
  });

  return true;
});

ipcMain.handle("start-object3", async () => {
  if (childObject3) {
    try {
      childObject3.kill("SIGTERM");
    } catch {}
    childObject3 = null;
  }

  await new Promise(resolve => setTimeout(resolve, 100));

  childObject3 = spawn(process.execPath, [
    path.join(__dirname, "object3_main.js")
  ]);

  childObject3.stdout?.on('data', (data) => {
    console.log(`object3 stdout: ${data}`);
  });

  childObject3.stderr?.on('data', (data) => {
    console.error(`object3 stderr: ${data}`);
  });

  childObject3.on("exit", (code) => {
    console.log(`object3 exited with code ${code}`);
    killAll();
  });

  return true;
});