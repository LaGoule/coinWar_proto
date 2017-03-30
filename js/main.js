//On créer l'objet qui contiendra tout le jeu
var game = new Phaser.Game(960, 540, Phaser.AUTO);
//On créer l'objet qui contiendra les états du jeu
var gameState = {
  //On charge tout les assets
  preload: function() {
    this.load.image('tux','res/tux.png');
    this.load.image('bg','res/flatbg.jpg');
  },

  //On lance create une fois que les assets sont tous chargés (une fois)
  create: function() {
    //Basics functions

    //Variables principales
    var j1 = {
      coinNb: 3,
      role: 1
    };
    var j2 = {
      coinNb: 3,
      role: 0
    };
    var gameTurn = 0;

    //On charge un fond au bol
    var bg = this.add.sprite(0,0,'bg');
    //-var tux = this.add.sprite(0,0,'tux');

    //Chaque joueur lance ces pièces
    var j1Roll = [];
    for(i=0;i<j1.coinNb;i++){
      j1Roll.push(Math.floor(Math.random() * 2));
    };
    var i=0;

    var j2Roll = [];
    for(i=0;i<j2.coinNb;i++){
      j2Roll.push(Math.floor(Math.random() * 2));
    };

    //On met dans la var jxScore le resultat des lancers
    var j1Score = '';
    for(i=0;i<j1Roll.length;i++){
      j1Score+=j1Roll[i];
      if(i!=j1Roll.length-1){j1Score+=' - '};
    }
    var j2Score = '';
    for(i=0;i<j2Roll.length;i++){
      j2Score+=j2Roll[i];
      if(i!=j2Roll.length-1){j2Score+=' - '};
    }



    var j1True = j1False = 0;

    for (var i=0;i<j1Roll.length;i++) {
        if (j1Roll[i] === 1) {
            j1True++;
        }else{
          j1False++;
        }
    };
    var j1Total = '';
    if(j1.role){
      j1Total = j1True;
    }else{
      j1Total = j1False;
    };

    console.log(j1True, j1False);


    //Partie dessin
    //Lancer du J1
    var style = { font: "65px Arial", fill: "#ff0022", align: "center" };
    var t = game.add.text(100, 100, j1Score, style);
    var t2 = game.add.text(370, 100, '= '+j1Total, style);
    //Lancer du J2
    var style = { font: "65px Arial", fill: "#00ff66", align: "center" };
    var t = game.add.text(100, 360, j2Score, style);


  },

  //Update se lance toute les frames après l'événement create
  update: function() {
  }
};

//On charge l'état dans le jeu
game.state.add('GameState',gameState);
//On lance le jeu
game.state.start('GameState');
