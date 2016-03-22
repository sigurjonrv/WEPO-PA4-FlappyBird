window.Cloud = (function() {
	'use strict';

	var SPEED = 5;

	var Cloud = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	Cloud.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;

		if(this.pos.x <= -29.6){
			this.pos.x = 0;
		}

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};


	return Cloud;

})();
