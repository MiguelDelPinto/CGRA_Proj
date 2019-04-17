/**
 * MyRoad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRoad extends CGFobject {
	constructor(scene, length) {
		super(scene);

        this.length = length;

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
		this.road_texture = new CGFtexture(this.scene, 'images/road.jpg');
 	    this.road_transition_texture = new CGFtexture(this.scene, 'images/road_transition.jpg');

		//Materials
		this.road_material = new CGFappearance(this.scene);
        this.road_material.setAmbient(0, 0, 0, 1.0);
        this.road_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.road_material.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.road_material.setShininess(10.0);
        this.road_material.setTexture(this.road_texture);
        this.road_material.setTextureWrap('REPEAT', 'REPEAT');
		
        this.road_transition_material = new CGFappearance(this.scene);
        this.road_transition_material.setAmbient(0, 0, 0, 1.0);
        this.road_transition_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.road_transition_material.setSpecular(0.4, 0.4, 0.4, 1.0);
        this.road_transition_material.setShininess(10.0);
        this.road_transition_material.setTexture(this.road_transition_texture);
        this.road_transition_material.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(){

		//Draws the Road along the z axis, starting with the transition between road and grass
		this.road_transition_material.apply();

		this.scene.pushMatrix();
		this.scene.translate(0, 0.001, 0);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		
		//Draws the rest of the road
		this.road_material.apply();
		
		for(let n = 1; n <= this.length; n++) {
		    this.scene.pushMatrix();
		    this.scene.translate(0, 0.001, n);
		    this.scene.pushMatrix();
		    this.scene.rotate(-Math.PI/2, 1, 0, 0);
		    this.quad.display();
		    this.scene.popMatrix();
		    this.scene.popMatrix();
		}
	}
}