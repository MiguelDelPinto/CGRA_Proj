/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI for textures
        this.gui.add(this.scene, 'wrapTextures').name('Wrap Textures');

        //Dropdown element in GUI for lighting
        this.gui.add(this.scene, 'timeOfDay', this.scene.timeIDs).name('Time of Day').onChange(this.scene.updateTimeOfDay.bind(this.scene));

        return true;
    }
}