/**
 * A module defining a set of enemies to be used throughout levels
 * @module app/enemies/line/line1
 */
define(["app/config", "app/unit"],
function(config, Unit){
    "use strict"

    var Line1 = function(game, x, y) {
        var width = 30;
        var height = 100;
        var bmd = game.add.bitmapData(width, height);

        var grd=bmd.context.createRadialGradient(width/2, height/2,
                                                 5,
                                                 width/2, height/2,
                                                 40);
        grd.addColorStop(0, "blue");
        grd.addColorStop(1, "white");
        bmd.context.fillStyle = "#000000";
        bmd.context.fillRect(0, 0, width, height);
        bmd.context.fillStyle = "#F3AA49";
        bmd.context.fillRect(3, 3, width-6, height-6);

        var bullet = game.add.bitmapData(14, 14);
        bullet.context.beginPath();
        bullet.context.arc(5, 5, 5, 0, 2 * Math.PI, false);
        bullet.context.fillStyle = 'orange';
        bullet.context.fill();
        bullet.context.lineWidth = 1;
        bullet.context.strokeStyle = '#003300';
        bullet.context.stroke();

        this.init(game, x, y, {
            movement : [
                {
                    options : {
                        x : "+100",
                        angle : "+180"
                    },
                    duration : 2000
                },
                {
                    options : {
                        y : "+50",
                        x : "+70"
                    },
                    duration : 1000
                }
            ],
            attackPattern : [
                {
                    angle : 0,
                    texture : bullet,
                    speed : 5
                }
            ],
            attackRate : 1500,
            texture : bmd,
            alpha : 0.7
        });
    };

    Line1.prototype = new Unit();

    return Line1;
});
