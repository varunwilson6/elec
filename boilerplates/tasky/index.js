const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/Timer_Tray')
const { app, ipcMain } = electron;
const MainWindow = require('./app/main_window');

let mainWindow, tray;

app.on('ready', () => {
console.log(app.dock);
// app.dock.hide() - This fucntion is not working in linux
const mainWindowParams = {};
mainWindowParams.URL = `file://${__dirname}/src/index.html`;
mainWindowParams.creator = {webPreferences: {nodeIntegration: true,
                            backgroundThrottling:false},
                              skipTaskbar: true, 
                              height:500,
                              width:300,
                              frame:false,
                              resizable:false,
                              show:false,
                            };

mainWindow =  new MainWindow(mainWindowParams);

const iconName = process.platform === 'win32' ? 'window-icon.png' : 'iconTemplate.png';
const iconPath = path.join(__dirname,`./src/assets/${iconName}`);
tray = new TimerTray(iconPath, mainWindow);

});

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
});