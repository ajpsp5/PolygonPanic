/**
 * A module which defines the player object
 * @module app/unit
 */
define(["app/config", "app/utils", "app/music", "app/player"],
function(config, utils, music, player){
    var Unit = function() {}
    Unit.prototype.init = function(game, x, y, unitConfig){
        var x = x || 0;
        var y = y || 0;

        this.game = game;
        this.config = unitConfig;
        this.graphics = this.game.add.sprite(x, y, this.config.texture);
        this.graphics.scale.set(0.5, 0.5);
        this.graphics.anchor.set(0.5, 0.5);
        this.graphics.alpha = config.alpha || 1;
        this.speed = config.defaultSpeed;

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets = [];

        // Pulse on beat
        music.onBeat.push(this.pulse.bind(this));

        // Being the movement animations
        this.constructTweenChain(this.config.movement);

        // Define and begin attacking
        this.attackIndex = 0;
        this.bulletTimer = this.game.time.create(false);
        this.bulletTimer.loop(this.config.attackRate,
            this.attack.bind(this));
        this.bulletTimer.start();

        // Remove units which are below the bottom of the screen
        this.graphics.update = function(){
            this.game.physics.arcade.overlap(player.sprite,
                                         this.group,
                                         this.collisionHandler.bind(this),
                                         null, this);
            if (this.position.y > config.game.height){
                this.destroy();
            }
        }.bind(this);
    }

    Unit.prototype.pulse = function(){
        var tween = this.game.add.tween(this.graphics);
        tween.to({alpha : 1}, 75).to({alpha: this.config.alpha || 1}, 100).start();

        var tweenScale = this.game.add.tween(this.graphics.scale);
        tweenScale.to({x: "+0.05", y:"+0.05"}, 75)
            .to({x: "-0.05", y:"-0.05"}, 100).start();
    }

    Unit.prototype.constructTweenChain = function(moveConfig) {
        var config = utils.cloneArray(moveConfig);
        var tween = this.game.add.tween(this.graphics);
        config.forEach(function(item){
            tween.to(item.options, item.duration, item.easing);
        });
        tween.onComplete.add(function(){
            if (this.graphics.exists) {
                this.constructTweenChain(moveConfig);
            }
        }.bind(this))
        tween.start();
    }

    Unit.prototype.destroy = function() {
        this.bullets.forEach(function(bullet){
            bullet.destroy();
        });
        var index = music.onBeat.indexOf(this.pulse.bind(this));
        console.log("Destroy, index of pulse:", index);
        this.graphics.destroy();
    }

    Unit.prototype.collisionHandler = function(playerSprite, bullet) {
        bullet.destroy();
    }

    Unit.prototype.attack = function() {
        if (!this.graphics.exists) {
            this.bulletTimer.stop();
            return;
        }

        var pattern = this.config.attackPattern;
        this.attackIndex = (this.attackIndex+1) % pattern.length;

        var config = this.config.attackPattern[this.attackIndex];
        var bullet = this.group.create(this.position.x, this.position.y, config.texture);

        var speed = config.speed;
        bullet.update = function() {
            var rads = config.angle*Math.PI/180 + 0.5*Math.PI;
            this.body.velocity.x = Math.cos(rads)*speed*100;
            this.body.velocity.y = Math.sin(rads)*speed*100;
        }
        this.bullets.push(bullet);
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
