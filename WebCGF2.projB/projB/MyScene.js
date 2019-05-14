/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        //this.plane = new Plane(this, 32);
        this.terrain = new MyTerrain(this);

		this.initMaterials();

        //Objects connected to MyInterface
        this.scaleFactor = 50.0;

        this.terrain_shader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    	
		this.terrain_shader.setUniformsValues({ tex: 1 });
		this.terrain_shader.setUniformsValues({ uSampler: 1 });
		this.terrain_shader.setUniformsValues({ uSampler2: 1 });
		this.terrain_shader.setUniformsValues({ scale: this.scaleFactor });


		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

		
        this.setUpdatePeriod(50);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    onScaleFactorChanged(v) {
		this.terrain_shader.setUniformsValues({ scale: this.scaleFactor });
	}

    initMaterials(){
    	this.terrain_material = new CGFappearance(this);
		this.terrain_material.setAmbient(0.5, 0.5, 0.5, 1);
		this.terrain_material.setDiffuse(0.7, 0.7, 0.7, 1);
		this.terrain_material.setSpecular(0.2, 0.2, 0.2, 1);
		this.terrain_material.setShininess(100);

		this.terrain_texture = new CGFtexture(this, "images/terrain.jpg");
		this.terrain_material.setTexture(this.terrain_texture);

		this.heightmap_texture = new CGFtexture(this, "images/heightmap.jpg");
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    update(t){

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
		this.setActiveShader(this.terrain_shader);
		this.terrain_material.apply();
		this.heightmap_texture.bind(1);
		
        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        //this.plane.display();
        this.terrain.display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}