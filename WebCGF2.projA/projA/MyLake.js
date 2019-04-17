/**
 * MyLake
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLake extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        this.initMaterials();

		this.quad = new MyQuad(scene);
	}
	initBuffers() {
		this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	initMaterials(){
		//Textures
		this.water_texture = new CGFtexture(this.scene, 'images/water.jpg');
 	    this.mud_texture = new CGFtexture(this.scene, 'images/mud.jpg');

		//Water material (water - specular material)
		this.water_material = new CGFappearance(this.scene);
        this.water_material.setAmbient(0, 0, 0, 1.0);
        this.water_material.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.water_material.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.water_material.setShininess(10.0);
        this.water_material.setTexture(this.water_texture);
        this.water_material.setTextureWrap('REPEAT', 'REPEAT');
		
		//Mud material (mud and dirt - diffuse materials)
        this.mud_material = new CGFappearance(this.scene);
        this.mud_material.setAmbient(0, 0, 0, 1.0);
        this.mud_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.mud_material.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.mud_material.setShininess(10.0);
        this.mud_material.setTexture(this.mud_texture);
        this.mud_material.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){

		//Drawing water
		this.water_material.apply();

		this.scene.pushMatrix();
		this.scene.scale(10, 1, 10);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		
		//Drawing mud around the water
		this.mud_material.apply();
		
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -5.5);
		this.scene.pushMatrix();
		this.scene.scale(12, 1, 1);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 0, 5.5);
		this.scene.pushMatrix();
		this.scene.scale(12, 1, 1);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(5.5, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(1, 1, 10);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-5.5, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(1, 1, 10);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
	}
}