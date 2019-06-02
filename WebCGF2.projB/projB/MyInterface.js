/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    //Functions for the bird's movement control
    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }


    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).onChange(this.scene.onScaleFactorChange.bind(this.scene));

        this.gui.add(this.scene, 'speedFactor', 0.1, 3);
        
        this.gui.add(this.scene, 'catchingError', 0.5, 1.5).name("Catching Error");

        this.gui.add(this.scene, 'selectedCamera', this.scene.cameraNames).name('Camera').onChange(this.scene.updateCamera.bind(this.scene));
        
        this.gui.add(this.scene, 'zoom').name('Zoom');
        
        this.initKeys();
        
        return true;
    }
}