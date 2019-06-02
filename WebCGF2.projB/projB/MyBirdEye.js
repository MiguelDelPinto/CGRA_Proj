/**
 * MyBirdEye
 * @constructor
 */
class MyBirdEye extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.sphere = new MySphere(this.scene, 0.1, 15, 15);

        //Black material - black part of the eye, a diffuse material
    	this.black_material = new CGFappearance(this.scene);
        this.black_material.setAmbient(1, 1, 1, 1.0);
        this.black_material.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.black_material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.black_material.setShininess(10.0);   
		this.black_material.loadTexture('images/black.jpg');
		this.black_material.setTextureWrap('REPEAT', 'REPEAT');

    	//White material - white part of the eye, a specular material
    	this.white_material = new CGFappearance(this.scene);
        this.white_material.setAmbient(1, 1, 1, 1.0);
        this.white_material.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.white_material.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.white_material.setShininess(100.0);   
		this.white_material.loadTexture('images/white.png');
		this.white_material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        
        //Drawing the black portion of the eye
        this.scene.pushMatrix();
			this.scene.scale(1, 1, 1);
			this.black_material.apply();
			this.sphere.display();
        this.scene.popMatrix();

		//Drawing the white portion of the eye (light reflex)
        this.scene.pushMatrix();
			this.scene.rotate(Math.PI/4, 0, 1, 0);
			this.scene.scale(1/3, 1/3, 1/7);
			this.scene.translate(0, 0, 0.63);
			this.white_material.apply();
			this.sphere.display();
        this.scene.popMatrix();
    }       
}