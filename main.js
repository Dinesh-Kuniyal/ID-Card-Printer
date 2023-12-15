const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 900,
    // The lines below solved the issue
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('components/index.html')
}

app.whenReady().then(() => {
  createWindow()
})