/**
 * MyGarage
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyGarage extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

		this.quad = new MyQuad(scene);
			
		this.number_of_quads_in_door = 10;	
		this.frames_to_change = 30;

        this.initMaterials();
	}
	initBuffers() {
		this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	initMaterials(){
		this.garage_door_texture = new CGFtexture(this.scene, 'images/garage_door.jpg');
		this.walls_texture = new CGFtexture(this.scene, 'images/wall.jpg');
		this.roof_texture = new CGFtexture(this.scene, 'images/roof.jpg');
 	    
		this.garage_door_material = new CGFappearance(this.scene);
        this.garage_door_material.setAmbient(0, 0, 0, 1.0);
        this.garage_door_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.garage_door_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.garage_door_material.setShininess(10.0);
        this.garage_door_material.setTexture(this.garage_door_texture);
       	this.garage_door_material.setTextureWrap('REPEAT', 'REPEAT');      	
		
		this.walls_material = new CGFappearance(this.scene);
        this.walls_material.setAmbient(0, 0, 0, 1.0);
        this.walls_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.walls_material.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.walls_material.setShininess(10.0);
        this.walls_material.setTexture(this.walls_texture);
       	this.walls_material.setTextureWrap('REPEAT', 'REPEAT');   

       	//Roof Material
        this.roof_material = new CGFappearance(this.scene);
        this.roof_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.roof_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roof_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.roof_material.setShininess(10.0);
        this.roof_material.setTexture(this.roof_texture);   	

	}

	display(){
		this.frames_to_change--;

		if(this.scene.garageDoorPosition == 0 && this.number_of_quads_in_door < 10 && this.frames_to_change == 0) //Close
		{
			this.number_of_quads_in_door++;
		}
		else if(this.scene.garageDoorPosition == 1 && this.number_of_quads_in_door > 0 && this.frames_to_change == 0) //Open
		{
			this.number_of_quads_in_door--;
		}

		if(this.frames_to_change == 0)
			this.frames_to_change = 30;

		var texCoords = [];
		
		//Front Face
		for(var i = 0; i < this.number_of_quads_in_door; i++){
			texCoords = [0, 1/10+(10-this.number_of_quads_in_door+i)/10, 1, 1/10+(10-this.number_of_quads_in_door+i)/10, 0,(10-this.number_of_quads_in_door+i)/10, 1, (10-this.number_of_quads_in_door+i)/10];
        	this.quad.updateTexCoords(texCoords);
        	this.garage_door_material.apply();
			
			this.scene.pushMatrix();
			this.scene.translate(0, 0.45-i*0.1, 0.5);

			this.scene.pushMatrix();
			this.scene.scale(1, 0.1, 1);
			this.quad.display();
			this.scene.popMatrix();
			this.scene.popMatrix();
		}

		texCoords = [ 0, 1, 1, 1, 0, 0, 1, 0];
        this.quad.updateTexCoords(texCoords);
        
		//Applying Walls Material
		this.walls_material.apply();

		//Back Face 
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.5);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Back Face Inside
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -0.5);
		this.quad.display();
		this.scene.popMatrix();

		//Left Face
		this.scene.pushMatrix();
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Left Face Inside
		this.scene.pushMatrix();
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Right Face
		this.scene.pushMatrix();
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Right Face Inside
		this.scene.pushMatrix();
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.quad.display();
		this.scene.popMatrix();
		
		//Top Face Inside
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Bottom Face
		this.scene.pushMatrix();
		this.scene.translate(0, -0.499, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();

		//Top Face
		this.roof_material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.quad.display();
		this.scene.popMatrix();

	}
}