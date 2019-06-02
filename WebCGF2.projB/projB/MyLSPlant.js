/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.axiom = "X";
        
        this.angle = 30.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
        
        this.init();
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
                    "F": [ "FF" ],
                    "X": [ "F[-X][X]F[-X]+X", 
                           "F[-X][X]+X",
                           "F[/X][X]F[\\X]+X",
                           "F[\X][X]/X", 
                           "F[^X][X]F[&X]^X",
                           "F[&X]^X" ]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }

}