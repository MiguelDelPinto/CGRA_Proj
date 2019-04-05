/**
* MyHouse
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
                
        this.walls = new MyUnitCubeQuad(scene);  
        this.roof = new MyPyramid(scene, 4, 1);
        this.pillars = [];
        for(let i = 0; i < 4; i++){
        	this.pillars.push(new MyPrism(scene, 6, 1));
        }      
                
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
		//Drawing Walls
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.walls.display();
		this.scene.popMatrix();

		//Drawing Roof
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/4, 0, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(1.5, 1, 1.5);
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.roof.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		
		//Drawing Pillars
		this.scene.pushMatrix();
		this.scene.translate(0.75, 0, 0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[0].display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 0, 0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[1].display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 0, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[2].display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.75, 0, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[3].display();
		this.scene.popMatrix();
		this.scene.popMatrix();
    }
}