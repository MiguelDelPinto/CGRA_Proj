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

    	//Trunk material - a diffuse material
        this.trunk_material = new CGFappearance(this.scene);
		this.trunk_material.setAmbient(1, 1, 1, 1);
		this.trunk_material.setDiffuse(0.9, 0.9, 0.9, 1);
		this.trunk_material.setSpecular(0.1, 0.1, 0.1, 1);
		this.trunk_material.setShininess(100);

		this.trunk_texture = new CGFtexture(this.scene, "images/trunk.jpg");
		this.trunk_material.setTexture(this.trunk_texture); 
	}

    display() {

		this.scene.pushMatrix();
			this.scene.scale(0.5, 0.5, 0.5);

			//Displays the main branch
			this.scene.pushMatrix();
				this.scene.scale(0.2, 1.5, 0.2);
				this.trunk_material.apply();
				this.cylinder.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.scale(0.2, 1.5, 0.2);
				this.scene.translate(0, -0.7, 0);
				this.trunk_material.apply();
				this.cylinder.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.rotate(Math.PI/6, 0, 0, 1);
				this.scene.scale(0.2, 1.5, 0.2);
				this.scene.translate(3.6, 0.8, 0);
				this.trunk_material.apply();
				this.cylinder.display();
			this.scene.popMatrix();


			//Displays the first secondary branch
			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/3, 0, 0, 1);
				this.scene.scale(0.1, 1.2, 0.1);
				this.scene.translate(-2, 0, 0);
				this.trunk_material.apply();
				this.cylinder.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/9, 0, 0, 1);
				this.scene.scale(0.05, 0.5, 0.05);
				this.scene.translate(4, 1.2, 0);
				this.trunk_material.apply();
				this.cylinder.display();
			this.scene.popMatrix();


			//Displays the second secondary branch
			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/4, 0, 0, 1);
				this.scene.scale(0.1, 1.2, 0.1);
				this.scene.translate(-14, 1, 0);
				this.trunk_material.apply();
				this.cylinder.display();
			this.scene.popMatrix();


			//Displays the third secondary branch
			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.scene.rotate(-Math.PI/4, 0, 0, 1);
				this.scene.scale(0.1, 1.2, 0.1);
				this.scene.translate(3, -0.4, 0);
				this.trunk_material.apply();
				this.cylinder.display();
			this.scene.popMatrix();

        this.scene.popMatrix();

    }
}