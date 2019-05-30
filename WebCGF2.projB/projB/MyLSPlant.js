/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.axiom = "X";
        this.ruleF = "FF";
        this.ruleX = "F[-X][X]F[-X]+FX";
        
        this.ruleX_1 = "F[-X][X]F[-X]+X";
        this.ruleX_2 = "F[-X][X]+X";
        this.ruleX_3 = "F[+X]-X";
        this.ruleX_4 = "F[/X][X]F[\\\\X]+X";
        this.ruleX_5 = "F[\\X][X]/X";
        this.ruleX_6 = "F[/X]\\X";
        this.ruleX_7 = "F[^X][X]F[&X]^X";
        this.ruleX_8 = "F[^X]&X";
        this.ruleX_9 = "F[&X]^X";
        
        this.angle = 30.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;

        this.doGenerate();
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
    }

    doGenerate(){ 
    		this.generate(
                this.axiom,
                {
                    "F": [ this.ruleF ],
                    "X": [ this.ruleX_1, 
                           this.ruleX_2, 
                           this.ruleX_3, 
                           this.ruleX_4,
                           this.ruleX_5, 
                           this.ruleX_6, 
                           this.ruleX_7,
                           this.ruleX_8,  
                           this.rukeX_9, ]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }

}