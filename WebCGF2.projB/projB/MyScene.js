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
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initializes some scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.bird = new MyBird(this);      
        this.house = new MyHouse(this);
        this.cube_map = new MyCubeMap(this);
        this.sphere = new MySphere(this, 1, 15, 15);
        this.tree = new MyLSPlant(this);
        this.lightning = new MyLightning(this);

        //Initializes the tree branches
        this.treeBranch = new MyTreeBranch(this);
		const numBranches = 4;
        this.treeBranches = [];
        for(var i = 0; i < numBranches; i++){
        	this.treeBranches.push(this.treeBranch);
        }
        this.branchesTranslates = [];
		this.branchesTranslates.push([-7.5, 0, 3]);
		this.branchesTranslates.push([-1, 0, 3]);
		this.branchesTranslates.push([-4, 0, -4]);
		this.branchesTranslates.push([1, 0, -3]);
		this.branchesAngles = [-Math.PI, Math.PI/3, -Math.PI/4, Math.PI/6];

        //Initializes the nest
        this.nest = new MyNest(this);
		this.nestPosition = [-6, 0, 7.5];

        //Initializes the trees
        this.trees = [];
        const numTrees = 9;
        for(var i = 0; i < numTrees; i++){
        	this.trees.push(new MyLSPlant(this));
        }

		//Initializes the materials
		this.initMaterials();

        //Objects connected to MyInterface
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;
        this.catchingError = 0.75;
        this.retro = false;
        this.birdCameraActive = false;
        this.thirdPerson = false;
        this.selectedCamera = "Default";
        this.zoom = false;
        this.quacking = false;
        this.thunder = false;
		this.branchSound = false;

		//Shader variables
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");
        
        this.initCameras();
        this.setUpdatePeriod(50);
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initMaterials(){
    	//CubeMap Material
        this.cubeMap_material = new CGFappearance(this);
        this.cubeMap_material.setAmbient(0.9, 0.9, 0.9, 1);
        this.cubeMap_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeMap_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeMap_material.setShininess(10.0);
        this.cubeMap_material.loadTexture('images/cube_map_day.jpg');   //daytime is default
        this.cubeMap_material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initCameras() {
    	this.cameraNames = ["Default", "Top-down", "Bird fixed", "Third person"];

        this.defaultCamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-55, 58, 50), vec3.fromValues(0, 0, 0));
		this.retroCamera = new CGFcamera(0.7, 0.1, 500, vec3.fromValues(this.bird.x, this.bird.y + 40, this.bird.z), vec3.fromValues(this.bird.x + Math.sin(this.bird.yy_angle), this.bird.y, this.bird.z + Math.cos(this.bird.yy_angle)));
		this.birdCamera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(-50, 50, 50), vec3.fromValues(this.bird.x, this.bird.y, this.bird.z));
		this.thirdPersonCamera = new CGFcamera(0.7, 0.1, 500, vec3.fromValues(this.bird.x - 5*Math.sin(this.bird.yy_angle), this.bird.y+9, this.bird.z - 5*Math.cos(this.bird.yy_angle)), vec3.fromValues(this.bird.x, this.bird.y+5, this.bird.z));

        this.camera = this.defaultCamera;
    }

    updateCamera(){
    	if(this.selectedCamera === "Top-down"){
    		this.retro = true;
    		this.thirdPerson = false;
    		this.birdCameraActive = false;
    	}
    	else if(this.selectedCamera === "Third person"){
    		this.thirdPerson = true;
    		this.retro = false;
    		this.birdCameraActive = false;
    	}
    	else if(this.selectedCamera === "Bird fixed"){
    		this.birdCameraActive = true;
    		this.retro = false;
    		this.thirdPerson = false;
    	}
    	else{
    		this.retro = false;
    		this.thirdPerson = false;
    		this.birdCameraActive = false;
    	}
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys(t, deltaTime) {
		var text="Keys pressed: ";
		var keysPressed=false;

		var timeIndependence = deltaTime/1000;
		
		//Accelerates the bird
		if (this.gui.isKeyPressed("KeyW")) {
			this.bird.accelerate(0.015*timeIndependence*this.speedFactor);
			text+=" W ";
			keysPressed=true;
		}
		
		//Decelerates the bird
		if (this.gui.isKeyPressed("KeyS")) {
			this.bird.accelerate(-0.015*timeIndependence*this.speedFactor);			
			text+=" S ";
			keysPressed=true;
		}

		//Turns the bird to the right
		if (this.gui.isKeyPressed("KeyD")) {
			this.bird.turn(-Math.PI/1.2*timeIndependence*this.speedFactor);
			text+=" D ";
			keysPressed =true;
		}

		//Turns the bird to the left
		if (this.gui.isKeyPressed("KeyA")) {
			this.bird.turn(Math.PI/1.2*timeIndependence*this.speedFactor);
			text+=" A ";
			keysPressed =true;
		}

		//Resets the position and movement of the bird
		if (this.gui.isKeyPressed("KeyR")) {
			this.bird.reset();
			text+=" R ";
			keysPressed =true;
		}

		//Dives down
		if (this.gui.isKeyPressed("KeyP")) {
			this.bird.descending = true;
			text+=" P ";
			keysPressed =true;
		}

		//Displays a lightning strike
		if(this.gui.isKeyPressed("KeyL")){
			this.lightning.startAnimation(t, this.thunder);	
			text+=" L ";
			keysPressed = true;
		}
		
		if (keysPressed)
		console.log(text);
	}

	onScaleFactorChange(){
		this.bird.onScaleFactorChange(this.scaleFactor);
	}

    update(t){

    	//Updates the time variables
    	this.lastTime = this.lastTime || 0;
		this.deltaTime = t - this.lastTime;
		this.lastTime = t;
    	
    	//Checks the keys pressed and acts accordingly
    	this.checkKeys(t, this.deltaTime);

		//Updates the bird
		this.bird.update(t, this.deltaTime, this.quacking);
		
		//Updates the lightning
		this.lightning.update(t);		

		//Checks the collisions for branch catching
		this.bird.checkCollisionsWithBranches(this.treeBranches, this.branchesTranslates, this.branchesAngles, this.catchingError);
		this.bird.checkCollisionsWithNest(this.nest, this.nestPosition, this.branchSound, this.catchingError);
    }
    
    onZoomChange(){
		if(!this.thirdPerson && !this.retro && !this.birdCameraActive){
			if(this.zoom)
				this.defaultCamera.setPosition(vec3.fromValues(-40, 45, 19));
			else
				this.defaultCamera.setPosition(vec3.fromValues(-55, 58, 50));
		}
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

		
		//Selects the camera
        if(this.retro) {
        	this.camera = this.retroCamera;

			if(this.zoom){
				this.retroCamera.setPosition(vec3.fromValues(this.bird.x, this.bird.y*this.scaleFactor+15, this.bird.z));
			}
			else{
        		this.retroCamera.setPosition(vec3.fromValues(this.bird.x, 40, this.bird.z));
			}

        	this.retroCamera.setTarget(vec3.fromValues(this.bird.x + Math.sin(this.bird.yy_angle), this.bird.y, this.bird.z + Math.cos(this.bird.yy_angle)));

        }
    	else if(this.thirdPerson){
        	this.camera = this.thirdPersonCamera;
			if(this.zoom){
        		this.thirdPersonCamera.setPosition(vec3.fromValues(this.bird.x - this.scaleFactor*5*Math.sin(this.bird.yy_angle), this.bird.y+9, this.bird.z - this.scaleFactor*5*Math.cos(this.bird.yy_angle)));
			}
			else{
				this.thirdPersonCamera.setPosition(vec3.fromValues(this.bird.x - 10*Math.sin(this.bird.yy_angle), this.bird.y + 12, this.bird.z - 10*Math.cos(this.bird.yy_angle)));
			}
        	this.thirdPersonCamera.setTarget(vec3.fromValues(this.bird.x, this.bird.y+5, this.bird.z)); 
    	}
    	else if(this.birdCameraActive){
    		this.camera = this.birdCamera;
			
			if(this.zoom){
				this.birdCamera.setPosition(vec3.fromValues(-25, 25, 25));
			}
			else{
				this.birdCamera.setPosition(vec3.fromValues(-50, 50, 50));
			}
			this.birdCamera.setTarget(vec3.fromValues(this.bird.x, this.bird.y, this.bird.z));
		
    	}
    	else{
    		this.camera = this.defaultCamera;
    	}

        //Draws axis
        this.axis.display();

        //Applies default appearance
        this.setDefaultAppearance();

        //Some display variables
        var FPS = 60;
        this.setUpdatePeriod(1000/FPS);
        


        // ---- BEGIN Primitive drawing section


		//Drawing the cube map
		this.pushMatrix();
			this.scale(60, 60, 60);
			this.cubeMap_material.apply();
			this.cube_map.display();
		this.popMatrix();


		//Drawing the terrain
        this.pushMatrix();
        	this.rotate(-0.5*Math.PI, 1, 0, 0);
        	//this.plane.display();
        	this.terrain.display();
        this.popMatrix();
		

		//Drawing the bird
        this.pushMatrix();
        	this.translate(0, 4.5 + 1.0, 0);
        	this.bird.display();
        this.popMatrix();

		
        //Drawing the branches
        this.pushMatrix();
        	this.translate(0, 4.5, 0);
        	this.pushMatrix();
        		for(var i = 0; i < this.treeBranches.length; i++){
        			if(this.treeBranches[i] == undefined)
        				continue;
        			this.pushMatrix();
						this.translate(this.branchesTranslates[i][0], this.branchesTranslates[i][1], this.branchesTranslates[i][2]);
						this.pushMatrix();
							this.rotate(Math.PI/2, 1, 0, 0);
							this.rotate(Math.PI/2, 0, 0, 1);
							this.rotate(this.branchesAngles[i], 0, 0, 1);
							this.treeBranches[i].display();
						this.popMatrix();
        			this.popMatrix();
        		}
        	this.popMatrix();
        this.popMatrix();

		
		//Drawing the nest
		this.pushMatrix();
			this.translate(0, 4.5, 0);
			this.translate(this.nestPosition[0], this.nestPosition[1], this.nestPosition[2]);
			this.nest.display();
		this.popMatrix();


		//Drawing the house
		this.pushMatrix();
			this.translate(4, 4.5, 4);
			this.pushMatrix();
				this.scale(1.5, 1.5, 1.5);
				this.pushMatrix();
					this.rotate(-Math.PI/2, 0, 1, 0);
					this.house.display();
				this.popMatrix();
			this.popMatrix();
		this.popMatrix();


		//Drawing the lightning
		if(this.lightning.isDrawing){
			this.pushMatrix();
				this.translate(this.lightning.lightning_position[0], 30, this.lightning.lightning_position[1]);
				this.pushMatrix();
					this.scale(2, 2, 2);
					this.pushMatrix();
						this.rotate(Math.PI, 1, 0, 0);
						this.lightning.display();
					this.popMatrix();
				this.popMatrix();
			this.popMatrix();
		}


		//Drawing the trees
		this.pushMatrix();
			this.pushMatrix();
				this.translate(12, 4.8, 4);
				this.scale(4, 2, 4);
				this.rotate(Math.PI/4, 0, 1, 0);
				this.trees[0].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(7.5, 4, -1);
				this.scale(4, 2, 4);
				this.rotate(2*Math.PI/5, 0, 1, 0);
				this.trees[1].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(-19, 6, 4);
				this.scale(4, 2, 4);
				this.trees[2].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(0, 5.5, -12);
				this.scale(4, 2, 4);
				this.rotate(Math.PI, 0, 1, 0);
				this.trees[3].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(-13, 5, -3);
				this.scale(4, 2, 4);
				this.rotate(Math.PI, 0, 1, 0);
				this.trees[4].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(12, 6, -4);
				this.scale(4, 2, 4);
				this.rotate(Math.PI/7, 0, 1, 0);
				this.trees[5].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(14, 5, 8);
				this.scale(4, 2, 4);
				this.rotate(Math.PI/3.5, 0, 1, 0);
				this.trees[6].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(-5.5, 6, 15);
				this.scale(4, 2, 4);
				this.rotate(Math.PI/6, 0, 1, 0);
				this.trees[7].display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(-6, 4.2, -8);
				this.scale(4, 2, 4);
				this.rotate(Math.PI/7, 0, 1, 0);
				this.trees[8].display();
			this.popMatrix();
		this.popMatrix();

		
        // ---- END Primitive drawing section
    }
}