"use strict";
var Game;
(function (Game) {
    var fc = FudgeCore;
    class PlatformCloud extends Game.Platform {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.type = "PlatformCloud";
            this.getComponent(fc.ComponentMaterial).material = PlatformCloud.mtrSolidYellow;
        }
        checkCollision(player) {
            let intersection = this.rect.getIntersection(player.rect);
            if (intersection == null || player.fallSpeed > 0) {
                return false;
            }
            if (intersection.size.x > intersection.size.y) {
                player.fallSpeed = 0.7;
                this.mtxLocal.translateX(100);
                this.rect.position.x = this.mtxLocal.translation.x;
            }
            else {
                // was passiert, wenn seitlich collided wird
                return false;
            }
            return true;
        }
    }
    //private static readonly REFLECT_VECTOR_X: fc.Vector3 = fc.Vector3.X();
    //private static readonly REFLECT_VECTOR_Y: fc.Vector3 = fc.Vector3.Y();
    PlatformCloud.mtrSolidYellow = new fc.Material("SolidYellow", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("YELLOW")));
    Game.PlatformCloud = PlatformCloud;
})(Game || (Game = {}));
//# sourceMappingURL=PlatformCloud.js.map