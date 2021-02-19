namespace Game {
    import fcui = FudgeUserInterface;
    import fc = FudgeCore;
  
    export class GameState extends fc.Mutable {
      public highscore: number = 0;
      protected reduceMutator(_mutator: fc.Mutator): void {/* */ }
    }
  
    export let gameState: GameState = new GameState();
  
    export class Hud {
      private static controller: fcui.Controller;
  
      public static start(): void {
        let domHud: HTMLDivElement = document.querySelector("div#hud");
        Hud.controller = new fcui.Controller(gameState, domHud);
        Hud.controller.updateUserInterface();
      }
    }
  }