/**
* MyNest
* @constructor
*/
class MyNest extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.cylinder = new MyCylinder(scene, 10, 0, true);
        this.cylinder_inverted = new MyCylinderInverted(scene, 10, 0, true); 

        this.branches = [];

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
        this.nest_material = new CGFappearance(this.scene);
		this.nest_material.setAmbient(0.5, 0.5, 0.5, 1);
		this.nest_material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.nest_material.setSpecular(0.2, 0.2, 0.2, 1);
		this.nest_material.setShininess(100);

		this.nest_texture = new CGFtexture(this.scene, "images/nest.jpg");
		this.nest_material.setTexture(this.nest_texture); 
	}

	addBranch(branch){
		this.branches.push(branch);
	}

    display() {
    	
    	//Displays the main nest
        this.scene.pushMatrix();
			this.scene.scale(1, 0.25, 1);
			this.nest_material.apply();
			this.cylinder.display();
			this.cylinder_inverted.display();
        this.scene.popMatrix();

		//Displays the added branches
		for(let i = 0; i < this.branches.length; i++) {
			this.scene.pushMatrix();
				this.scene.rotate(Math.PI/3, 1, 0, 0);
				this.branches[i].display();
			this.scene.popMatrix();
			this.scene.rotate(2*Math.PI/this.branches.length, 0, 1, 0);
		}

    }
}