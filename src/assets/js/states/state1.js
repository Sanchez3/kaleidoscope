/**
 * Created by Sanchez
 */
(function() {
    'use strict';
    var State1 = function() {};
    module.exports = State1;
    State1.prototype = {

        preload: function() {},
        create: function() {
            this.piece = [];
            this._sprite = [];
            this.arc = [];
            this.group = this.add.group();
            var s = 0;
            var _angle = 0;
            var wWidth = window.innerWidth;
            var wHeight = window.innerHeight;
            this.radiusX = wWidth / 2;
            this.radiusY = wHeight / 2;
            this.slices = 16;
            this.image = this.make.image(0, 0, 'p2');
            console.log(this.image.height)
            var slices = this.slices;
            for (var i = 0; slices >= 0 ? slices >= i : i >= slices; s = slices >= 0 ? ++i : --i) {
                _angle = 2 * Math.PI / this.slices;
                this.piece.push(this.add.sprite(0, 0));
                this.piece[i].anchor.setTo(0.5);
                this.piece[i].centerX = this.radiusX;
                this.piece[i].centerY = this.radiusY;
                this.arc.push(this.add.graphics(0, 0));
                this._sprite.push(this.add.tileSprite(0, 0, 3 * wWidth, 3 * wWidth, 'p2'));
                this.piece[i].addChild(this._sprite[i]);
                this.piece[i].addChild(this.arc[i]);
                this.group.addChild(this.piece[i]);
                this.arc[i].beginFill(0x000);
                //x,y,r,sAngle,eAngle,counterclockwise
                this.arc[i].moveTo(0, 0);
                this.arc[i].arc(0, 0, 100 * this.radiusX, _angle * -0.51, _angle * 0.51);
                this.arc[i].lineTo(0, 0);
                this.piece[i].rotation = s * _angle;
                this._sprite[i].mask = this.arc[i];
                // TweenLite.to(this._sprite[g], 0.5, { x: -100 });
                this._sprite[i].tileScale.x = .5
                this._sprite[i].tileScale.y = [.5, .5][s % 2];
                this._sprite[i].position.y = wHeight / 2 - this.image.height / 2;
                if (s % 2) {
                    this.piece[i].scale.setTo(-1, 1);
                    this._sprite[i].position.x = 0;
                }
            }
            for (var j = this._sprite.length - 1; j >= 0; j--) {
                this._sprite[j].angle=-15
                TweenMax.to(this._sprite[j], 10, {
                    yoyo: true,
                    repeat:-1,
                    x: -500,
                    y: -200,
                    angle: -55,
                    onUpdate: function() {}
                });
            }
        },
        update: function() {}

    };

}());