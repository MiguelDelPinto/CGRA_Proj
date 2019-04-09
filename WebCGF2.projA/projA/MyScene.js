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

        //------ Applied Material

        //------ Textures
        this.texture1 = new CGFtexture(this, 'images/leaves.jpg');
        this.texture2 = new CGFtexture(this, 'images/trunk.jpg');

        //Objects connected to MyInterface
        this.prism = new MyPrism(this, 10, 4);
        this.cylinder = new MyCylinder(this, 10, 5);
        this.unitCubeQuad = new MyUnitCubeQuad(this);
        this.tree = new MyTree(this, 1, 0.34, 1, 1, this.texture2, this.texture1);
        this.treeRowPatch = new MyTreeRowPatch(this, this.texture2, this.texture1);
        this.treeGroupPatch = new MyTreeGroupPatch(this, this.texture2, this.texture1);
        this.house = new MyHouse(this);
        this.voxelHill = new MyVoxelHill(this, 3);
        this.cubeMap = new MyCubeMap(this);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
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
       
        //this.prism.display();
        //this.cylinder.display();
        //this.unitCubeQuad.display();
        //this.tree.display();
        //this.treeRowPatch.display();
        //this.treeGroupPatch.display();
        //this.house.display();
        //this.voxelHill.display();
        
        //this.cubeMap.display();       //-------> gives an error

        // ---- END Primitive drawing section
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}