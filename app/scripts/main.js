
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var music = document.getElementById('playtimeMusic');
    music.volume = 0.2;
    music.play();
    var game = new window.Game($('.GameCanvas'));
    game.start();
});
