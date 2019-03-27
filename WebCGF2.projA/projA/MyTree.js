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

        this.cylinder = new MyCylinder(scene, 7, 1);
        this.cone = new MyCone(scene, 7, 1);
        
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
        this.cylinder.display();
        this.scene.popMatrix();

        //DRAWING THE CONE
        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0);
        this.cone.display();
        this.scene.popMatrix();

    }
}