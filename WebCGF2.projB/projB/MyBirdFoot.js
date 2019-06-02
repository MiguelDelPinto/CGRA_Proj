/**
 * MyBirdFoot
 * @constructor
 */
class MyBirdFoot extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.leg = new MyUnitCubeQuad(this.scene, 'images/orange.jpg', 'images/orange.jpg', 'images/orange.jpg');
        this.fingers = new MyPrism(this.scene, 3, 3);

        //Orange material - bird's foot, a diffuse material
    	this.orange_material = new CGFappearance(this.scene);
        this.orange_material.setAmbient(1, 1, 1, 1.0);
        this.orange_material.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.orange_material.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.orange_material.setShininess(10.0);   
		this.orange_material.loadTexture('images/orange.jpg');
		this.orange_material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        
       	this.scene.scale(0.5, 0.5, 0.7);
        	
        //Drawing the legs
        this.scene.pushMatrix();
			this.scene.scale(0.2, 0.8, 0.2);
			this.leg.display();
        this.scene.popMatrix();

		//Drawing the fingers
        this.scene.pushMatrix();
			this.scene.scale(1/2, 1/6, 1/2);
			this.scene.translate(0.1, -2.39, 0.8);
			this.scene.rotate(0.2 + Math.PI/2, 0, 1, 0);
			this.orange_material.apply();
			this.fingers.display();
        this.scene.popMatrix();
    }       
}