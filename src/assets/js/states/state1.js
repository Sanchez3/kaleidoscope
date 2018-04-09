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
            var wWidth = this.game.width;
            var wHeight = this.game.height;
            this.radiusX = wWidth / 2;
            this.radiusY = wHeight / 2;
            this.slices = 12;
            this.image = this.make.image(0, 0, 'p2');
            console.log(this.image.height)
            var slices = this.slices;
            var i = 0;
            for (var i = 0; slices >= 0 ? slices >= i : i >= slices; s = slices >= 0 ? ++i : --i) {
                _angle = 2 * Math.PI / this.slices;
                this.piece.push(this.add.sprite(0, 0));
                this.piece[i].anchor.setTo(0.5);
                this.piece[i].centerX = this.radiusX;
                this.piece[i].centerY = this.radiusY;
                this.arc.push(this.add.graphics(0, 0));
                this._sprite.push(this.add.tileSprite(0, 0, 4 * wWidth, 4 * wWidth, 'p2'));

                this._sprite[i].anchor.setTo(2.5 / 4, 0.5);
                console.log(this._sprite[i].offsetX);
                // this._sprite[i].offsetX=-2.5 * wWidth;
                // this._sprite[i].offsetX= -wWidth;
                this.piece[i].addChild(this._sprite[i]);
                this.piece[i].addChild(this.arc[i]);
                this.group.addChild(this.piece[i]);
                this.arc[i].beginFill(0x000);
                //x,y,r,sAngle,eAngle,counterclockwise
                this.arc[i].moveTo(0, 0);
                this.arc[i].arc(0, 0, 3 * this.radiusX, _angle * -0.51, _angle * 0.51);
                this.arc[i].lineTo(0, 0);
                this.piece[i].rotation = s * _angle;
                this._sprite[i].mask = this.arc[i];
                // TweenLite.to(this._sprite[g], 0.5, { x: -100 });
                this._sprite[i].tileScale.x = .5
                this._sprite[i].tileScale.y = [.5, .5][s % 2];
                // this._sprite[i].position.y = 2*wWidth;
                // this._sprite[i].position.x = 2.5 * wWidth;
                if (s % 2) {
                    this.piece[i].scale.setTo(-1, 1);
                    // this._sprite[i].position.x = 0;
                }
                // this._sprite[i].x=100;
            }

            var j = 0;
            var w = wWidth;
            this.tweenA = [];
            for (var j = this._sprite.length - 1; j >= 0; j--) {
                var t = TweenMax.to(this._sprite[j], 20, {
                    paused: true,
                    repeat: -1,
                    bezier: {
                        type: 'quadratic',
                        values: [{
                                x: 0,
                                y: 0
                            },
                            {
                                x: w / 2,
                                y: 0
                            },
                            {
                                x: w / 2,
                                y: w / 2
                            }, /*p2*/
                            {
                                x: w / 2,
                                y: w
                            },
                            {
                                x: 0,
                                y: w
                            }, /*p3*/
                            {
                                x: -w / 2,
                                y: w
                            },
                            {
                                x: -w / 2,
                                y: w / 2
                            }, /*p4*/
                            {
                                x: -w / 2,
                                y: 0
                            },
                            {
                                x: 0,
                                y: 0
                            }
                        ]
                    } /*bezier end*/ ,
                    ease: Linear.easeNone
                });
                this.tweenA.push(t);
            }

            //运动轨迹x^2+y^2=(wWidth^2)/4
            this.offset = 0;
            this.oprogress = 0;
            this.reference = {};
            this.input.onDown.add(this.tap, this);
            this.input.onUp.add(this.release, this);
            this.input.addMoveCallback(this.drag, this);

        },
        tap: function() {
            this.pressed = true;
            this.reference.x = this.game.input.x;
            this.reference.y = this.game.input.y;
            this.timestamp = Date.now();
            // this.oprogress=this.tweenA[0].progress();
        },
        drag: function(pointer, x, y) {
            if (this.pressed) {
                var delta = {};
                delta.y = this.reference.y - y;
                delta.x = this.reference.x - x;
                delta.s = Math.sqrt(delta.y * delta.y + delta.x * delta.x);
                if (delta.s > 2 || delta.s < -2) {
                    // this.reference = x;
                    this._draw(delta.s + this.offset);
                }
            }
        },
        _draw: function(x) {
            var that = this;
            var cx, cy, dx, dy, hx, hy;
            dx = x / that.game.width * 0.5;
            dy = x / that.game.width * that.game.height;

            for (var j = this._sprite.length - 1; j >= 0; j--) {
                this.tweenA[j].progress(this.oprogress + dx);
            }

        },
        release: function() {
            this.pressed = false;
            this.timestamp = Date.now();
            this.oprogress = this.tweenA[0].progress();

        },
        update: function() {}

    };

}());