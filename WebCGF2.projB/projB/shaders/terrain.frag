#ifdef GL_ES
precision highp float;
#endif

varying float heightValue;

uniform sampler2D colorTex;

void main() {
	float height = heightValue;
	
	float value = 5.0/height;

	vec4 color = texture2D(colorTex, vec2(0, value));
	
	gl_FragColor = color;
}