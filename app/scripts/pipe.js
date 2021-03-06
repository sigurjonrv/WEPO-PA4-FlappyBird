window.Pipe = (function() {
	'use strict';

	var SPEED = 15;

	var count = 0;
	var hasPassed = false;
	var tempY = 0;

	var Pipe = function(el, game) {
		this.el = el;
		this.game = game;
		this.player = game.player;
		this.pos = { x: 0, y: 0 };
	};

	Pipe.prototype.reset = function() {
		this.pos.x = this.game.WORLD_WIDTH;
		this.pos.y = 0;
		hasPassed = false;
		$('.Score').html(this.player.score);
	};

	Pipe.prototype.onFrame = function(delta, position) {
		this.pos.x -= delta * SPEED;

		if(this.pos.x <= -5.2) {
			this.pos.x = this.game.WORLD_WIDTH;
			hasPassed = false;

			if(count % 2 === 0) {
				this.pos.y = Math.floor(Math.random() * 25) - 10;
				console.log('for inn');
				tempY = this.pos.y;
			}
			console.log('this.pos.y: ' + this.pos.y);
			console.log('count: ' + count);
			
			count++;
		}

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

		// console.log('position.x: ' + position.x);
		// console.log('this.pos.x: ' + this.pos.x);
		// console.log('position.y: ' + position.y);
		// console.log('this.pos.y: ' + this.pos.y);
		// console.log('if((' + (position.x + 3) + ') >= (' + (this.pos.x - 2) + ') &&');
		// console.log('   (' + (position.x - 3) + ') <= (' + (this.pos.x + 2) + ') &&');
		// console.log('   (' + (position.y) + ') >= (' + (this.pos.y - 25) + '))');
		// console.log('-------------------------');

		if((position.x + 3) >= (this.pos.x - 2) && (position.x - 3) <= (this.pos.x + 2) && position.y >= (this.pos.y + 25)) {
			$('#drop').trigger('play');
			return this.game.gameover();
		}

		if((position.x + 3) >= (this.pos.x - 2) && (position.x - 3) <= (this.pos.x + 2) && position.y <= (this.pos.y + 11)) {
			$('#drop').trigger('play');
			return this.game.gameover();
		}

		if(this.pos.x < position.x && !hasPassed){
			$('#point').trigger('play');
			this.player.score += 1;
			$('.Score').html(this.player.score);
			hasPassed = true;
			console.log('Score: ' + this.player.score);
		}
	};


	return Pipe;

})();
