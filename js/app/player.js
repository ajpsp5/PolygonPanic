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

        var basicBullet = game.add.bitmapData(14, 14);
        basicBullet.context.beginPath();
        basicBullet.context.arc(5, 5, 5, 0, 2 * Math.PI, false);
        basicBullet.context.fillStyle = 'white';
        basicBullet.context.fill();
        basicBullet.context.lineWidth = 1;
        basicBullet.context.strokeStyle = '#003300';
        basicBullet.context.stroke();
        this.basicBullet = basicBullet;

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i=0; i < 20; ++i) {
            var bullet = this.group.create(-100, -100, basicBullet);
            bullet.checkWorldBounds = true;
            bullet.exists = false;
            bullet.visible = false;
            bullet.events.onOutOfBounds.add(this.killBullet, this);
        }
        console.log(this.group);
    }

    Player.prototype.killBullet = function(bullet) {
        bullet.kill();
    }

    Player.prototype.attack = function() {
        var bullet = this.group.getFirstExists(false);

        if (!bullet) {
            console.log(this.group);
        }

        bullet.reset(this.position.x, this.position.y);
        bullet.body.velocity.y = -500;
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
