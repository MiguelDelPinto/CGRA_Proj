#ifdef GL_ES
precision highp float;
#endif

varying float heightValue;
varying vec2 vTextureCoord; 

uniform sampler2D colorTex;
uniform sampler2D uSampler;

void main() {
	float height = heightValue;
	
	float value = 1.0/height;


	vec4 color = texture2D(uSampler, vTextureCoord+vec2(0.01, 0.01))*1.25;
	vec4 color1 = texture2D(colorTex, vec2(0, value))*1.25;
	
	gl_FragColor = color*color1;
}