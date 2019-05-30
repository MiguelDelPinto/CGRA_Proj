/**
* MyLeaf
* @constructor
*/
class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.triangle = new MyTriangle(scene);

        //Branch material (wood - diffuse material)
        this.leaf_material = new CGFappearance(scene);
        this.leaf_material.setAmbient(1, 1, 1, 1);
        this.leaf_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leaf_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.leaf_material.setShininess(10.0);
        this.leaf_material.loadTexture('images/leaf.jpg');

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

        this.leaf_material.apply();

        this.scene.pushMatrix();
		this.scene.scale(1, 1, 1);
        this.triangle.display();
        this.scene.popMatrix();
    }
}


