//On créer l'objet qui contiendra tout le jeu
var game = new Phaser.Game(960, 540, Phaser.AUTO);

//On créer l'objet qui contiendra les états du jeu
var gameState = {
  //On charge tout les assets
  preload: function() {
    this.load.image('bg','res/flatbg.jpg');
  },

  //Ecran Titre ici
  gameTitle: function() {
    // (...)
  },

  //On lance create une fois que les assets sont tous chargés (une fois)
  create: function() {
    //Constantes de base
    const cCoins = 3;
    const p1VAlign = 100;
    const p2VAlign = 360;

    function Player(coins) {
      this.coinNb = coins;
      this.coinRoll = [];
      this.counts = [0,0,0];
      this.sum = 0;
      this.role = 0;
      this.turnOn = 0;
      this.score = 0;
      this.getRollStr = rollToString;
      this.getSum = examineRoll;
    }

    //Fonction qui retourne le résultat du lancers
    function rollToString(){
      var str = ''
      for(i=0;i<this.coinRoll.length;i++){
        str += this.coinRoll[i];
        //Séparation typo
        if(i!=this.coinRoll.length-1){ str += ' - '};
      }
      return str;
    }

    //Fonction qui retourne le total de points comptés
    function examineRoll(){
      for(var i=0;i<this.coinRoll.length;i++) {
          if (this.coinRoll[i] === 1) {
            this.counts[1]++;
          }else{
            this.counts[0]++;
          }
      }
      //Si le joueur est en phase d'attaque
      if(this.role){
        this.sum = this.counts[1];
        var str = this.sum + ' ATT';
      //Sinon
      }else{
        this.sum = this.counts[0];
        var str = this.sum + ' DEF';
      }
      return str;
    }

    //Styles de textes
    var stAtt = { font: "65px Arial", fill: "#ff0022", align: "center" };
    var stDef = { font: "65px Arial", fill: "#00ff66", align: "center" };
    var stWin = { font: "30px Arial", fill: "#ffff66", align: "center" };

    //Création des deux joueurs
    var p1 = new Player(cCoins);
    p1.role=1;
    var p2 = new Player(cCoins);
    p2.role=0;
    var gameTurn = 0;

    //On charge un fond au bol
    var bg = this.add.sprite(0,0,'bg');

    //Chaque joueur lance ces pièces
    //p1
    for(i=0;i<p1.coinNb;i++){
      p1.coinRoll.push(Math.floor(Math.random() * 2));
    };
    //p2
    for(i=0;i<p2.coinNb;i++){
      p2.coinRoll.push(Math.floor(Math.random() * 2));
    };

    //On met dans la var pxScore le resultat des lancers
    var p1Score = p1.getRollStr();
    var p2Score = p2.getRollStr();

    //On compte combien à fait chaque joueurs
    var p1Sum = p1.getSum();
    var p2Sum = p2.getSum();

    //Resultat du conflit (On compare les deux totaux)
    var winner = whoWin();
    function whoWin(){
      var pwin = 2; //draw
      if(p1.sum>p2.sum){
        pwin = 0; //p1
      }else if(p1.sum<p2.sum){
        pwin = 1; //p2
      }
      return pwin;
    }

    //On affiche le resultat
    function showWinner(w){
      this.str = 'WIN!';
      this.x = 100;
      this.y = 180;
      this.move = function(){
        if(w==1){ //p2
          this.y = 320;
        }else if(w==2){ //draw
          this.y=250;
          this.str = 'DRAW--!';
        }
      }
      this.move();
      return game.add.text(this.x, this.y, this.str, stWin);
    }

    //Partie dessin
    //Lancer du J1
    var p1Roll = game.add.text(100, p1VAlign, p1Score, stAtt);
    var t2 = game.add.text(360, p1VAlign, '= '+p1Sum, stAtt);
    //Lancer du J2
    var t = game.add.text(100, p2VAlign, p2Score, stDef);
    var t2 = game.add.text(360, p2VAlign, '= '+p2Sum, stDef);
    //Vainquer
    var tWin = showWinner(winner);

  },

  //Update se lance toute les frames après l'événement create
  update: function() {

  }
};

//On charge l'état dans le jeu
game.state.add('GameState',gameState);
//On lance le jeu
game.state.start('GameState');
