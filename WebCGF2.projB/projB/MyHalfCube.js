/**
 * MyHalfCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHalfCube extends CGFobject {
	constructor(scene, texture) {
		super(scene);
		this.initBuffers();

		this.quad = new MyQuad(scene);
		this.triangle = new MyTriangle(scene);

		this.texture = texture;

        this.initMaterials();
	}
	initBuffers() {
		this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	initMaterials(){
		this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
        this.material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.material.setShininess(10.0);
        
        if(this.texture){
        	this.material.loadTexture(this.texture);
        	this.material.setTextureWrap('REPEAT', 'REPEAT');      	
        }
	}

	display(){
		
		this.material.apply();
		//Left face
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0.5);
			this.triangle.display();
		this.scene.popMatrix();
		
		//Right Face
		this.scene.pushMatrix();
			this.scene.translate(0, 0, -0.5);
			this.scene.pushMatrix();
				this.scene.scale(-1, 1, 1);
				this.scene.pushMatrix();
					this.scene.rotate(Math.PI/2, 0, 0, 1);
					this.triangle.display();
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();
		

		//Front/Top Face
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/4, 1, 0, 0);
				this.scene.pushMatrix();
					this.scene.scale(1, Math.sqrt(8), 1);
					this.quad.display();
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, -1, 0);
			this.scene.pushMatrix();
				this.scene.rotate(Math.PI/2, 1, 0, 0);
				this.scene.pushMatrix();
					this.scene.scale(2, 1, 1);
					this.quad.display();
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1, 0, 0);
			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.scene.pushMatrix();
					this.scene.scale(1, 2, 1);
					this.quad.display();
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();
		
	}
}