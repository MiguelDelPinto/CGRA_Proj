/**
* MyLeaf
* @constructor
*/
class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.sphere = new MySphere(scene, 1, 7, 7);

        //Leaf material - leaf, a mainly diffuse material
        this.leaf_material = new CGFappearance(scene);
        this.leaf_material.setAmbient(1, 1, 1, 1);
        this.leaf_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leaf_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.leaf_material.setShininess(10.0);

		//Picks a random kind of leaves between cherry tree leaves, autumn leaves and normal green leaves
		const picker = Math.random();
        if(picker < 1/3)
        	this.leaf_material.loadTexture('images/leaf.jpg');
        else if (picker >= 1/3 && picker < 2/3)
        	this.leaf_material.loadTexture('images/cherry.jpg');
        else
        	this.leaf_material.loadTexture('images/autumn.jpg');

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
		
		//Drawing the leaves
        this.scene.pushMatrix();
			this.scene.scale(1.2, 0.4, 0.5);
			this.leaf_material.apply();
			this.sphere.display();
        this.scene.popMatrix();
    }
}


