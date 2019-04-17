/**
* MyCar
* @constructor
*/
class MyCar extends CGFobject {
    constructor(scene) {
        super(scene);
                
  		              
        this.half_cube = new MyHalfCube(scene, 'images/blue.jpg');
        this.cube = new MyUnitCubeQuad(scene, 'images/blue.jpg', 'images/blue.jpg', 'images/blue.jpg');
                
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

    initMaterials(){
       
    }
    
    display() {
    	this.scene.pushMatrix();
    	this.scene.scale(4, 1, 3);
    	this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(1, 1, 3);
		this.cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1.25, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.75, 0.5, 3);
		this.half_cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.25, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 0.5, 3);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.half_cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-1, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 3);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.half_cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
    }
}