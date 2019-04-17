/**
* MySign
* @constructor
*/
class MySign extends CGFobject {
    constructor(scene, sign_image) {
        super(scene);
        
        this.radius = 0.1;
        this.height = 4;

        this.cylinder = new MyCylinder(scene, 5, 1, true, true);
        this.quad = new MyQuad(scene);
                
		//Metal Material
        this.metal_material = new CGFappearance(this.scene);
        this.metal_material.setAmbient(0.5, 0.5, 0.5, 1);
        this.metal_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.metal_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.metal_material.setShininess(10.0);
        this.metal_material.loadTexture('images/metal.jpg');

        //Sign Material
        this.sign_material = new CGFappearance(this.scene);
        this.sign_material.setAmbient(0.5, 0.5, 0.5, 1);
        this.sign_material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.sign_material.setSpecular(0.8, 0.8, 0.8, 1);
        this.sign_material.setShininess(10.0);
        this.sign_material.loadTexture(sign_image);

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

        // Drawing the metal pole
        this.scene.pushMatrix();
        this.scene.scale(this.radius, this.height, this.radius);
        this.metal_material.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        // Drawing the sign
        this.scene.pushMatrix();
        this.scene.translate(0, this.height, 0);

        this.scene.pushMatrix();
        this.scene.scale(1.3, 1.5, 1.3);
        
        this.scene.pushMatrix();                //Front face
        this.scene.translate(0, 0, 0.1);
        this.sign_material.apply();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();                //Back face
        this.scene.translate(0, 0, -0.1);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();                //Right face
        this.scene.translate(0.5, 0, 0);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0)
        this.scene.pushMatrix();
        this.scene.scale(1/5, 1, 1);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix()
            
        this.scene.pushMatrix();                //Left face
        this.scene.translate(-0.5, 0, 0);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.scale(1/5, 1, 1);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();                //Down face
        this.scene.translate(0, -0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.scale(1, 1/5, 1);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();                //Up face
        this.scene.translate(0, 0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.scale(1, 1/5, 1);
        this.metal_material.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}