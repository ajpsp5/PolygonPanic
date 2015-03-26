/**
 * A module defining a set of enemies to be used throughout levels
 * @module app/enemies
 */
define(["app/config", "app/enemies/line/line1"],
function(config, Line1){
    "use strict"

    return {
        "line1" : Line1
    };
});
