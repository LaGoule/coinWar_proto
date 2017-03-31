var gametitle = function(game){}

gametitle.prototype = {
  create: function(){
    //On charge un fond au bol
    var bg = this.game.add.sprite(0,0,'bg');
		var gameTitle = this.game.add.sprite(100,160,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(100,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("Match");
	}
}
