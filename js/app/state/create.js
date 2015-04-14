/**
 * A module returning a function which will be executed during the 'create'
 * phase of Phaser js startup
 * @module app/state/create
 */
define(["app/config", "app/background", "app/music", "app/player",
        "app/levels", "app/poweruplist"],
function(config, background, music, player, levels, poweruplist){
    "use strict"

    /**
     * Function which will be executed by Phaser after 'preload' is finished
     * @alias module:app/state/create
     *
     * @param {Phaser.Game} game - The current game object
     */
    var create = function(game){
        // Enable physics for collison
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Disable pause on loss of focus
        game.stage.disableVisibilityChange = true;

        requirejs(["shakescreen"], function(Shake){
            game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
        });

        music.start(game, 'title');
        background.start(game);
        

        $(document).ready(function() {
            $("#playBtn").click(function() {
                $("#mainMenu_Container").animate({
                    height: '-=200px',
                    marginLeft: "13.55%",
                    width: '-=49%'
               }, 1000);
               
                $("#mainMenu_Container").animate({
                    opacity: 0
                }, 1000);
                //$("#mainMenu_Container").center(true);
                
                
        	player.init(game, config.game.width/2, config.game.height-40);

        	levels.init(game);
        	levels.start();
            });
        });
    };
    return create;
});
