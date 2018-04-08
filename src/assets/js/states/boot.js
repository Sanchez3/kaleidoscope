(function() {
    'use strict';


    var Boot = function() {};

    module.exports = Boot;

    Boot.prototype = {
        preload: function() {},

        create: function() {
            var that = this;
            // configure game
            this.game.input.maxPointers = 1;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.stage.disableVisibilityChange = true;
            console.log(this.game.resolution)
            // this.game.resolution=window.devicePixelRatio;
            // this.game.scale.refresh();
            
            this.game.state.start('Preloader');
        }

    };

}());