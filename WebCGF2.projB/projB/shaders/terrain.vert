attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D tex;
uniform sampler2D colorTex;

uniform float scale;

varying vec4 position;
varying vec2 vTextureCoord;

void main() {
	vec4 textureHeight = texture2D(tex, aTextureCoord);

	vec3 offset = textureHeight.y*aVertexNormal*scale;
	
	position = vec4(aVertexPosition+offset, 1.0);
	
	gl_Position = uPMatrix * uMVMatrix * position;
	
	vTextureCoord = aTextureCoord;
}