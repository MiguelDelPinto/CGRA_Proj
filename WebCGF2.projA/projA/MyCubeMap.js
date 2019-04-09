/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);

		this.invertedCube = new MyUnitCubeInverted(scene);

		this.cubemap_material = new CGFappearance(this.scene);
		this.cubemap_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubemap_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubemap_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubemap_material.setShininess(10.0);
        this.cubemap_material.setTexture('images/cube_map.png');

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
		this.invertedCube.display();
		this.scene.popMatrix();
	}

	updateBuffers() {};
}