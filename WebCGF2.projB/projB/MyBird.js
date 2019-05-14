/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);

        this.body = new MyUnitCubeQuad(scene, 'images/yellow_feathers.png', 'images/yellow_feathers.png', 'images/yellow_feathers.png');
        this.halfBody = new MyHalfCube(scene, 'images/yellow_feathers.png');

        this.eye = new MyUnitCubeQuad(scene, 'images/white.png', 'images/white.png', 'images/white.png');
        this.pupil = new MyUnitCubeQuad(scene, 'images/black.jpg', 'images/black.jpg', 'images/black.jpg');

        this.beak = new MyPyramid(scene, 4, 1);
        
		this.initMaterials();
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    initMaterials() {

    	//Beak material
    	this.beak_material = new CGFappearance(this.scene);
        this.beak_material.setAmbient(1, 1, 1, 1.0);
        this.beak_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.beak_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.beak_material.setShininess(10.0);   
		this.beak_material.loadTexture('images/orange.jpg');
		this.beak_material.setTextureWrap('REPEAT', 'REPEAT');      	
    }

    display() {

    	//Drawing the head
		this.scene.pushMatrix();				//head	
		this.body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();				//left eye
		this.scene.translate(0.43, 0.1, 0.2);
		this.scene.scale(0.3, 0.3, 0.3);
		this.eye.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();				//left pupil
		this.scene.translate(0.5, 0.05, 0.25);
		this.scene.scale(0.199, 0.199, 0.199);
		this.pupil.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();				//right eye
		this.scene.translate(-0.43, 0.1, 0.2);
		this.scene.scale(0.3, 0.3, 0.3);
		this.eye.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.5, 0.05, 0.25);
		this.scene.scale(0.199, 0.199, 0.199);
		this.pupil.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.0, -0.1, 0.5);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(0.3, 0.4, 0.3);
		this.beak_material.apply();
		this.beak.display();
		this.scene.popMatrix();


		//Drawing the body
		this.scene.pushMatrix();
		this.scene.translate(0, -0.6, -0.6);
		this.body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, -0.6, -1.6);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI, 0, 0, 0);
		this.scene.scale(0.5, 0.5, 1);
		this.halfBody.display();
		this.scene.popMatrix();
    }
}