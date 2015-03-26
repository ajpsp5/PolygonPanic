/**
 * A module which defines the player object
 * @module app/unit
 */
define(["app/config", "app/utils"], function(config, utils){
    var Unit = function() {}
    Unit.prototype.init = function(game, x, y, config){
        var x = x || 0;
        var y = y || 0;

        this.game = game;
        this.config = config;
        this.graphics = this.game.add.sprite(x, y, config.texture);
        this.graphics.scale.set(0.5, 0.5);
        this.graphics.anchor.set(0.5, 0.5);
        this.graphics.alpha = config.alpha || 1;
        this.speed = config.defaultSpeed;
        this.constructTweenChain(config.movement);

        this.attackIndex = 0;
        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(config.attackRate,
            this.attack.bind(this));
        this.bulletTimer.start();
    }

    Unit.prototype.constructTweenChain = function(moveConfig) {
        var config = utils.cloneArray(moveConfig);
        var tween = this.game.add.tween(this.graphics);
        config.forEach(function(item){
            tween.to(item.options, item.duration, item.easing);
        });
        tween.onComplete.add(function(){
            this.constructTweenChain(moveConfig);
        }.bind(this))
        tween.start();
    }

    Unit.prototype.attack = function() {
        var pattern = this.config.attackPattern;
        this.attackIndex = (this.attackIndex+1) % pattern.length;

        var config = this.config.attackPattern[this.attackIndex];
        var bullet = this.game.add.sprite(this.position.x, this.position.y,
                                          config.texture);
        var speed = config.speed;
        bullet.update = function() {
            var rads = config.angle*Math.PI/180 + 0.5*Math.PI;
            this.x += Math.cos(rads)*speed;
            this.y += Math.sin(rads)*speed;
        }
    }

    Object.defineProperty(Unit.prototype, "position", {
        get : function() {
            return this.graphics.position;
        },
        set : function(value) {
            this.graphics.position = value;
        }
    });

    return Unit;
});
