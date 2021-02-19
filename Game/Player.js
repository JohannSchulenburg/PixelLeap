"use strict";
var Game;
(function (Game) {
    var fc = FudgeCore;
    class Player extends Game.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.velocity = fc.Vector3.ZERO();
            this.fallSpeed = 0;
            this.velocity = new fc.Vector3(0, this.fallSpeed, 0);
        }
        /**
         * move moves the game object and the collision detection reactangle
         */
        move() {
            //let frameTime: number = fc.Loop.timeFrameGame / 1000;
            //let distance: fc.Vector3 = fc.Vector3.SCALE(this.velocity, frameTime);
            this.fallSpeed -= 0.01;
            this.velocity = new fc.Vector3(0, this.fallSpeed, 0);
            this.translate(this.velocity);
            //console.log(this.fallSpeed);
        }
        translate(_distance) {
            this.mtxLocal.translate(_distance);
            this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
            this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
        }
        checkHittingSides() {
            let left = Game.viewport.getRayFromClient(new fc.Vector2(0, 0)).intersectPlane(new fc.Vector3(0, 0, 0), new fc.Vector3(0, 0, 1));
            if (this.mtxWorld.translation.x > -left.x) {
                return left.x;
            }
            if (this.mtxWorld.translation.x < left.x) {
                return -left.x;
            }
            else
                return 0;
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map