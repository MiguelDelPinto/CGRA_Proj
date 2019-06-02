/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

		//Objets that compose the bird
        this.sphere = new MySphere(scene, 0.5, 15, 15);
        this.eye = new MyBirdEye(scene);
        this.beak = new MyPyramid(scene, 4, 1);
        this.wing = new MyBirdWing(scene);     
		this.foot = new MyBirdFoot(scene);
        
        //Position variables
        this.x = 0;        
		this.y = 8.5;
		this.z = 0;

		//Velocity variables
		this.velocity = 0;
		this.velocity_max = 0.01;
		this.velocity_min = 0;

		//Angular variables
		this.yy_angle = 0;
		this.wing_angle = 0;
		this.feet_angle = 0;
		this.dive_angle = 0;

		//Branch catching variables
		this.ascending = false;
		this.descending = false;
		this.caughtBranch = false;
		this.treeBranch = undefined;

		//Sound variables
		this.quack = new Audio('audio/quack.wav');

		this.scaleFactor = 1.0;

		this.counter = 0;

		this.initMaterials();
        this.initBuffers();
    }

    turn(v) {
		this.yy_angle += v;
    }

    accelerate(v) {
    	var new_velocity = this.velocity + v;

    	if(new_velocity > this.velocity_max)
    		new_velocity = this.velocity_max;
    		
    	else if(new_velocity < this.velocity_min)
    		new_velocity = this.velocity_min;

    	this.velocity = new_velocity;
    }

    reset() {
    	this.x = 0;
    	this.y = 8.5;
    	this.z = 0;
    	
    	this.velocity = 0;
    	
    	this.yy_angle = 0;
    	this.diving_angle = 0;
    	
    	this.descending = false;
    	this.ascending = false;

    }

    update(t, deltatime) {

		//Updates the position of the bird
    	this.updatePosition(t, deltatime);
		
		this.quack.play();

    	//Updates the angle of the wing
    	var wing_variation = 1 + 250 * this.velocity;
    	this.wing_angle = - Math.PI / 6 * Math.sin(wing_variation * t * 2 * Math.PI / 1000) + 0.2;


    	//Updates the angle of the feet
    	this.feet_angle = 0.05 * Math.sin(t * 2 * Math.PI / 1000) + 0.1;  	
    }

    updatePosition(t, deltatime) {
    	
    	//Updates the x and y variables
		this.x += this.velocity * deltatime * Math.sin(this.yy_angle);
    	this.z += this.velocity * deltatime * Math.cos(this.yy_angle);	
    	

    	//Updates the y variable (depending on ascent, descent or neither)
		if(!this.descending && !this.ascending){
    		this.y = 8.5 + 0.5 * Math.sin(t * 2 * Math.PI / 1000);
		}
    	else if (!this.ascending){
    		this.descend(deltatime);
    	}
    	else{
    		this.ascend(deltatime);
    	}

    	if(!this.ascending && this.dive_angle < 0)
    		this.dive_angle += Math.PI/25;
    }

    descend(deltatime) {
    	
    	if(this.y > 0)
    	{
    		//Smooth transition to descent
    		if(this.dive_angle < Math.PI/5)
    			this.dive_angle += Math.PI/25;

    		this.y -= 8.5*deltatime/1000;
    	}
    	
    	else 
    	{
    		this.descending = false;
    		this.ascending = true;
    	}
    }

    ascend(deltatime) {				
    	if(this.y < 8.5)
    	{
    	    if(this.dive_angle > -Math.PI/5)
    	    	this.dive_angle -= Math.PI/25;

    		this.y += 8.5*deltatime/1000;
    	}
    	    		
    	else
    		this.ascending = false;
    }
    
    initBuffers() {
        this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    initMaterials() {

    	//Feathers material
    	this.feathers_material = new CGFappearance(this.scene);
        this.feathers_material.setAmbient(1, 1, 1, 1.0);
        this.feathers_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.feathers_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.feathers_material.setShininess(10.0);   
		this.feathers_material.loadTexture('images/yellow_feathers.png');
		this.feathers_material.setTextureWrap('REPEAT', 'REPEAT');

    	//Beak material
    	this.beak_material = new CGFappearance(this.scene);
        this.beak_material.setAmbient(1, 1, 1, 1.0);
        this.beak_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.beak_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.beak_material.setShininess(10.0);   
		this.beak_material.loadTexture('images/orange.jpg');
		this.beak_material.setTextureWrap('REPEAT', 'REPEAT');

		//Wing material   
		this.wing_material = new CGFappearance(this.scene);
        this.wing_material.setAmbient(1, 1, 1, 1.0);
        this.wing_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.wing_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.wing_material.setShininess(10.0);   
		this.wing_material.loadTexture('images/yellow_feathers.png');
		this.wing_material.setTextureWrap('REPEAT', 'REPEAT');   	
    }

	checkCollisionsWithBranches(treeBranches, branchesTranslates, branchesRotates, catchingError){
		if(this.caughtBranch)
			return;

		if(branchesTranslates.length === 0)
			return;

		if(catchingError == undefined)
			catchingError = 0;
		
		for(var i = 0; i < branchesTranslates.length; i++){
			if(branchesTranslates[i] == undefined)
				continue;
			if(Math.abs(branchesTranslates[i][0]-this.x) >  Math.abs(catchingError)) //Check x range
				continue;
			if(Math.abs(branchesTranslates[i][1]-this.y) >  Math.abs(catchingError)) //Check y range
				continue;
			if(Math.abs(branchesTranslates[i][2]-this.z) >  Math.abs(catchingError)) //Check z range
				continue;

			//Colliding with branch  
			this.treeBranch = treeBranches[i];
			delete branchesTranslates[i];
			delete treeBranches[i];
			delete branchesRotates[i];
			this.caughtBranch = true;
			break;
		}
	}

	checkCollisionsWithNest(nest, nestPosition, catchingError){
		if(!this.caughtBranch)
			return;

		if(catchingError == undefined)
			catchingError = 0;

/*
		if((Math.pow(nestPosition[0]-this.x, 2) + Math.pow(nestPosition[1]-this.y, 2) + Math.pow(nestPosition[2]-this.z, 2)) > Math.pow(catchingError, 2))
			return;
*/

		if(Math.abs(nestPosition[0]-this.x) >  Math.abs(catchingError))
			return;
		if(Math.abs(nestPosition[1]-this.y) >  Math.abs(catchingError))
			return;
		if(Math.abs(nestPosition[2]-this.z) >  Math.abs(catchingError))
			return;

		//Colliding with nest 
		nest.addBranch(this.treeBranch);
		delete this.treeBranch;
		this.caughtBranch = false;
	}

	onScaleFactorChange(scaleFactor){
		this.scaleFactor = scaleFactor;
	}

    display() {

    	this.scene.pushMatrix();
			
			//Moves the bird
			this.scene.translate(this.x, this.y, this.z);
			this.scene.rotate(this.yy_angle, 0, 1, 0);
			this.scene.rotate(this.dive_angle, 1, 0, 0);

			this.scene.pushMatrix();

				//Making the bird a little smaller
				this.scene.scale(0.7*this.scaleFactor, 0.7*this.scaleFactor, 0.7*this.scaleFactor);

				//Drawing the head
				this.scene.pushMatrix();
					this.feathers_material.apply();
					this.scene.scale(1, 1, 1.1);
					this.sphere.display();
				this.scene.popMatrix();


				//Drawing the eyes
				this.scene.pushMatrix();
					this.scene.translate(0.35, 0.1, 0.3);
					this.eye.display();	//left eye
				this.scene.popMatrix();

				this.scene.pushMatrix();
					this.scene.scale(-1, 1, 1);
					this.scene.translate(0.35, 0.1, 0.3);
					this.eye.display(); //right eye
				this.scene.popMatrix();


				//Drawing the beak
				this.scene.pushMatrix();
					this.scene.translate(0.0, -0.1, 0.45);
					this.scene.rotate(0.2 + Math.PI/2, 1, 0, 0);
					this.scene.scale(0.3, 0.4, 0.25);
					this.beak_material.apply();
					this.beak.display();
				this.scene.popMatrix();


				//Drawing the body
				this.scene.pushMatrix();
					this.scene.translate(0, -0.95, -0.7);
					this.scene.scale(1.7, 1.4, 2.3);
					this.feathers_material.apply();
					this.sphere.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
					this.scene.translate(0, -0.8, -1.7);
					this.scene.rotate(Math.PI/5, 1, 0, 0);
					this.scene.scale(0.8, 0.3, 1.2);
					this.feathers_material.apply();
					this.sphere.display();
				this.scene.popMatrix();


				//Drawing the wings
				this.scene.pushMatrix();
					this.scene.translate(4/5, -5/7, -2/3);
					this.scene.rotate(Math.PI/6, 0, 1, 0);
					this.scene.scale(1, 3/4, 1);
					this.scene.rotate(this.wing_angle, 0, 0, 1);
					this.wing_material.apply();
					this.wing.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
					this.scene.scale(-1, 1, 1);
					this.scene.translate(4/5, -5/7, -2/3);
					this.scene.rotate(Math.PI/6, 0, 1, 0);
					this.scene.scale(1, 3/4, -1);
					this.scene.rotate(this.wing_angle, 0, 0, 1);
					this.wing_material.apply();
					this.wing.display();
				this.scene.popMatrix();


				//Drawing the feet
				this.scene.pushMatrix();
					this.scene.rotate(this.feet_angle, 1, 0, 0);
					this.scene.pushMatrix();
						this.scene.translate(0.4, -1.7, -1/2);
						this.foot.display();
					this.scene.popMatrix();

					this.scene.pushMatrix();
						this.scene.rotate(-Math.PI/12, 0, 1, 0);
						this.scene.translate(-0.4, -1.7, -1/2 + 0.1);
						this.foot.display();
					this.scene.popMatrix();
				this.scene.popMatrix();

			this.scene.popMatrix();

			//Displays the branch, if the bird has caught it
			if(this.caughtBranch) {
				this.scene.pushMatrix();
					this.scene.rotate(this.feet_angle, 1, 0, 0);	//moves the same way as the feet
					this.scene.pushMatrix();
						this.scene.translate(0.5, -1.46, -0.15);
						this.scene.rotate(Math.PI/2, 0, 0, 1);
						this.scene.rotate(-Math.PI/2, 0, 1, 0);
						this.treeBranch.display();
					this.scene.popMatrix();
				this.scene.popMatrix();
			}


		this.scene.popMatrix();
		
    }
}