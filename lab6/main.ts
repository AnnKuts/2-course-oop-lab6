import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

let lab6Win: BrowserWindow | null = null;
let dialogWin: BrowserWindow | null = null;
let object2Process: ChildProcessWithoutNullStreams | null = null;
let object3Process: ChildProcessWithoutNullStreams | null = null;

function killAll() {
  console.log("Killing all child processes...");
  if (object2Process) {
    object2Process.kill("SIGTERM");
  }
  if (object3Process) {
    object3Process.kill("SIGTERM");
  }
  app.quit();
}

function createLab6Window() {
  lab6Win = new BrowserWindow({
    width: 400,
    height: 300,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, 'lab6_preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  lab6Win.loadFile(path.resolve(__dirname, '..', 'lab6', 'index.html'));

  lab6Win.on('closed', () => {
    killAll();
  });
}

app.whenReady().then(createLab6Window);

ipcMain.handle('start-dialog', () => {
  if (dialogWin) {
    dialogWin.focus();
    return;
  }

  dialogWin = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'dialogWindow_preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  dialogWin.loadFile(path.resolve(__dirname, '..', 'dialogWindow', 'index.html'));

  dialogWin.on('closed', () => {
    dialogWin = null;
  });
});

ipcMain.handle('execute', (_, data: { n: number, min: number, max: number }) => {
  const { n, min, max } = data;

  if (object2Process) {
    object2Process.stdin.write(`${n} ${min} ${max}\n`);
  } else {
    object2Process = spawn(process.execPath, [path.join(__dirname, "object2_main.js"), String(n), String(min), String(max)], { stdio: ['pipe', 'pipe', 'pipe'] });
    object2Process.on("exit", () => { object2Process = null; });
  }

  if (object3Process) {
    setTimeout(() => {
      object3Process?.stdin.write('update\n');
    }, 200);
  } else {
    setTimeout(() => {
      object3Process = spawn(process.execPath, [path.join(__dirname, "object3_main.js")], { stdio: ['pipe', 'pipe', 'pipe'] });
      object3Process.on("exit", () => { object3Process = null; });
    }, 200);
  }

  if (dialogWin) {
    dialogWin.close();
  }
});

ipcMain.handle('cancel', () => {
  if (dialogWin) {
    dialogWin.close();
  }
});

