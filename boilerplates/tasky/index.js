const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray } = electron;

let mainWindow, tray;

app.on('ready', () => {
mainWindow =  new BrowserWindow({webPreferences: {nodeIntegration: true},
                                height:500,
                                width:300,
                                frame:false,
                                resizable:false,
                                show:false,
                            })
mainWindow.loadURL(`file://${__dirname}/src/index.html`);

const iconName = process.platform === 'win32' ? 'window-icon.png' : 'iconTemplate.png';
const iconPath = path.join(__dirname,`./src/assets/${iconName}`);
tray = new Tray(iconPath);
tray.on('click', (event, bounds)=> {
    console.log(bounds.x, bounds.y);
    //Click Event bounds

    //window height and width
    const {height ,width} = mainWindow.getBounds();

    const {x ,y} = bounds; 
    if(mainWindow.isVisible()) {
    mainWindow.hide();
    } else {
    const yPosition = process.platform === 'darwin' ? y : y - height; 
    mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width, 
    })
    mainWindow.show();
}
})
});
 