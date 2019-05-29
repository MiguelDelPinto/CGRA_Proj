/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        //this.plane = new Plane(this, 32);
        this.terrain = new MyTerrain(this);
        this.bird = new MyBird(this);
        this.nest = new MyNest(this);

        //Initialize tree branches
        this.treeBranch = new MyTreeBranch(this);
		const numBranches = Math.random() * (6 - 4) + 4;
        this.treeBranches = [];
        for(var i = 0; i < numBranches; i++){
        	this.treeBranches.push(this.treeBranch);
        }

        //Lightning 
        this.lightning = new MyLightning(this);

		this.initMaterials();

        //Objects connected to MyInterface
        this.scaleFactor = 10.0;

		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

		
        this.setUpdatePeriod(50);
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    onScaleFactorChanged(v) {
    	//this.terrain.onScaleFactorChanged(v);
	}

    initMaterials(){
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {
		var text="Keys pressed: ";
		var keysPressed=false;
		
		// Check for key codes e.g. in https://keycode.info/
		if (this.gui.isKeyPressed("KeyW")) {
			this.bird.accelerate(0.001);
			text+=" W ";
			keysPressed=true;
		}
		
		if (this.gui.isKeyPressed("KeyS")) {
			this.bird.accelerate(-0.001);			
			text+=" S ";
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyD")) {
			this.bird.turn(-Math.PI/20);
			text+=" D ";
			keysPressed =true;
		}

		if (this.gui.isKeyPressed("KeyA")) {
			this.bird.turn(Math.PI/20);
			text+=" D ";
			keysPressed =true;
		}
		
		if (keysPressed)
		console.log(text);
	}

    update(t){
    	this.checkKeys();

		this.lastTime = this.lastTime || 0;
		this.deltaTime = t - this.lastTime;
		this.lastTime = t;
		this.bird.update(t, this.deltaTime);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        var FPS = 20;
        this.setUpdatePeriod(1000/FPS);
		
        /*this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        //this.plane.display();
        //this.terrain.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0, 3, 0);
        this.bird.display();
        this.popMatrix();

        //DISPLAY BRANCHES
        this.pushMatrix();
        this.translate(0, 4.5, 0);
        this.pushMatrix();
        const translatePosition = [2.5, 2.5];
        for(var i = 0; i < this.treeBranches.length; i++){
        	this.pushMatrix();
        	this.translate(translatePosition[0]*i-5, 0, translatePosition[1]*i-5);
        	this.pushMatrix();
			this.rotate(Math.PI/2, 0, 0, 1);
        	this.treeBranches[i].display();
        	this.popMatrix();
        	this.popMatrix();
        }
        this.popMatrix();
        this.popMatrix();
		
		this.pushMatrix();
		this.translate(5, 4.5, -5);
		this.nest.display();
		this.popMatrix();*/

		this.lightning.display();
        // ---- END Primitive drawing section
    }
}