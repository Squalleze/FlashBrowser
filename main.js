const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, 'libpepflashplayer.so'));
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169');

const DEBUG = true;

app.on('ready', () => {
  let win = new BrowserWindow({ width: 960, height: 720, webPreferences: { plugins: true } });
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', () => {
    win = null;
  });

  win.setMenu(null);
  if (DEBUG) {
    win.webContents.openDevTools();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win === null) createWindow();
});