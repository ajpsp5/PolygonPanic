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
        this.sprite.scale.set(0.3, 0.3);
        this.sprite.anchor.set(0.5, 0.5);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.speed = config.player.defaultSpeed;
    }

    Object.defineProperty(Player.prototype, "position", {
        get : function() {
            return this.sprite.position;
        }
    });

    Object.defineProperty(Player.prototype, "velocity", {
        get : function() {
            return this.sprite.body.velocity;
        },
        set : function(value) {
            this.sprite.body.velocity = value;
        }
    });

    var player = new Player();

    return player;
});
