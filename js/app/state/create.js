/**
 * A module returning a function which will be executed during the 'create'
 * phase of Phaser js startup
 * @module app/state/create
 */
define(["app/config", "app/background", "app/music", "app/player", "app/enemies"],
function(config, background, music, player, enemies){
    "use strict"

    /**
     * Function which will be executed by Phaser after 'preload' is finished
     * @alias module:app/state/create
     *
     * @param {Phaser.Game} game - The current game object
     */
    var create = function(game){
        music.start(game);
        background.start(game);
        player.init(game, config.game.width/2, config.game.height-40);

        // Create some temporary enemies
        //TODO remove this
        for (var i=0; i < 3; ++i) {
            for (var j=0; j < 3; ++j) {
                new enemies.line1(game, i*80-100, j*80-100);
            }
        }

        game.load.audio('title', 'assets/sounds/title.mp3').onFileComplete.add(
            function(percent, name) {
                if (name == 'title') {
                    music.play('title');
                    music.loadBackgroundMusic();
                }
        });

        game.load.start();
    };
    return create;
});
