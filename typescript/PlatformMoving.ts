namespace Game {
  import fc = FudgeCore;

  export class PlatformMoving extends Platform implements Platforms {
    
    private static readonly mtrSolidCyan: fc.Material = new fc.Material("SolidYellow", fc.ShaderUniColor, new fc.CoatColored(fc.Color.CSS("BLUE")));
    public type: string = "PlatformMoving"; 
    private direction: number = fc.random.getRange(-1, 1);
    
    

    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2) {
      super(_name, _position, _size);
      
      while (this.direction > -0.3 && this.direction < 0.3) {
        this.direction = fc.random.getRange(-1, 1);
      }
      this.getComponent(fc.ComponentMaterial).material = PlatformMoving.mtrSolidCyan;
    }
  
    public checkCollision(player: Player): boolean {
      let intersection: fc.Rectangle = this.rect.getIntersection(player.rect);
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
    public update(): void {
      let movement: number = this.direction / 5;
      this.mtxLocal.translateX(movement);  
      this.rect.position.add(new fc.Vector2(movement, 0));
      this.mtxLocal.translateX(2 * this.checkHittingSides());
      this.rect.position.add(new fc.Vector2(2 * this.checkHittingSides(), 0));
    }

    public checkHittingSides(): number {
      let left: fc.Vector3 = viewport.getRayFromClient(new fc.Vector2(0, 0)).intersectPlane(new fc.Vector3(0 , 0, 0), new fc.Vector3(0, 0, 1));
      if (this.mtxWorld.translation.x > -left.x) {
        return left.x;
      }
      if (this.mtxWorld.translation.x < left.x) {
        
        return -left.x;
      }
      else return 0;
    }
  }
}