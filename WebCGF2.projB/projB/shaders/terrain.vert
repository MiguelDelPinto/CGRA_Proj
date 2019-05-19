attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D tex;
uniform float scale;

varying vec2 vTextureCoord;

void main() {
	vec4 color = texture2D(tex, aTextureCoord);

	float height = color.y*scale;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0) + vec4(0.0, height, 0.0, 0.0);

	vTextureCoord = aTextureCoord;
}