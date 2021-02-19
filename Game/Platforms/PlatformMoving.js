"use strict";
var Game;
(function (Game) {
    var fc = FudgeCore;
    class PlatformMoving extends Game.Platform {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
            this.type = "PlatformMoving";
            this.direction = fc.random.getRange(-1, 1);
            while (this.direction > -0.3 && this.direction < 0.3) {
                this.direction = fc.random.getRange(-1, 1);
            }
            this.getComponent(fc.ComponentMaterial).material = PlatformMoving.mtrSolidCyan;
        }
        checkCollision(player) {
            let intersection = this.rect.getIntersection(player.rect);
            if (intersection == null || player.fallSpeed > 0) {
                return false;
            }
            if (intersection.size.x > intersection.size.y) {
                player.fallSpeed = 0.5;
            }
            else {
                // was passiert, wenn seitlich collided wird
                return false;
            }
            return true;
        }
        update() {
            let movement = this.direction / 5;
            this.mtxLocal.translateX(movement);
            this.rect.position.add(new fc.Vector2(movement, 0));
            this.mtxLocal.translateX(2 * this.checkHittingSides());
            this.rect.position.add(new fc.Vector2(2 * this.checkHittingSides(), 0));
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
    PlatformMoving.mtrSolidCyan = new fc.Material("SolidYellow", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("BLUE")));
    Game.PlatformMoving = PlatformMoving;
})(Game || (Game = {}));
//# sourceMappingURL=PlatformMoving.js.map