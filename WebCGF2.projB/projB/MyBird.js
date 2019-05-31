/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.sphere = new MySphere(scene, 0.5, 15, 15);
        this.eye = new MyBirdEye(scene);
        this.beak = new MyPyramid(scene, 4, 1);
        this.wing = new MyBirdWing(scene);     
		this.foot = new MyBirdFoot(scene);
        
        this.x = 0;        
		this.y = 0;
		this.z = 0;

		this.velocity = 0;
		this.vMax = 0.01;
		this.vMin = -0.01;

		this.yy_angle = 0;

		this.wingAngle = 0;
		this.wingVariation = 0.05;

		this.counter = 0;

		this.initMaterials();
        this.initBuffers();
    }

    turn(v) {
		this.yy_angle += v;
    }

    accelerate(v) {
    	var new_velocity = this.velocity + v;

    	if(new_velocity > this.vMax)
    		new_velocity = this.vMax;
    		
    	else if(new_velocity < this.vMin)
    		new_velocity = this.vMin;

    	this.velocity = new_velocity;
    }

    reset() {
    	this.x = 0;
    	this.y = 0;
    	this.z = 0;
    	this.velocity = 0;
    	this.yy_angle = 0;
    }

    update(t, deltatime) {
    	//this.counter += deltatime;

		//Updates the position of the bird
    	this.x += this.velocity*deltatime * Math.sin(this.yy_angle);
    	this.z += this.velocity*deltatime * Math.cos(this.yy_angle);	
    	this.y = 0.5*Math.sin(t*2*Math.PI/1000);

    	//Updates the angle of the wing
    	if(this.wingAngle > Math.PI/6 || this.wingAngle < -Math.PI/9)
    		this.wingVariation *= -1;
    	
    	this.wingAngle += (this.velocity*400 || 1) * this.wingVariation;
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
				this.scene.rotate(this.wingAngle, 0, 0, 1);
				this.wing_material.apply();
				this.wing.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.scale(-1, 1, 1);
				this.scene.translate(4/5, -5/7, -2/3);
				this.scene.rotate(Math.PI/6, 0, 1, 0);
				this.scene.scale(1, 3/4, -1);
				this.scene.rotate(this.wingAngle, 0, 0, 1);
				this.wing_material.apply();
				this.wing.display();
			this.scene.popMatrix();


			//Drawing the feet
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
		
    }
}