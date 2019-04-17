/**
* MyTreeGroupPatch
* @constructor
*/
class MyTreeGroupPatch extends CGFobject {
    constructor(scene, trunkTexture, treeTopTexture) {
        super(scene);
        
        this.trees = [];

		//populates the 'trees' array with randomized trees (varying in radius and height)
        for(var i = 0; i < 9; i++) {
            this.trees.push(new MyTree(scene,
            						1 + this.scene.getRandomArbitrary(-0.2, 0.5),
            						0.35 + this.scene.getRandomArbitrary(-0.05, 0.05),
            						1 + this.scene.getRandomArbitrary(-0.3, 0.4),
            						0.8 + this.scene.getRandomArbitrary(-0.2, 0.1),
            						trunkTexture,
            						treeTopTexture)
            				);
        }         

		this.x_positions = [];
		this.z_positions = [];

		//randomizes the x and z coordinates of the trees
		let x = this.scene.getRandomArbitrary(-0.1, 0.1);
		let z = this.scene.getRandomArbitrary(-0.1, 0.1);

		for(let i = 0; i < 9; i++){
			this.x_positions.push(x);
			this.z_positions.push(z);
				
			if((i+1)%3 == 0){
				x = this.scene.getRandomArbitrary(-0.1, 0.1);
				z += 1.5;
			}
			else{
				x += this.scene.getRandomArbitrary(1.5, 1.75);
				z += this.scene.getRandomArbitrary(-0.1, 0.1);
			}
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
        
        //displays the tree in a group fashion
        for(let i = 0; i < 9; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.x_positions[i], 0, this.z_positions[i]);
			this.trees[i].display();
			this.scene.popMatrix();
		}
    }
}