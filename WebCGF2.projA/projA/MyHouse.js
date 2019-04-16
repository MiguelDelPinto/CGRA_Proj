/**
* MyHouse
* @constructor
*/
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
                
        this.walls = new MyUnitCubeQuad(scene,'images/wall.jpg');  
        this.roof = new MyPyramid(scene, 4, 1);
        this.wrap_roof = new MyPyramid(scene, 4, 1, true);

        this.pillar = new MyPrism(scene, 6, 1);
        this.wrap_pillar = new MyPrism(scene, 6, 1, true);
                
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
 	    this.pillar_texture = new CGFtexture(this.scene, 'images/pillar.jpg');

    	//Roof Material
        this.roof_material = new CGFappearance(this.scene);
        this.roof_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.roof_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roof_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.roof_material.setShininess(10.0);
        this.roof_material.setTexture(this.roof_texture);

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
		if(this.scene.wrapTextures)
			this.wrap_roof.display();
		else
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
		this.pillar.display();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 0, 0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		if(this.scene.wrapTextures)
			this.wrap_pillar.display();
		else
			this.pillar.display();
		
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.75, 0, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		if(this.scene.wrapTextures)
			this.wrap_pillar.display();
		else
			this.pillar.display();

		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.75, 0, -0.75);
		this.scene.pushMatrix();
		this.scene.scale(0.25, 1, 0.25);
		if(this.scene.wrapTextures)
			this.wrap_pillar.display();
		else
			this.pillar.display();
			
		this.scene.popMatrix();
		this.scene.popMatrix();
    }
}