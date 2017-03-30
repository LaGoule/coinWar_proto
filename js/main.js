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

    //Variables principales
    //0= Nb de coins, 1=
    var j1 = {
      coinNb: 3
    };
    var j2 = {
      coinNb: 3
    };
    var gameTurn = 0;

    //On charge un fond au bol
    var bg = this.add.sprite(0,0,'bg');
    //-var tux = this.add.sprite(0,0,'tux');

    var j1Roll = [];
    var i=0;
    while(i<j1.coinNb){
      j1Roll.push(Math.floor(Math.random() * 2));
      i++;
    };
    var i=0;

    var text = '';
    while(i<j1Roll.length){
      text+=j1Roll[i];
      if(i!=j1Roll.length-1){text+=', '};
      i++;
    }
    var style = { font: "65px Arial", fill: "#ff0022", align: "center" };

    var t = game.add.text(100, 100, text, style);


  },

  //Update se lance toute les frames après l'événement create
  update: function() {
  }
};

//On charge l'état dans le jeu
game.state.add('GameState',gameState);
//On lance le jeu
game.state.start('GameState');
