/**
* MyTreeRowPatch
* @constructor
*/
class MyTreeRowPatch extends CGFobject {
    constructor(scene, trunkTexture, treeTopTexture) {
        super(scene);
              
        this.trees = [];
               
        for(var i = 0; i < 6; i++){
          this.trees.push(new MyTree(scene, 
          						1 + this.scene.getRandomArbitrary(-0.2, 0.5), 
          						0.3 + this.scene.getRandomArbitrary(0, 0.1), 
          						1 + this.scene.getRandomArbitrary(-0.3, 0.4),
          						0.8 + this.scene.getRandomArbitrary(-0.2, 0.1), 
          						trunkTexture, 
          						treeTopTexture)
          			);   
        }

		this.x_positions = [];
		this.z_positions = [];

		let x = 0;

		for(let i = 0; i < 6; i++){
			this.x_positions.push(x);
			x += this.scene.getRandomArbitrary(1.75, 2);
		}

		for(let i = 0; i < 6; i++){
			this.z_positions.push(this.scene.getRandomArbitrary(-0.3, 0.3));
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
      for(var i = 0; i < this.trees.length; i++){
        this.scene.pushMatrix();
        this.scene.translate(this.x_positions[i], 0, this.z_positions[i]);
        this.trees[i].display();
        this.scene.popMatrix();
      }
    }
}
