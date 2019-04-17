/**
* MyBoat
* @constructor
*/
class MyBoat extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.radius = 0.1;
        this.height = 4;

        this.cylinder = new MyCylinder(scene, 7, 1, false, true);
        this.quad = new MyQuad(scene);
        this.triangle = new MyTriangle(scene);
        this.cube = new MyUnitCubeQuad(scene,'images/metal_rusty.jpg','images/metal_rusty.jpg','images/metal_rusty.jpg');
        this.half_cube_body = new MyHalfCube(scene, 'images/metal_rusty.jpg');     
        this.half_cube_sail = new MyHalfCube(scene, 'images/sail.jpg');
                
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

        this.scene.pushMatrix();
        this.scene.scale(4, 2, 2);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 2);
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.half_cube_body.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.half_cube_body.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();


        // Drawing the mast
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.pushMatrix();
        this.scene.scale(0.3, 8, 0.3);
        this.mast_material.apply();
        this.cylinder.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        // Drawing the sail
        this.scene.pushMatrix();
        this.scene.translate(2, 5.5, 0);
        this.scene.pushMatrix();
        this.scene.scale(2, 3, 0.1);
        this.half_cube_sail.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}