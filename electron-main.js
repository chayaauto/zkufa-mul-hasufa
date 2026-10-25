// Electron entry: opens the game (index.html) in its own window.
const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

// the game plays sounds before the first click (intro, timer ticks)
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 600,
    backgroundColor: "#d2e8f8",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // the expiry screen's mailto link opens the mail app instead of navigating the game window
  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("mailto:")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  win.loadFile(path.join(__dirname, "index.html"));
  win.once("ready-to-show", () => {
    win.maximize();
    win.show();
  });

  // F11 toggles full screen (also on Mac, alongside the green button); Esc leaves it
  win.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    if (input.key === "F11") {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    } else if (input.key === "Escape" && win.isFullScreen()) {
      win.setFullScreen(false);
    }
  });
}

app.whenReady().then(() => {
  // no menu bar on Windows; the Mac keeps its standard app menu (Cmd+Q etc.)
  if (process.platform !== "darwin") Menu.setApplicationMenu(null);
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
