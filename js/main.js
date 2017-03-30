//On créer l'objet qui contiendra tout le jeu
var game = new Phaser.Game(960, 540, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//On créer l'objet qui contiendra les états du jeu
var gameState = {
  //On charge tout les assets
  preload: function() {
    this.load.image('tux','res/tux.png');
  },

  //On lance create une fois que les assets sont tous chargés (une fois)
  create: function() {
    this.add.sprite(0,0,'tux');
  },

  //Update se lance toute les frames après l'événement create
  update: function() {
  }
};

//On charge l'état dans le jeu
game.state.add('GameState',gameState);
//On lance le jeu
game.state.start('GameState');
