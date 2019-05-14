/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {	
		this.vertices = [

			0.5, -0.5, -0.5,	//0
			0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,

			0.5, 0.5, -0.5,		//3
			0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,

			-0.5, 0.5, -0.5,	//6
			-0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,

			-0.5, -0.5, -0.5,	//9
			-0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,

			0.5, -0.5, 0.5,		//12
			0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,

			0.5, 0.5, 0.5,		//15
			0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,

			-0.5, 0.5, 0.5,		//18
			-0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,

			-0.5, -0.5, 0.5,	//21
			-0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
        ];

        this.normals = [

            -1, 0, 0,
            0, 0, 1,
            0, 1, 0,

            -1, 0, 0,
            0, -1, 0,
            0, 0, 1,

            1, 0, 0,
            0, 0, 1,
            0, -1, 0,

            1, 0, 0,
            0, 0, 1,
            0, 1, 0,

            -1, 0, 0,
            0, 0, -1,
            0, 1, 0,

            -1, 0, 0,
            0, -1, 0,
            0, 0, -1,

            1, 0, 0,
            0, 0, -1,
            0, -1, 0,

            1, 0, 0,
            0, 0, -1,
            0, 1, 0,
        ];
   
        this.indices = [
        
			12, 3, 0,	//right face
            15, 3, 12,

            22, 17, 13,	//front face
            19, 17, 22,

            9, 18, 21,	//left face
            6, 18, 9,

            1, 7, 10, 	//back face
            5, 7, 1,

            11, 14, 2, 	//downface
            23, 14, 11,

            20, 8, 4,	//top face
            16, 20, 4
        ];

        this.texCoords = [

            2/4, 2/3,
            2/4, 2/3,
            2/4, 2/3,

            2/4, 1/3,
            2/4, 1/3,
            2/4, 1/3,

            1/4, 1/3,
            1/4, 1/3,
            1/4, 1/3,
            
            1/4, 2/3,
            1/4, 2/3,
            1/4, 2/3,

            3/4, 2/3,
            3/4, 2/3,
            2/4, 1,

            3/4, 1/3,
            2/4, 0,
            3/4, 1/3,

            0, 1/3,
            1, 1/3,
            1/4, 0,

            0, 2/3,
            1, 2/3,
            1/4, 1
        ];
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();

	}

	updateBuffers() {};
}