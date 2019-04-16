/**
* MyTree
* @constructor
*/
class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, 
                treeTopRadius, trunkTexture,treeTopTexture) {
        super(scene);
        
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.trunkTexture = trunkTexture;
        this.treeTopTexture = treeTopTexture;

        this.cylinder = new MyCylinder(scene, 5, 1);
        this.wrap_cylinder = new MyCylinder(scene, 5, 1, true, true);

        this.cone = new MyCone(scene, 10, 1);
        this.wrap_cone = new MyCone(scene, 10, 1, true);
                
		//Tree Top Material
        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(0.1, 0.1, 0.1, 1);
        this.material1.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material1.setSpecular(0.1, 0.1, 0.1, 1);
        this.material1.setShininess(10.0);
        this.material1.setTexture(treeTopTexture);

        //Trunk Material
        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(0.1, 0.1, 0.1, 1);
        this.material2.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        this.material2.setTexture(trunkTexture);

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

        //DRAWING THE CYLINDER
        this.scene.pushMatrix();
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
        this.material2.apply();
        if(this.scene.wrapTextures)
        	this.wrap_cylinder.display();
        else
        	this.cylinder.display();
        
        this.scene.popMatrix();

        //DRAWING THE CONE
        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0);
        this.scene.pushMatrix();
        this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
        this.material1.apply();
        if(this.scene.wrapTextures)
        	this.wrap_cone.display();
        else
        	this.cone.display();
        
        this.scene.popMatrix();
        this.scene.popMatrix();

    }
}