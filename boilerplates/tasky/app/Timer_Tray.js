const electron = require('electron');
const { Tray , app, Menu} = electron;

class TimerTray extends Tray { // all the position calculation is differ from linux or Mac
constructor(iconPath, mainWindow) {
super(iconPath);
    this.mainWindow = mainWindow;

    this.setToolTip('Timer App'); // is not working in Linux
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this))
    }    

    onClick(event, bounds) {
        const {x ,y} = bounds;
        console.log(x ,y);
    
        const { height, width } = this.mainWindow.getBounds();
        console.log( height, width);
    
        if(this.mainWindow.isVisible()) {
            this.mainWindow.hide();      
        }else {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: x - width /2,
                y: yPosition,
                height,
                width,
            }) 
            this.mainWindow.show();
        }       
    }
    onRightClick() {
        const menuConfig  = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]) ;
        this.popUpContextMenu(menuConfig);
    }
};

module.exports =  TimerTray;