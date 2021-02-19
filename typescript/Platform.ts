namespace Game {
  import fc = FudgeCore;

  export class Platform extends GameObject implements Platforms  {
    //private static readonly REFLECT_VECTOR_X: fc.Vector3 = fc.Vector3.X();
    //private static readonly REFLECT_VECTOR_Y: fc.Vector3 = fc.Vector3.Y();

    public type: string = "Platform"; 
    
    public constructor(_name: string, _position: fc.Vector2, _size: fc.Vector2) {
      super(_name, _position, _size);
    }

    public checkCollision(player: Player): boolean {
      let intersection: fc.Rectangle = this.rect.getIntersection(player.rect);
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
}