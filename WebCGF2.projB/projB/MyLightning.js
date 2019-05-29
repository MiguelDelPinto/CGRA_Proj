/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.initMaterials();
        this.axiom = "X";
        this.ruleF = "FF";
        this.ruleX = "F[-X][X]F[-X]+FX";   

        this.ruleX_1 = "F[-X][X]F[-X]F+FXF";
        this.ruleX_2 = "F[-X][X]-FXF[-X][X]F";
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;

        this.depth = 0;
        this.max_depth = 5;

        this.doGenerate();
    }

    initMaterials(){
        this.lightning_material = new CGFappearance(this.scene);
		this.lightning_material.setAmbient(1.0, 1.0, 1.0, 1);
		this.lightning_material.setDiffuse(0.9, 0.9, 0.9, 1);
		this.lightning_material.setSpecular(0.1, 0.1, 0.1, 1);
		this.lightning_material.setShininess(100);

		this.lightning_texture = new CGFtexture(this.scene, "images/lightning.jpg");
		this.lightning_material.setTexture(this.lightning_texture); 
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyQuad(this.scene),
            "X": new MyQuad(this.scene)
        };
    }

    doGenerate(){
            this.generate(
                this.axiom,
                {
                    "F": [ this.ruleF ],
                    "X": [ this.ruleX,
                    	   this.ruleX_1, 
                           this.ruleX_2
                         ]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }

    update(t, startCounting){
        if(startCounting){
            this.lastTime = 0;   
        }
        this.lastTime = this.lastTime || 0;
		this.deltaTime = t - this.lastTime;
		this.lastTime = t;
		this.depth = Math.ceil((this.deltaTime*this.max_depth)/100);
		//TODO Calculate max_depth
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        this.scene.pushMatrix();
                        this.scene.scale(0.25, 1.5, 1);
                        this.lightning_material.apply();
                        primitive.display();
                        this.scene.popMatrix();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}