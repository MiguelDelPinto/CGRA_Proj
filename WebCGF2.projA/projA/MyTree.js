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
        this.top_material = new CGFappearance(this.scene);
        this.top_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.top_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.top_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.top_material.setShininess(10.0);
        this.top_material.setTexture(treeTopTexture);

        //Trunk Material
        this.trunk_material = new CGFappearance(this.scene);
        this.trunk_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunk_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunk_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.trunk_material.setShininess(10.0);
        this.trunk_material.setTexture(trunkTexture);

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
        this.trunk_material.apply();
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
        this.top_material.apply();
        if(this.scene.wrapTextures)
        	this.wrap_cone.display();
        else
        	this.cone.display();
        
        this.scene.popMatrix();
        this.scene.popMatrix();

    }
}