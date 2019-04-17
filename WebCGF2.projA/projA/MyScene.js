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

        //CubeMap Material
        this.cubeMap_material = new CGFappearance(this);
        this.cubeMap_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeMap_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeMap_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeMap_material.setShininess(10.0);
        this.cubeMap_material.loadTexture('images/cube_map_day.png');
        this.cubeMap_material.setTextureWrap('REPEAT', 'REPEAT');
        
        //------ Textures
        this.texture1 = new CGFtexture(this, 'images/leaves.jpg');
        this.texture2 = new CGFtexture(this, 'images/trunk.jpg');

        //Objects connected to MyInterface
        this.wrapTextures = false;
        this.timeOfDay = 0;
        this.timeIDs = { 'Day': 0, 'Night': 1};
        this.garageDoorPosition = 0;
        this.garageDoorIDs = {'Close': 0, 'Open': 1};


        this.unitCubeQuad = new MyUnitCubeQuad(this);
        this.tree = new MyTree(this, 1, 0.34, 1, 1, this.texture2, this.texture1);
        this.treeRowPatch = new MyTreeRowPatch(this, this.texture2, this.texture1);
        this.treeGroupPatch = new MyTreeGroupPatch(this, this.texture2, this.texture1);
        this.house = new MyHouse(this);
        this.voxelHill = new MyVoxelHill(this, 3);
        this.other_voxelHill = new MyVoxelHill(this, 5);

        var texCoords = [ 0, 25, 25, 25, 0, 0, 25, 0];
        this.quad = new MyQuad(this, texCoords);

        this.cubeMap = new MyCubeMap(this);
        this.firePit = new MyFirePit(this);
        this.lake = new MyLake(this);
        this.garage = new MyGarage(this);
        this.road = new MyRoad(this, 10);
        this.sign = new MySign(this, 'images/sign.jpg');
        this.boat = new MyBoat(this);
        this.car = new MyCar(this);

    }
    initLights() {

        this.setGlobalAmbientLight(0.62, 0.62, 0.62, 1);

        //Sun
        this.lights[0].setPosition(100, 100, -2, 1);
        this.lights[0].setDiffuse(0.98, 0.92, 0.65, 1.0);
        this.lights[0].setSpecular(0.98, 0.92, 0.65, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        //Moon
        this.lights[1].setPosition(100, 100, -2, 1);
        this.lights[1].setDiffuse(0.72, 0.83, 0.87, 1.0);
        this.lights[1].setSpecular(0.72, 0.83, 0.87, 1.0);
        this.lights[1].disable();
        this.lights[1].update();

        //Fireplace
        this.lights[2].setPosition(0, 1.1, 10, 1);
        this.lights[2].setDiffuse(0.96, 0.50, 0.25, 1.0);
        this.lights[2].setSpecular(0.96, 0.50, 0.25, 1.0);;
        this.lights[2].setLinearAttenuation(0.05);
        this.lights[2].disable();
        this.lights[2].update();

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

    updateTimeOfDay() {
        
        if (this.timeOfDay == 0)
        {            
            this.cubeMap_material.loadTexture('images/cube_map_day.png');
           
            this.lights[0].enable();
            this.lights[1].disable();
            this.lights[2].disable();
            
            this.lights[0].update();
            this.lights[1].update();
            this.lights[2].update();
        }
        if (this.timeOfDay == 1)
        {
            //this.cubeMap_material.setTexture(this.cubeMapNight_Texture);
            this.cubeMap_material.loadTexture('images/cube_map_night.png');
            
            this.lights[0].disable();
            this.lights[1].enable();
            this.lights[2].enable();
            
            this.lights[0].update();
            this.lights[1].update();
            this.lights[2].update();
        }

    }

    updateGaragePosition() {
        this.garage.frames_to_change = 30;
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

        // Apply default appearance
        this.setDefaultAppearance();
       
        //Drawing Final Scene: Exercise 4

        /*
         *  BEGIN DRAWING
         */
        
        // Cube Map
        this.pushMatrix();
        this.cubeMap_material.apply();
        this.translate(0, 0, 0);
        this.pushMatrix();
        this.scale(150, 150, 150);
        this.cubeMap.display();
        this.popMatrix();
        this.popMatrix();

        // Grass plane
        this.pushMatrix();
        this.scale(150, 1, 150);
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


        // House
        this.pushMatrix();
        this.scale(3, 3, 3);
        this.house.display();
        this.popMatrix();
        

        //Voxel Hills
        this.pushMatrix();
        this.translate(-20, 2.5, -20);
        this.pushMatrix();
        this.scale(5, 5, 5);
        this.voxelHill.display();
        this.popMatrix();
        this.popMatrix();
        
        this.pushMatrix();
        this.translate(30, 2.5, -30);
        this.pushMatrix();
        this.scale(5, 5, 5);
        this.other_voxelHill.display();
        this.popMatrix();
        this.popMatrix();
        

        //Tree Groups and Patches
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

        this.pushMatrix();
        this.translate(-15, 0, 10);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-15, 0, 23);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20, 0, 10);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(20, 0, 23);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 0, 10);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 0, 23);
        this.pushMatrix();
        this.scale(2, 3, 2);
        this.treeGroupPatch.display();
        this.popMatrix();
        this.popMatrix();

        // Fire Pit
        this.pushMatrix();
        this.translate(0, 0.005, 10);
        this.firePit.display();
        this.popMatrix();

        // Lake
        this.pushMatrix();
        this.translate(50, 0.5, 15);
        this.pushMatrix();
        this.scale(2.5, 1, 2.5);
        this.lake.display();
        this.popMatrix();
        this.popMatrix();


        // Garage
        this.pushMatrix();
        this.translate(10, 2, 0);
        this.pushMatrix();
        this.scale(4, 4, 4);
        this.garage.display();
        this.popMatrix();
        this.popMatrix();


        // Road
        this.pushMatrix();
        this.translate(0, 0, 23);
        this.pushMatrix();
        this.scale(5, 5, 5);
        this.road.display();
        this.popMatrix();
        this.popMatrix();

        // Sign
        this.pushMatrix();
        this.translate(3.5, 0, 25);
        this.sign.display();
        this.popMatrix();

        // Boat
        this.pushMatrix();
        this.translate(50, 0, 13);
        this.boat.display();
        this.popMatrix();



        //Car
        this.pushMatrix();
        this.translate(1, 1.25, 25);
        this.pushMatrix();
        this.rotate(-Math.PI/2, 0, 1, 0);
        this.car.display();
        this.popMatrix();
        this.popMatrix();

        /*
         *  END DRAWING
         */
    }


    //Function to aid randomizing the placement and size of objects
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}