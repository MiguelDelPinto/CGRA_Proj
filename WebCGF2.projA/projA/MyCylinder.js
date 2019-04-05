/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));         
            this.vertices.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));
            this.vertices.push(Math.cos(ang+alphaAng), 1, -Math.sin(ang+alphaAng));

            this.indices.push(4*i, (4*i+3) % (4*this.slices), (4*i+1)%(4*this.slices));
            this.indices.push(4*i, (4*i+2) % (4*this.slices), (4*i+3)%(4*this.slices));
            this.indices.push(4*i+1, (4*i+3) % (4*this.slices), 4*this.slices);
            this.indices.push(4*this.slices+1, (4*i+2) % (4*this.slices), 4*i);

            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));
            this.normals.push(Math.cos(ang+alphaAng), 0, -Math.sin(ang+alphaAng));
            
            this.texCoords.push(0, 1);
            this.texCoords.push(0, 0);
            this.texCoords.push(1, 1);
            this.texCoords.push(1, 0);

            ang+=alphaAng;   
        }
        
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);

        this.vertices.push(0, 0, 0);
        this.normals.push(0, -1, 0);
        this.texCoords.push(0.5, 0.5);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


