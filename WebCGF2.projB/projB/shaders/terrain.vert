attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D tex;
uniform sampler2D colorTex;

uniform float scale;

varying float heightValue;
varying vec2 vTextureCoord;

void main() {
	vec4 textureHeight = texture2D(tex, aTextureCoord);

	float height = textureHeight.y*scale;
	
	if(aTextureCoord.x >= 1.0/3.0 && aTextureCoord.x <= 2.0/3.0 && aTextureCoord.y >= 1.0/3.0 && aTextureCoord.y <= 2.0/3.0){
		height = 0.0;
	}

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0) + vec4(0.0, height, 0.0, 0.0);
	
	heightValue = height;
	vTextureCoord = aTextureCoord;
}