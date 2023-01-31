require('update-electron-app')();

const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('path');

autoUpdater.on('update-downloaded', (info) => {
    autoUpdater.quitAndInstall();
});

if (app.isPackaged) {
    autoLaunch.isEnabled().then(function(isEnabled) {
      if (isEnabled) return;
      autoLaunch.enable();
    }).catch(function (err) {
      throw err;
    });
  
    autoUpdater.checkForUpdates();
}

function createWindow () {
  const win = new BrowserWindow({
    width: 1800,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.removeMenu(true);

  win.setIcon( path.join(__dirname, "/icons/Icons/lifters-icon-rounded.png") )

  win.loadURL("https://trainers.lifters.app");
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
