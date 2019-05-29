/**
* MyTreeBranch
* @constructor
*/
class MyTreeBranch extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.cylinder = new MyCylinder(scene, 5, 0);

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
        this.trunk_material = new CGFappearance(this.scene);
		this.trunk_material.setAmbient(0.5, 0.5, 0.5, 1);
		this.trunk_material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.trunk_material.setSpecular(0.2, 0.2, 0.2, 1);
		this.trunk_material.setShininess(100);

		this.trunk_texture = new CGFtexture(this.scene, "images/trunk.jpg");
		this.trunk_material.setTexture(this.trunk_texture); 
	}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.25, 2, 0.25);
        this.trunk_material.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}