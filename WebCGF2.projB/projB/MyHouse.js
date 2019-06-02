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
        this.roof_texture = new CGFtexture(this.scene, 'images/roof.jpg');
 	    this.pillar_texture = new CGFtexture(this.scene, 'images/pillar.jpg');
		this.window_texture = new CGFtexture(this.scene, 'images/window.jpg');
		this.door_texture = new CGFtexture(this.scene, 'images/door.jpg');

    	//Roof Material - tiles, a diffuse material
        this.roof_material = new CGFappearance(this.scene);
        this.roof_material.setAmbient(0.9, 0.9, 0.9, 1);
        this.roof_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roof_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.roof_material.setShininess(10.0);
        this.roof_material.setTexture(this.roof_texture);

        //Pillar Material - marble, a specular material
        this.pillar_material = new CGFappearance(this.scene);
        this.pillar_material.setAmbient(1, 1, 1, 1);
        this.pillar_material.setDiffuse(0.6, 0.6, 0.6, 1);
        this.pillar_material.setSpecular(0.9, 0.9, 0.9, 1);
        this.pillar_material.setShininess(10.0);
        this.pillar_material.setTexture(this.pillar_texture);

        //Window Material - glass and wood, a mixture between a specular material and a diffuse material
        this.window_material = new CGFappearance(this.scene);
        this.window_material.setAmbient(1, 1, 1, 1);
        this.window_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.window_material.setSpecular(0.9, 0.9, 0.9, 1);
        this.window_material.setShininess(10.0);
        this.window_material.setTexture(this.window_texture);

        //Door Material - wood, a diffuse material
        this.door_material = new CGFappearance(this.scene);
        this.door_material.setAmbient(1, 1, 1, 1);
        this.door_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.door_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.door_material.setShininess(10.0);
        this.door_material.setTexture(this.door_texture);
    }
    
    display() {
		
		//Drawing the walls
		this.scene.pushMatrix();
			this.scene.translate(0, 0.5, 0);
			this.scene.pushMatrix();
				this.scene.scale(3, 1, 1);
				this.walls.display();
			this.scene.popMatrix();
		this.scene.popMatrix();
		

		//Drawing the door
		this.door_material.apply();

		this.scene.pushMatrix();
			this.scene.scale(0.55, 0.75, 1);
			this.scene.pushMatrix();
				this.scene.translate(0, 0.5, 0.501);
				this.quad.display();
			this.scene.popMatrix();
		this.scene.popMatrix();

		//Drawing the windows
		this.window_material.apply();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.pushMatrix();
				this.scene.scale(0.5, 0.5, 1);
				this.scene.pushMatrix();
					this.scene.translate(-1.15, 1, 0.501);
					this.quad.display();
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.pushMatrix();
				this.scene.scale(0.5, 0.5, 1);
				this.scene.pushMatrix();
					this.scene.translate(1.15, 1, 0.501);
					this.quad.display();
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.5, 0.5, 1);
			this.scene.pushMatrix();
				this.scene.translate(1.5, 1, 0.501);
				this.quad.display();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.5, 0.5, 1);
			this.scene.pushMatrix();
				this.scene.translate(-1.5, 1, 0.501);
				this.quad.display();
			this.scene.popMatrix();
		this.scene.popMatrix();


		//Drawing the roof
		this.roof_material.apply();
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/4, 0, 1, 0);
			this.scene.pushMatrix();
				this.scene.scale(2.5, 1, 2.5);
				this.scene.pushMatrix();
					this.scene.translate(0, 1, 0);
					
					if(this.scene.wrapTextures)
						this.wrap_roof.display();
					else
						this.roof.display();

				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();

		
		//Drawing the pillars
		this.pillar_material.apply();
		
		this.scene.pushMatrix();
			this.scene.translate(1.5, 0, 1.25);
			this.scene.pushMatrix();
				this.scene.scale(0.25, 1, 0.25);
				this.pillar.display();
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.5, 0, 1.25);
			this.scene.pushMatrix();
				this.scene.scale(0.25, 1, 0.25);

				if(this.scene.wrapTextures)
					this.wrap_pillar.display();
				else
					this.pillar.display();

			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.5, 0, -1.25);
			this.scene.pushMatrix();
				this.scene.scale(0.25, 1, 0.25);
				
				if(this.scene.wrapTextures)
					this.wrap_pillar.display();
				else
					this.pillar.display();

			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.5, 0, -1.25);
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