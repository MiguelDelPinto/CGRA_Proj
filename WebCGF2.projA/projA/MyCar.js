/**
* MyCar
* @constructor
*/
class MyCar extends CGFobject {
    constructor(scene) {
        super(scene);
                
  		              
        this.half_cube = new MyHalfCube(scene, 'images/blue.jpg');
        this.cube = new MyUnitCubeQuad(scene, 'images/blue.jpg', 'images/blue.jpg', 'images/blue.jpg');
                
		this.wheel = new MyCylinder(scene, 10, 1);   

		this.triangle = new MyTriangle(scene);             
		this.quad = new MyQuad(scene);

        this.initMaterials();
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    initMaterials(){
    	//Textures
       	this.wheel_texture = new CGFtexture(this.scene, 'images/tire.jpg');
       	this.glass_texture = new CGFtexture(this.scene, 'images/car_glass.jpg');
       	this.plate_texture = new CGFtexture(this.scene, 'images/car_plate.jpg');

    	//Wheel Material
        this.wheel_material = new CGFappearance(this.scene);
        this.wheel_material.setAmbient(0.7, 0.7, 0.7, 1);
        this.wheel_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wheel_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.wheel_material.setShininess(10.0);
        this.wheel_material.setTexture(this.wheel_texture);

        //Glass Material
        this.glass_material = new CGFappearance(this.scene);
        this.glass_material.setAmbient(0.7, 0.7, 0.7, 1);
        this.glass_material.setDiffuse(0.4, 0.4, 0.4, 1);
        this.glass_material.setSpecular(0.6, 0.6, 0.6, 1);
        this.glass_material.setShininess(10.0);
        this.glass_material.setTexture(this.glass_texture);

        //Plate Material
        this.plate_material = new CGFappearance(this.scene);
        this.plate_material.setAmbient(0.7, 0.7, 0.7, 1);
        this.plate_material.setDiffuse(0.4, 0.4, 0.4, 1);
        this.plate_material.setSpecular(0.6, 0.6, 0.6, 1);
        this.plate_material.setShininess(10.0);
        this.plate_material.setTexture(this.plate_texture);
    }
    
    display() {
    	this.scene.pushMatrix();
    	this.scene.scale(4, 1, 3);
    	this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(1, 1, 3);
		this.cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1.25, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.75, 0.5, 3);
		this.half_cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.25, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 0.5, 3);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.half_cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-1, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 3);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.half_cube.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		//Display Wheels
		this.wheel_material.apply();

		this.scene.pushMatrix();
		this.scene.translate(-1.25, -0.75, 1.25);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.wheel.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-1.25, -0.75, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.wheel.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1.25, -0.75, 1.25);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.wheel.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1.25, -0.75, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 0.5);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.wheel.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		//Display Glass
		this.glass_material.apply();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 1, 1.501);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 1);
		this.triangle.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 1, -1.501);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 1);
		this.triangle.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1, 1, 1.501);
		this.scene.pushMatrix();
		this.scene.scale(0.75, 0.5, 1);
		this.triangle.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1, 1, -1.501);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.75, 1);
		this.triangle.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-1.001, 1, 0);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.rotate(-Math.PI/4, 1, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(2.8, 1, 1);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1.0001, 1.25, 0);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(-Math.PI/3, 1, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(2, 0.75, 1);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		//Plate
		this.plate_material.apply();

		this.scene.pushMatrix();
		this.scene.translate(2.01, 0.15, 0);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(2, 0.5, 1);
		this.quad.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

    }
}