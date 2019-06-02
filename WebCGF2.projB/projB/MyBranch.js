/**
* MyBranch
* @constructor
*/
class MyBranch extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.cylinder = new MyCylinder(scene, 4);

        //Branch material (wood - diffuse material)
        this.branch_material = new CGFappearance(this.scene);
        this.branch_material.setAmbient(1, 1, 1, 1);
        this.branch_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.branch_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.branch_material.setShininess(10.0);
        this.branch_material.loadTexture('images/branch.jpg');

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

        this.branch_material.apply();

        this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}


