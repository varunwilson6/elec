const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(mainWindowParams) {
        super(mainWindowParams.creator);
        this.loadURL(mainWindowParams.URL);
        this.on('blur', this.onBlur.bind(this))
    }
    onBlur() {
        this.hide();
    }
} 

module.exports = MainWindow;