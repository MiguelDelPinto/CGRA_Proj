/**
* MyTreeGroupPatch
* @constructor
*/
class MyTreeGroupPatch extends CGFobject {
    constructor(scene, trunkTexture, treeTopTexture) {
        super(scene);
        
        this.trees = [];

        var trunkHeight = 1 + this.scene.getRandomArbitrary(-0.2, 0.5);
        var trunkRadius = 0.35 + this.scene.getRandomArbitrary(-0.05, 0.05);
        var treeTopHeight = 1 + this.scene.getRandomArbitrary(-0.5, 0.2);
        var treeTopRadius = 1 + this.scene.getRandomArbitrary(-0.2, 0.3);

        for(var i = 0; i < 9; i++) {
            this.trees.push( new MyTree(trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture));
        }          
                
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
        
        var count = 0;
        var x = 0;

        for(var i = 0; i < 3; i++) {

            var z = 0;

            for(var j = 0; j < 3; j++) {
                
                this.scene.pushMatrix();
                this.scene.translate(x, 0, z);
                this.trees[count].display();
                this.scene.popMatrix();
                z += 1;
            }

            x += 1;
        }
    }
}