/**
* MyHouse
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
                
        this.walls = new MyUnitCubeQuad(scene,'images/wall.jpg');  
        this.roof = new MyPyramid(scene, 4, 1);
        this.pillars = [];
        for(let i = 0; i < 4; i++){
        	this.pillars.push(new MyPrism(scene, 6, 1));
        }      
                
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
        this.roof_texture = new CGFtexture(this.scene, 'images/roof.jpg');
        //this.wall_texture = new CGFtexture(this.scene, 'images/wall.jpg');
        this.pillar_texture = new CGFtexture(this.scene, 'images/pillar.jpg');

    	//Roof Material
        this.roof_material = new CGFappearance(this.scene);
        this.roof_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.roof_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roof_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.roof_material.setShininess(10.0);
        this.roof_material.setTexture(this.roof_texture);

        //Walls Material 
        /*
        this.wall_material = new CGFappearance(this.scene);
        this.wall_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.wall_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wall_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.wall_material.setShininess(10.0);
        this.wall_material.setTexture(this.wall_texture);
        */

        //Pillar Material
        this.pillar_material = new CGFappearance(this.scene);
        this.pillar_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.pillar_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pillar_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.pillar_material.setShininess(10.0);
        this.pillar_material.setTexture(this.pillar_texture);
    }
    
    display() {
		//Drawing Walls
		//this.wall_material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, 0);
		this.walls.display();
		this.scene.popMatrix();

		//Drawing Roof
		this.roof_material.apply();
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/4, 0, 1, 0);
		this.scene.pushMatrix();
		this.scene.scale(1.5, 1, 1.5);
		this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.roof.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		
		//Drawing Pillars
		this.pillar_material.apply();
		
		this.scene.pushMatrix();
		this.scene.translate(0.75, 0, 0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[0].display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 0, 0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[1].display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 0, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[2].display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.75, 0, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		this.pillars[3].display();
		this.scene.popMatrix();
		this.scene.popMatrix();
    }
}