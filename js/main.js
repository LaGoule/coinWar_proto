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

    //On compte combien chaque joueur à de zero et de un et ont le met dans jxTotal
    //J1
    var j1True = j1False = 0;
    for (var i=0;i<j1Roll.length;i++) {
        if (j1Roll[i] === 1) {
            j1True++;
        }else{
          j1False++;
        }
    };
    var j1Total = 0;
    if(j1.role){
      j1Total = j1True;
      var j1TotalT = j1Total+ ' ATT';
    }else{
      j1Total = j1False;
      var j1TotalT = j1Total+ ' DEF';
    };

    //J2
    var j2True = j2False = 0;
    for (var i=0;i<j2Roll.length;i++) {
        if (j2Roll[i] === 1) {
            j2True++;
        }else{
          j2False++;
        }
    };
    var j2Total = 0;
    if(j2.role){
      j2Total = j2True;
      var j2TotalT = j2Total+ ' ATT';
    }else{
      j2Total = j2False;
      var j2TotalT = j2Total+ ' DEF';
    };

    //Resultat du conflit (On compare les deux totaux)
    var winTX=0;
    var winT='WIN!';

    if(j1Total>j2Total){
      winTX=180;
    }else if(j1Total==j2Total){
      winTX=250;
      winT='DRAW--!'
    }else{
      winTX=320;
    }

    //Partie dessin
    var stAtt = { font: "65px Arial", fill: "#ff0022", align: "center" };
    var stDef = { font: "65px Arial", fill: "#00ff66", align: "center" };
    var stWin = { font: "30px Arial", fill: "#ffff66", align: "center" };
    //Lancer du J1
    var t = game.add.text(100, 100, j1Score, stAtt);
    var t2 = game.add.text(370, 100, '= '+j1TotalT, stAtt);
    //Lancer du J2
    var t = game.add.text(100, 360, j2Score, stDef);
    var t2 = game.add.text(370, 360, '= '+j2TotalT, stDef);
    //Vainquer
    var tWin = game.add.text(100, winTX, winT, stWin);

  },

  //Update se lance toute les frames après l'événement create
  update: function() {
  }
};

//On charge l'état dans le jeu
game.state.add('GameState',gameState);
//On lance le jeu
game.state.start('GameState');
