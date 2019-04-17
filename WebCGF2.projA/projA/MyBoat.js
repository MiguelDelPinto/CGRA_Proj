/**
* MyBoat
* @constructor
*/
class MyBoat extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.radius = 0.1;
        this.height = 4;

        this.cylinder = new MyCylinder(scene, 5, 1, true, true);
        this.quad = new MyQuad(scene);
                
		//Rusty Metal Material
        this.metal_material = new CGFappearance(this.scene);
        this.metal_material.setAmbient(0.5, 0.5, 0.5, 1);
        this.metal_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.metal_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.metal_material.setShininess(10.0);
        this.metal_material.loadTexture('images/metal_rusty.jpg');

        //Mast Material
        this.mast_material = new CGFappearance(this.scene);
        this.mast_material.setAmbient(0.5, 0.5, 0.5, 1);
        this.mast_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.mast_material.setSpecular(0.8, 0.8, 0.8, 1);
        this.mast_material.setShininess(10.0);
        this.mast_material.loadTexture('images/mast.jpg');

        //Sail Material
        this.mast_material = new CGFappearance(this.scene);
        this.mast_material.setAmbient(0.5, 0.5, 0.5, 1);
        this.mast_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.mast_material.setSpecular(0.8, 0.8, 0.8, 1);
        this.mast_material.setShininess(10.0);
        this.mast_material.loadTexture('images/sail.jpg');

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

        // Drawing the body of the boat
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);


        this.scene.pushMatrix();                //Down face
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();                //Up face
        this.scene.translate(0, 1, 0);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.scale(3, 2, 1);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 1);
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}