/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

		this.quad = new MyQuad(scene);

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
		this.side_material = new CGFappearance(this.scene);
        this.side_material.setAmbient(0, 0, 0, 1.0);
        this.side_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.side_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.side_material.setShininess(10.0);
        //this.side_material.loadTexture('images/mineSide.png');
        //this.side_material.setTextureWrap('REPEAT', 'REPEAT');

        this.top_material = new CGFappearance(this.scene);
        this.top_material.setAmbient(0, 0, 0, 1.0);
        this.top_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.top_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.top_material.setShininess(10.0);
        //this.top_material.loadTexture('images/mineTop.png');
        //this.top_material.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom_material = new CGFappearance(this.scene);
        this.bottom_material.setAmbient(0, 0, 0, 1.0);
        this.bottom_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.bottom_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.bottom_material.setShininess(10.0);
        //this.bottom_material.loadTexture('images/mineBottom.png');
        //this.bottom_material.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){
		
		//Applying Side Material
		//this.side_material.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);


		//Front Face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//Back Face 
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.5);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Left Face
		this.scene.pushMatrix();
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Right Face
		this.scene.pushMatrix();
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();
		
		//Applying Top Material
		this.top_material.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);


		//Top Face
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Applying Bottom Material
		this.bottom_material.apply();
		//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);


		//Bottom Face
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
	}
}