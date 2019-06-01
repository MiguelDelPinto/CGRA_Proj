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
		this.y = 0;
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
    	this.y = 0;
    	this.z = 0;
    	this.velocity = 0;
    	this.yy_angle = 0;
    	this.descending = false;
    	this.ascending = false;
    }

    update(t, deltatime) {

		//Updates the position of the bird
    	this.updatePosition(t, deltatime);
		
    	//Updates the angle of the wing
    	var wing_variation = 1 + 250 * this.velocity;
    	this.wing_angle = Math.PI / 6 * Math.sin(wing_variation * t * 2 * Math.PI / 1000) + 0.2;

    	//Updates the angle of the feet
    	this.feet_angle = 0.05 * Math.sin(t * 2 * Math.PI / 1000) + 0.1;  	
    }

    updatePosition(t, deltatime) {
    	//Updates the x and y variables
		this.x += this.velocity * deltatime * Math.sin(this.yy_angle);
    	this.z += this.velocity * deltatime * Math.cos(this.yy_angle);	
    	
    	//Updates the y variable (depending on ascent, descent or neither)
		if(!this.descending && !this.ascending)
    		this.y = 0.5 * Math.sin(t * 2 * Math.PI / 1000);
    	
    	else if (!this.ascending)
    		this.descend();
    	
    	else
    		this.ascend(t);
    }

    descend() {
    	if(this.y > -10)
    	{
    		this.y -= 0.2;
    		this.dive_angle = Math.PI/5;
    	}
    	else 
    	{

    		this.descending = false;
    		this.ascending = true;
    	}
    }

    ascend(t) {				
    	if(this.y < 0)
    	{
    	    this.dive_angle = -Math.PI/5;
    		this.y += 0.2 + 0.2 * Math.sin(t * 3 * Math.PI / 1000);
    	}    		
    	else
    	{
    		this.dive_angle = 0;
    		this.ascending = false;
    	}
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

    display() {

    	this.scene.pushMatrix();
			
			//Moves the bird
			this.scene.translate(this.x, this.y, this.z);
			this.scene.rotate(this.yy_angle, 0, 1, 0);
			this.scene.rotate(this.dive_angle, 1, 0, 0);


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
		
    }
}