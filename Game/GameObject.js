"use strict";
var Game;
(function (Game) {
    var fc = FudgeCore;
    class GameObject extends fc.Node {
        constructor(_name, _position, _size) {
            super(_name);
            this.rect = new fc.Rectangle(_position.x, _position.y, _size.x, _size.y, fc.ORIGIN2D.CENTER);
            this.addComponent(new fc.ComponentTransform(fc.Matrix4x4.TRANSLATION(_position.toVector3(0))));
            let cmpQuad = new fc.ComponentMesh(GameObject.meshQuad);
            this.addComponent(cmpQuad);
            cmpQuad.pivot.scale(_size.toVector3(0));
            let cMaterial = new fc.ComponentMaterial(GameObject.mtrSolidWhite);
            this.addComponent(cMaterial);
        }
    }
    GameObject.meshQuad = new fc.MeshQuad();
    GameObject.mtrSolidWhite = new fc.Material("SolidWhite", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("WHITE")));
    Game.GameObject = GameObject;
})(Game || (Game = {}));
//# sourceMappingURL=GameObject.js.map