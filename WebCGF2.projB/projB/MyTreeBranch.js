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

    	//Displays the main branch
        this.scene.pushMatrix();
			this.scene.scale(0.2, 2, 0.2);
			this.trunk_material.apply();
			this.cylinder.display();
        this.scene.popMatrix();
		
		//Displays the first secondary branch
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/6, 0, 0, 1);
			this.scene.scale(0.1, 0.75, 0.1);
			this.scene.translate(5, 0, 0);
			this.cylinder.display();
		this.scene.popMatrix();

		//Displays the second secondary branch
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/7, 0, 0, 1);
			this.scene.scale(0.08, 0.9, 0.08);
			this.scene.translate(-8, 0.5, 0);
			this.cylinder.display();
		this.scene.popMatrix();

    }
}