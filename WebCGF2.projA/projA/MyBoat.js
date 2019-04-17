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
        this.cube_wood = new MyUnitCubeQuad(scene, 'images/mast.jpg', 'images/mast.jpg', 'images/mast.jpg');
        this.half_cube_body = new MyHalfCube(scene, 'images/metal_rusty.jpg');     
        this.half_cube_sail = new MyHalfCube(scene, 'images/sail.jpg');

        //Mast Material
        this.mast_material = new CGFappearance(this.scene);
        this.mast_material.setAmbient(0.5, 0.5, 0.5, 1);
        this.mast_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.mast_material.setSpecular(0.8, 0.8, 0.8, 1);
        this.mast_material.setShininess(10.0);
        this.mast_material.loadTexture('images/mast.jpg');

        //Floor Material
        this.floor_material = new CGFappearance(this.scene);
        this.floor_material.setAmbient(0.8, 0.8, 0.8, 1);
        this.floor_material.setDiffuse(0.6, 0.6, 0.6, 1);
        this.floor_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.floor_material.setShininess(10.0);
        this.floor_material.loadTexture('images/wood.jpg');

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
        this.scene.scale(1, -1, -2);
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

        // Drawing the wood perimeter
        this.mast_material.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 1 + 1/8, 0.9);
        this.scene.pushMatrix();
        this.scene.scale(7.7, 1/4, 0.07);
        this.cube_wood.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 1 + 1/8, -0.9);
        this.scene.pushMatrix();
        this.scene.scale(7.7, 1/4, 0.07);
        this.cube_wood.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.translate(0, 1 + 1/8, -3.8);
        this.scene.pushMatrix();
        this.scene.scale(1.8, 1/4, 0.07);
        this.cube_wood.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.translate(0, 1 + 1/8, 3.8);
        this.scene.pushMatrix();
        this.scene.scale(1.8, 1/4, 0.07);
        this.cube_wood.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        // Drawing the floor
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.01);
        this.scene.pushMatrix();
        this.scene.scale(7.7, 1.8, 1);
        this.floor_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();


        this.scene.popMatrix();
    }
}