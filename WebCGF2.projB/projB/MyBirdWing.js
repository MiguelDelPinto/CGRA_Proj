/**
 * MyBirdWing
 * @constructor
 */
class MyBirdWing extends CGFobject {
    constructor(scene) 
    {
        super(scene);
        this.inner = new MyUnitCubeQuad(this.scene, 'images/yellow_feathers.png', 'images/yellow_feathers.png', 'images/yellow_feathers.png');
        this.outer = new MyUnitCubeQuad(this.scene, 'images/yellow_feathers.png', 'images/yellow_feathers.png', 'images/yellow_feathers.png');
    }

    display(){

    	this.scene.scale(0.9, 0.8, 1.1);
        
        //Drawing the inner portion of the wing
        this.scene.pushMatrix();
			this.scene.scale(1, 0.1, 0.6);
			this.inner.display();
        this.scene.popMatrix();

		//Drawing the outer portion of the wing
        this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/4, 0, 0, 1);
			this.scene.scale(1, 0.1, 0.6);
			this.scene.translate(0.82, 3.45, 0);
			this.outer.display();
        this.scene.popMatrix();
    }       
}