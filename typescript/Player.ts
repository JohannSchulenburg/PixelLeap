namespace Game {
  import fc = FudgeCore;
  
  export class Player extends GameObject {
    //private static readonly REFLECT_VECTOR_X: fc.Vector3 = fc.Vector3.X();
    //private static readonly REFLECT_VECTOR_Y: fc.Vector3 = fc.Vector3.Y();

    public fallSpeed: number;
    public velocity: fc.Vector3 = fc.Vector3.ZERO();

    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2) {
      super(_name, _position, _size);
      this.fallSpeed = 0;
      this.velocity = new fc.Vector3(0 , this.fallSpeed , 0);
    }

    /**
     * move moves the game object and the collision detection reactangle
     */
    public move(): void {
      //let frameTime: number = fc.Loop.timeFrameGame / 1000;

      //let distance: fc.Vector3 = fc.Vector3.SCALE(this.velocity, frameTime);
      
      this.fallSpeed -= 0.01;
      this.velocity = new fc.Vector3(0 , this.fallSpeed , 0);
      this.translate(this.velocity);
      //console.log(this.fallSpeed);
      
    }

    public translate(_distance: fc.Vector3): void {
      this.mtxLocal.translate(_distance);
      this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
      this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
      
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
    /**
     * collides returns if the moveable itself collides with the _target and if so
     * reflects the movement
     */
  }
}