/**
* MyNest
* @constructor
*/
class MyNest extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.cylinder = new MyCylinder(scene, 10, 0, true);
        this.cylinder_inverted = new MyCylinderInverted(scene, 10, 0, true);
        this.branch = new MyTreeBranch(scene); 

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

    	//Nest material - small twigs, a diffuse material
        this.nest_material = new CGFappearance(this.scene);
		this.nest_material.setAmbient(1, 1, 1, 1);
		this.nest_material.setDiffuse(0.9, 0.9, 0.9, 1);
		this.nest_material.setSpecular(0.1, 0.1, 0.1, 1);
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
			this.scene.scale(1.2, 0.25, 1.2);
			this.scene.translate(0, -0.7, 0);
			this.nest_material.apply();
			this.cylinder.display();
			this.cylinder_inverted.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        	this.scene.translate(0, 0.1, 0);
        	for(let i = 0; i < 10; i++) {
        		this.scene.pushMatrix();
        			this.scene.rotate(Math.PI/2, 1, 0, 0);
					this.scene.rotate(Math.PI/2.2, 0, 0, 1);
					this.scene.scale(0.6, 0.6, 0.6);
					this.branch.display();
				this.scene.popMatrix();

				this.scene.rotate(2*Math.PI/10, 0, 1, 0);
        	}

        	for(let i = 0; i < 8; i++) {
				
				this.scene.pushMatrix();
					this.scene.rotate(Math.PI/3, 0, 0, 1);
					this.scene.rotate(Math.PI/2, 0, 1, 0);
					this.scene.translate(0, 0.2, -0.2);
					this.scene.scale(0.4, 0.4, 0.4);
					this.branch.display();
				this.scene.popMatrix();

				this.scene.rotate(2*Math.PI/8, 0, 1, 0);
        	}

			this.scene.pushMatrix();
				this.scene.rotate(Math.PI/2, 1, 0, 0);
				this.scene.rotate(Math.PI/2.2, 0, 0, 1);
				this.scene.rotate(Math.PI/2, 0, 0, 1);
				this.scene.translate(1, 0, 0);
				this.scene.scale(0.5, 0.5, 0.5);
				this.branch.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.rotate(Math.PI/2, 1, 0, 0);
				this.scene.rotate(Math.PI/2.2, 0, 0, 1);
				this.scene.rotate(-Math.PI/3, 0, 0, 1);
				this.scene.translate(1, 0, 0);
				this.scene.scale(0.5, 0.5, 0.5);
				this.branch.display();
			this.scene.popMatrix();

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