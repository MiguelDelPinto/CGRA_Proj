/**
* MSphere
* @constructor
*/
class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alphaAng = 2*Math.PI/this.slices;
        var betaAng = 2*Math.PI/this.stacks;
        
        for(var stack = 0; stack <= this.stacks; stack++) {
            for(var slice = 0; slice <= this.slices; slice++) {
                
                var x = this.radius * Math.cos(slice * alphaAng) * Math.sin(stack * betaAng);
                var y = this.radius * Math.cos(stack * betaAng);
                var z = this.radius * Math.sin(slice * alphaAng) * Math.sin(stack * betaAng);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(1 - (slice / this.slices), 1 - (stack / this.stacks));
                
                if(stack != this.stacks && slice != this.slices) {
                    var index = (stack * (this.slices + 1)) + slice;

                    this.indices.push(index, index + this.slices + 2, index + this.slices + 1);
                    this.indices.push(index, index + 1, index + this.slices + 2);
                }
            }
        }        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


