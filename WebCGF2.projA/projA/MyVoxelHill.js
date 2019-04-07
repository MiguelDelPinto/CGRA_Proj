/**
* MyVoxelHill
* @constructor
*/
class MyVoxelHill extends CGFobject {
    constructor(scene, levels) {
        super(scene);
        
        this.levels = levels;
        this.cube = new MyUnitCubeQuad(scene, 'images/wall.jpg', 'images/roof.jpg', 'images/trunk.jpg');  
                
        this.initMaterials();
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

    initMaterials(){
        this.cube_texture = new CGFtexture(this.scene, 'images/roof.jpg');

    	//Cube Material
        this.cube_material = new CGFappearance(this.scene);
        this.cube_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.cube_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cube_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.cube_material.setShininess(10.0);
        this.cube_material.setTexture(this.cube_texture);
    }
    
    display() {
        let y = 0;

        for(let n = this.levels; n > 0; n--) {          //Movement in the y axis        
            let limit = 2*n - 1;
            let x = -n + 1;

            for(let i = 1; i <= limit; i++) {          //Movement in the x axis
                let z = -n + 1;

                for(let j = 1; j <= limit; j++) {      //Movement in the z axis  

                    if(n == this.levels || i == 1 || i == limit || j == 1 || j == limit) {  //optimization
                        this.scene.pushMatrix();
                        this.scene.translate(x, y, z);
                        this.cube.display();
                        this.scene.popMatrix();
                    }                

                    z++;
                }

                x++;
            }

            y++;
        }      
    }
}