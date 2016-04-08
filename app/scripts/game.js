
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.ground = new window.Ground(this.el.find('.Ground'), this);
		this.cloud = new window.Cloud(this.el.find('.Cloud'), this);
		this.pipeLower = new window.Pipe(this.el.find('.PipeLower'), this);
		this.pipeUpper = new window.Pipe(this.el.find('.PipeUpper'), this);
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.ground.onFrame(delta);
		this.cloud.onFrame(delta);
		this.pipeLower.onFrame(delta, this.player.getPos());
		this.pipeUpper.onFrame(delta, this.player.getPos());

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipeLower.reset();
		this.pipeUpper.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
		if(this.player.score > this.player.highscore) {
			this.player.highscore = this.player.score;
		}
		$('.Scoreboard-score>span').html(this.player.score);
		$('.Scoreboard-highscore>span').html(this.player.highscore);
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 50;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


