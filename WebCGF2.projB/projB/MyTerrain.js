/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new Plane(scene, 60);

        this.initBuffers();


        this.terrain_shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    	
		this.terrain_shader.setUniformsValues({ tex: 1 });
		this.terrain_shader.setUniformsValues({ colorTex: 2});
		this.terrain_shader.setUniformsValues({ scale: this.scene.scaleFactor || 40.0 });
		
		this.initMaterials();
    }
    
    initBuffers() {
        this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    onScaleFactorChanged(v) {
		this.terrain_shader.setUniformsValues({ scale: this.scene.scaleFactor });
	}

	initMaterials(){
    	this.terrain_material = new CGFappearance(this.scene);
		this.terrain_material.setAmbient(0.5, 0.5, 0.5, 1);
		this.terrain_material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.terrain_material.setSpecular(0.2, 0.2, 0.2, 1);
		this.terrain_material.setShininess(100);

		this.terrain_texture = new CGFtexture(this.scene, "images/terrain.jpg");
		this.terrain_material.setTexture(this.terrain_texture);

		this.heightmap_texture = new CGFtexture(this.scene, "images/heightmap.jpg");

		this.altimetry_texture = new CGFtexture(this.scene, "images/altimetry.png");
    }


    display() {
		
		this.scene.setActiveShader(this.terrain_shader);

		this.terrain_material.apply();
		this.heightmap_texture.bind(1);
		this.altimetry_texture.bind(2);
		
		this.scene.pushMatrix();
		this.scene.scale(60, 60, 1);
		this.plane.display();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);
    }
}