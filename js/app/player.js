/**
 * A module which defines the player object
 * @module app/player
 */
define(["app/config"], function(config){
   "use strict"

    var Player = function() {}
    Player.prototype.init = function(game, x, y){
        var x = x || 0;
        var y = y || 0;

        this.game = game;
        this.sprite = this.game.add.sprite(x, y, "player-ship");
        this.sprite.scale.set(0.5, 0.5);
        this.sprite.anchor.set(0.5, 0.5);
        this.speed = config.player.defaultSpeed;
    }

    Object.defineProperty(Player.prototype, "position", {
        get : function() {
            return this.sprite.position;
        },
        set : function(value) {
            this.sprite.position = value;
        }
    });

    var player = new Player();

    return player;
});
