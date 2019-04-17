/**
* MyFirePit
* @constructor
*/
class MyFirePit extends CGFobject {
    constructor(scene) {
        super(scene);
                
        this.exterior_wall = new MyCylinder(scene, 10, 1, true);
        this.wrap_exterior_wall = new MyCylinder(scene, 10, 1, true, true);

        this.interior_wall = new MyCylinderInverted(scene, 10, 1, true);
        this.wrap_interior_wall = new MyCylinderInverted(scene, 10, 1, true, true);
         
        this.wood = new MyPrism(scene, 8, 1);
        this.wrap_wood = new MyPrism(scene, 8, 1, true);

        this.fire = new MyCone(scene, 8, 1);
        this.wrap_fire = new MyCone(scene, 8, 1, true);
                
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
        this.wall_texture = new CGFtexture(this.scene, 'images/stoneWall.jpg');
        this.wood_texture = new CGFtexture(this.scene, 'images/wood.jpg');
        this.fire_texture = new CGFtexture(this.scene, 'images/fire.jpg');

    	//Wall Material (stone - diffuse material)
        this.wall_material = new CGFappearance(this.scene);
        this.wall_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.wall_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wall_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.wall_material.setShininess(10.0);
        this.wall_material.setTexture(this.wall_texture);

        //Wood Material (wood - diffuse material)
        this.wood_material = new CGFappearance(this.scene);
        this.wood_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.wood_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wood_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.wood_material.setShininess(10.0);
        this.wood_material.setTexture(this.wood_texture);

        //Fire Material
        this.fire_material = new CGFappearance(this.scene);
        this.fire_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.fire_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.fire_material.setSpecular(0.6, 0.6, 0.6, 1);
        this.fire_material.setShininess(10.0);
        this.fire_material.setTexture(this.fire_texture);
    }
    
    display() {

    	//Draws the stones 
    	this.wall_material.apply();
		this.exterior_wall.display();
      	this.interior_wall.display();

      	//Draws the wood 
		this.wood_material.apply();

		this.scene.pushMatrix();
		this.scene.translate(-0.1, 0.14, 0.3);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/4, 1, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.2, 1, 0.2);
		if(this.scene.wrapTextures)
			this.wrap_wood.display();
		else
			this.wood.display();
		
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.1, 0.14, -0.3);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/4, 1, 0, 0);
		this.scene.pushMatrix();
		this.scene.scale(0.2, 1, 0.2);
		if(this.scene.wrapTextures)
			this.wrap_wood.display();
		else
			this.wood.display();

		this.wood.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(0.5, 0.14, -0.5);
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/4, 1, 0, 1);
		this.scene.pushMatrix();
		this.scene.scale(0.2, 1, 0.2);
		if(this.scene.wrapTextures)
			this.wrap_wood.display();
		else
			this.wood.display();

		this.wood.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.5, 0.14, 0.5);
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/6, 1, 0, 1);
		this.scene.pushMatrix();
		this.scene.scale(0.2, 1, 0.2);
		if(this.scene.wrapTextures)
			this.wrap_wood.display();
		else
			this.wood.display();

		this.wood.display();
		this.scene.popMatrix();
		this.scene.popMatrix();
		this.scene.popMatrix();
		
		//Draw fire
		if(this.scene.enableFire){
			this.fire_material.apply();

			this.scene.pushMatrix();
			this.scene.translate(0, 0.9, 0);
			this.scene.pushMatrix();
			this.scene.scale(0.3, 0.5, 0.3);
			if(this.scene.wrapTextures)
				this.wrap_fire.display();
			else
				this.fire.display();

			this.scene.popMatrix();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0.2, 0.7, 0.2);
			this.scene.pushMatrix();
			this.scene.scale(0.3, 0.5, 0.3);
			if(this.scene.wrapTextures)
				this.wrap_fire.display()
			else
				this.fire.display();

			this.scene.popMatrix();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0.2, 0.6, -0.2);
			this.scene.pushMatrix();
			this.scene.scale(0.3, 0.5, 0.3);
			if(this.scene.wrapTextures)
				this.wrap_fire.display();
			else
				this.fire.display();

			this.scene.popMatrix();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-0.2, 0.8, 0.25);
			this.scene.pushMatrix();
			this.scene.scale(0.3, 0.5, 0.3);
			if(this.scene.wrapTextures)
				this.wrap_fire.display();
			else
				this.fire.display();

			this.scene.popMatrix();
			this.scene.popMatrix();
		}

    }
}