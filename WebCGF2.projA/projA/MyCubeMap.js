/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);

		this.invertedCube = new MyUnitCubeInverted(scene);

		this.cubemap_material = new CGFappearance(scene);
		this.cubemap_material.setAmbient(1, 1, 1, 1);
        this.cubemap_material.setDiffuse(0, 0, 0, 1);
        this.cubemap_material.setSpecular(1, 1, 1, 1);
        this.cubemap_material.setShininess(10.0);
        this.cubemap_material.setTexture(new CGFtexture(scene, 'images/cube_map.jpg'));

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

		this.scene.pushMatrix();
		this.cubemap_material.apply();
		//this.scene.scale(50, 50, 50);
		this.invertedCube.display();
		this.scene.popMatrix();
	}

	updateBuffers() {};
}