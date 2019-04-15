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
        //Grass Material
        this.grass_material = new CGFappearance(this);
        this.grass_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.grass_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.grass_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.grass_material.setShininess(10.0);
        this.grass_material.setTexture(new CGFtexture(this, 'images/grass.jpg'));
        this.grass_material.setTextureWrap('REPEAT', 'REPEAT');
        
        //------ Textures
        this.texture1 = new CGFtexture(this, 'images/leaves.jpg');
        this.texture2 = new CGFtexture(this, 'images/trunk.jpg');

        //Objects connected to MyInterface

        this.unitCubeQuad = new MyUnitCubeQuad(this);
        this.tree = new MyTree(this, 1, 0.34, 1, 1, this.texture2, this.texture1);
        this.treeRowPatch = new MyTreeRowPatch(this, this.texture2, this.texture1);
        this.treeGroupPatch = new MyTreeGroupPatch(this, this.texture2, this.texture1);
        this.house = new MyHouse(this);
        this.voxelHill = new MyVoxelHill(this, 3);

        var texCoords = [ 0, 25, 25, 25, 0, 0, 25, 0];
        this.quad = new MyQuad(this, texCoords);

        this.cubeMap = new MyCubeMap(this);
        this.firePit = new MyFirePit(this);
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
       
        //Drawing Final Scene: Exercise 4
        /*var size_of_scene = 200;
        this.pushMatrix();
        //this.translate(0, size_of_scene/2, 0);
        this.pushMatrix();
        this.scale(size_of_scene, size_of_scene, size_of_scene);
        this.cubeMap.display();       //-------> gives an error
        this.popMatrix();
        this.popMatrix();*/

        this.pushMatrix();
        this.scale(100, 1, 100);
        this.pushMatrix();
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.grass_material.apply();
        this.quad.display();
        this.popMatrix();
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(0, -0.05, 0);
        this.pushMatrix();
        this.scale(100, 1, 100);
        this.pushMatrix();
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.rotate(Math.PI, 1, 0, 0);
        this.quad.display();
        this.popMatrix();
        this.popMatrix();
        this.popMatrix();


        this.pushMatrix();
        this.scale(3, 3, 3);
        this.house.display();
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(-20, 2.5, -20);
        this.pushMatrix();
        this.scale(5, 5, 5);
        this.voxelHill.display();
        this.popMatrix();
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(20, 2.5, -20);
        this.pushMatrix();
        this.scale(5, 5, 5);
        this.voxelHill.display();
        this.popMatrix();
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(-30, 0, 10);
        this.pushMatrix();  
        this.scale(2, 3, 2);
        this.pushMatrix();
        this.rotate(-Math.PI/2, 0, 1, 0);
        this.treeRowPatch.display();
        this.popMatrix();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(30, 0, 10);
        this.pushMatrix();  
        this.scale(2, 3, 2);
        this.pushMatrix();
        this.rotate(-Math.PI/2, 0, 1, 0);
        this.treeRowPatch.display();
        this.popMatrix();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-25, 0, 23);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-25, 0, 10);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        //this.prism.display();
        //this.cylinder.display();
        //this.unitCubeQuad.display();
        //this.tree.display();
        //this.treeGroupPatch.display();
        //this.voxelHill.display();

        this.pushMatrix();
        this.translate(0, 0, 10);
        this.firePit.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}