/**
 * Created by Sanchez
 */
(function() {
    'use strict';
    var Preloader = function() {};

    module.exports = Preloader;

    Preloader.prototype = {
        loadResources: function() {
            this.load.image('p1', '../assets/img/p1.jpg');
            this.load.image('p2', '../assets/img/p2.jpg');
            this.load.image('p3', '../assets/img/p3.jpg');
            this.load.start();

        },
        drawPieProgress: function(_progress) {
            var that = this;
            that.pgGraphics.clear();
            that.pgGraphics.lineStyle(6, 0x29ABE2);
            that.pgGraphics.arc(this.game.width / 2, this.game.height / 2, 45, this.game.math.degToRad(270), this.game.math.degToRad(360 * _progress / 100 + 270), false);
            that.pgGraphics.endFill();
        },
        create: function() {
            var that = this;
            that.pgGraphics = this.add.graphics(0, 0);
            var style = {
                fontStyle: 'italic',
                font: 'Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei',
                fontSize: 19,
                fill: '#000',
                align: 'center'
            };
            that.progress = this.add.text(this.game.width / 2, this.game.height / 2 + 5, '0%', style);
            that.progress.anchor.setTo(0.5);
            this.load.onFileComplete.add(that.onfileComplete, this);
            this.load.onLoadComplete.addOnce(that.onLoadComplete, this);
            this.loadResources();

        },
        onLoadComplete: function() {
            var that = this;
            that.game.state.start('State1');
            return;

        },
        onfileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
            var that = this;
            that.drawPieProgress(progress);
            that.progress.text = progress + '%';
        }
    };

}());