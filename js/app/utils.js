/**
 * A module which defines a set of utilities
 * @module app/utils
 */
define(["app/config", "jquery"], function(config, jQuery){
    var utils = {
        clone : function(obj) {
            return jQuery.extend(true, {}, obj);
        },

        cloneArray : function(arr) {
            return jQuery.extend(true, [], arr);
        }
    }

    return utils;
});
