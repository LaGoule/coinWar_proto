var match = function(game){
	workingButtons = true;
  matchTurn = 0;
	score = 0;

  //Constantes de base
  STARTCOINS = 3;
  P1VALIGN = 100;
  P2VALIGN = 360;
}

//On créer l'état qui gère le match 1v1
match.prototype = {
  //On charge tout les assets
  preload: function() {
  },
  create: function() {

    //Constructor de l'objet Player
    function Player(coins) {
      this.coinNb = coins;
      this.roll = [];
      this.rollCounts = [0,0,0];
      this.rollSum = 0;
      this.role = 0;
      this.turnOn = 0;
      this.score = 0;
      this.getRollStr = rollToString;
      this.getSum = examineRoll;
    }

    //Fonction qui retourne le résultat du lancers
    function rollToString(){
      var str = ''
      for(i=0;i<this.roll.length;i++){
        str += this.roll[i];
        //Séparation typo
        if(i!=this.roll.length-1){ str += ' - '};
      }
      return str;
    }

    //Fonction qui retourne le total de points comptés pour un joueur
    function examineRoll(){
      for(var i=0;i<this.roll.length;i++) {
          if (this.roll[i] === 1) {
            this.rollCounts[1]++;
          }else{
            this.rollCounts[0]++;
          }
      }
      //Si le joueur est en phase d'attaque
      if(this.role){
        this.rollSum = this.rollCounts[1];
        var str = this.rollSum + ' ATT';
      //Sinon
      }else{
        this.rollSum = this.rollCounts[0];
        var str = this.rollSum + ' DEF';
      }
      return str;
    }



    //Création des deux joueurs
    var p1 = new Player(STARTCOINS);
    p1.role=1;
    var p2 = new Player(STARTCOINS);
    p2.role=0;
    var matchTurn = 0;




    //Chaque joueur lance ces pièces
    //p1
    for(i=0;i<p1.coinNb;i++){
      p1.roll.push(Math.floor(Math.random() * 2));
    };
    //p2
    for(i=0;i<p2.coinNb;i++){
      p2.roll.push(Math.floor(Math.random() * 2));
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
      if(p1.rollSum>p2.rollSum){
        pwin = 0; //p1
      }else if(p1.rollSum<p2.rollSum){
        pwin = 1; //p2
      }
      return pwin;
    }

    //Styles de textes //Rien à faire là -- à ranger
    var stAtt = { font: "65px Arial", fill: "#ff0022", align: "center" };
    var stDef = { font: "65px Arial", fill: "#00ff66", align: "center" };
    var stWin = { font: "30px Arial", fill: "#ffff66", align: "center" };

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
    var t2 = game.add.text(360, p1VAlign, '='+ p1Sum, stAtt);
    //Lancer du J2
    var t = game.add.text(100, p2VAlign, p2Score, stDef);
    var t2 = game.add.text(360, p2VAlign, '='+ p2Sum, stDef);
    //Vainquer
    var tWin = showWinner(winner);

  },

  //Update se lance toute les frames après l'événement create
  update: function() {

  }
};
