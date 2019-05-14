/**
* MyBird
* @constructor
*/
class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.cube = new MyUnitCubeQuad(scene);
        this.halfCube = new MyHalfCube(scene);

        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    display() {

    	//Drawing the head
		this.scene.pushMatrix();	//head	
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();	//left eye
		this.scene.translate(0.5, 0.2, 0.3);
		this.scene.scale(0.2, 0.2, 0.2);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();	//right eye
		this.scene.translate(-0.5, 0.2, 0.3);
		this.scene.scale(0.2, 0.2, 0.2);
		this.cube.display();
		this.scene.popMatrix();


		//Drawing the body
		this.scene.pushMatrix();
		this.scene.translate(0, -1, -1);
		this.cube.display();
		this.scene.popMatrix();
    }
}