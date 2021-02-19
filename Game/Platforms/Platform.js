"use strict";
var Game;
(function (Game) {
    class Platform extends Game.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            //private static readonly REFLECT_VECTOR_X: fc.Vector3 = fc.Vector3.X();
            //private static readonly REFLECT_VECTOR_Y: fc.Vector3 = fc.Vector3.Y();
            this.type = "Platform";
        }
        checkCollision(player) {
            let intersection = this.rect.getIntersection(player.rect);
            if (intersection == null || player.fallSpeed > 0)
                return false;
            if (intersection.size.x > intersection.size.y)
                player.fallSpeed = 0.5;
            else
                // was passiert, wenn seitlich collided wird
                return false;
            return true;
        }
    }
    Game.Platform = Platform;
})(Game || (Game = {}));
//# sourceMappingURL=Platform.js.map