namespace Game {
  import fc = FudgeCore;

  export class PlatformCloud extends Platform implements Platforms {
    //private static readonly REFLECT_VECTOR_X: fc.Vector3 = fc.Vector3.X();
    //private static readonly REFLECT_VECTOR_Y: fc.Vector3 = fc.Vector3.Y();
    
    private static readonly mtrSolidYellow: fc.Material = new fc.Material("SolidYellow", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("YELLOW")));
    public type: string = "PlatformCloud"; 

    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2) {
      super(_name, _position, _size);
      this.getComponent(fc.ComponentMaterial).material = PlatformCloud.mtrSolidYellow;
    }
  
    public checkCollision(player: Player): boolean {
      let intersection: fc.Rectangle = this.rect.getIntersection(player.rect);
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
}