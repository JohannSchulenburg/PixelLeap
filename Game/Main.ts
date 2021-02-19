namespace Game {
  import fc = FudgeCore;

  enum GAMESTATE {
    PLAY, GAMEOVER
  }

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let player: Player;
  let platforms: Platforms[];
  let gameState: GAMESTATE = GAMESTATE.PLAY;
  let latestPlatform: Platforms;
  let highscore: number = 0;
  let highscoreNode: GameObject = new GameObject("Camera", new fc.Vector2(0, 0), new fc.Vector2 (0, 0));
  let platformCount: number = 1;
  let end: fc.Vector3;
  let platformsDeleted: number = 0;
  //Audio
  let audioJump: fc.Audio = new fc.Audio("../Game/Assets/Audio/Jump.mp3");
  let audioMusic: fc.Audio = new fc.Audio("../Game/Assets/Audio/Music.mp3");
  let cmpAudioJump: fc.ComponentAudio = new fc.ComponentAudio(audioJump, false);
  let cmpAudioMusic: fc.ComponentAudio = new fc.ComponentAudio(audioMusic, true);
  export let viewport: fc.Viewport;
  let root: fc.Node;

  let control: fc.Control = new fc.Control("PlayerControl", 20, fc.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(100);

  function hndLoad(_event: Event): void {

    //Player & root & canvas setup
    const canvas: HTMLCanvasElement = document.querySelector("canvas"); // ƒ.Debug.log(canvas);                                                       
    root = new fc.Node("Root");
    player = new Player("Player", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
    root.addChild(player);
    platforms = initialPlatform();
    latestPlatform = platforms[0];
    //root.addChild(new Platform("Platform 0", new fc.Vector2(0, -10), new fc.Vector2(3, 1)));
    root.addComponent(cmpAudioMusic);
    root.addComponent(cmpAudioJump);
    cmpAudioMusic.play(true);
    root.addComponent(new fc.ComponentAudioListener);
    fc.AudioManager.default.listenTo(root);
    //Camera & viewport & start
    let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
    cmpCamera.pivot.translateZ(100);
    cmpCamera.pivot.rotateY(180);
    highscoreNode.addComponent(cmpCamera);
    viewport = new fc.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
    fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
  }

  function hndLoop(_event: Event): void {
    if (gameState == GAMESTATE.GAMEOVER)
      return;
    let canvasHeight: number = viewport.getCanvas().height;
    end = viewport.getRayFromClient(new fc.Vector2(0, canvasHeight)).intersectPlane(new fc.Vector3(0 , canvasHeight, 0), new fc.Vector3(0, 0, 1));
    player.move();
    controlPlayer();
    updateHighscore();
    displayScore();
    highscoreNode.mtxWorld.translation = new fc.Vector3(0, highscore, 0);
    
    for (let i: number = 0; i < platforms.length; i++) {
      if (platforms[i].cmpTransform.local.translation.y < end.y) {
        switch (platforms[i].type) {
          case "Platform":
            root.removeChild(platforms[i] as Platform);
            platformsDeleted++;
            break;
          case "PlatformCloud":
            root.removeChild(platforms[i] as PlatformCloud);
            platformsDeleted++;
            break;
          case "PlatformMoving":
            root.removeChild(platforms[i] as PlatformMoving);
            platformsDeleted++;
            break;
        }
      }
      if (platforms[i].type == "PlatformMoving") {
        platforms[i].update();
      }
    }
    hndCollision();
    //fc.Time.game.setTimer(2000, 1, (_event: fc.EventTimer) => {console.log("player coordinates: " + player.mtxWorld.translation); });
    player.mtxLocal.translateX(2 * player.checkHittingSides());
    
    // Check if over & draw
    
    checkIfLost(); 
    viewport.draw();
  }

  function updateHighscore(): void {
    let height: number = player.mtxWorld.translation.y;
    if (highscore == 0 && platformCount < 50) {
      createPlatform(latestPlatform);
    }
    if (height > highscore) {
      highscore = height;
      if (Math.round(highscore) % 10 == 0) {
        createPlatform(latestPlatform);
        console.log("deleted: " + platformsDeleted);
        console.log("created: " + platformCount);
      }
    }
  }

  function checkIfLost(): void {
    if (player.mtxWorld.translation.y <= end.y) {
      fc.Time.game.setTimer(50, 1, (_event: fc.EventTimer) => {console.log("end at:" + player.mtxWorld.translation.y + " with end coordinates of: " + end.y + " and a highscore of: " + highscore); });
      gameState = GAMESTATE.GAMEOVER;
      let output: HTMLDivElement = document.querySelector("h2#highscore");
      output.innerHTML = "Game Over, Highscore: " + Math.round(highscore);
    }
  } 

  function hndCollision(): void {
    for (let i: number = 0; i < platforms.length; i++) {
      //idk how to destroy platforms[i]
      if (platforms[i].checkCollision(player)) {
        console.log("hello");
        cmpAudioJump.play(true);
      }
    }
  }

  function createPlatform(latestPlatform: Platforms ): void {
    let random: number = fc.random.getRangeFloored(1 , 4);
    let scale: number = 30;
    let newPlatform: Platforms;
    switch ( random ) {
      case 1:
        newPlatform = new Platform("Platform " + platformCount, new fc.Vector2(fc.random.getRange(-scale, scale), latestPlatform.cmpTransform.local.translation.y + fc.random.getRange(3, 5)), new fc.Vector2(5, 1));
        latestPlatform.cmpTransform.local.translation = newPlatform.cmpTransform.local.translation;
        platforms[platformCount] = newPlatform;
        root.addChild(platforms[platformCount] as Platform);
        break;
      case 2:
        newPlatform = new PlatformCloud("PlatformCloud " + platformCount, new fc.Vector2(fc.random.getRange(-scale, scale), latestPlatform.cmpTransform.local.translation.y + fc.random.getRange(3, 5)), new fc.Vector2(5, 1));
        latestPlatform.cmpTransform.local.translation = newPlatform.cmpTransform.local.translation;
        platforms[platformCount] = newPlatform;
        root.addChild(platforms[platformCount] as PlatformCloud);
        break;
      case 3:
        newPlatform = new PlatformMoving("PlatformMoving " + platformCount, new fc.Vector2(fc.random.getRange(-scale, scale), latestPlatform.cmpTransform.local.translation.y + fc.random.getRange(3, 5)), new fc.Vector2(5, 1));
        latestPlatform.cmpTransform.local.translation = newPlatform.cmpTransform.local.translation;
        platforms[platformCount] = newPlatform;
        root.addChild(platforms[platformCount] as PlatformMoving);
        
        break;
      default: 
          // 
          break;
   }    
    platformCount++;
  }

  function initialPlatform(): Platform[] {
    let platforms: Platform[] = [new Platform("Platform 0", new fc.Vector2(0, -50), new fc.Vector2(5, 1))];
    return platforms;
  }

  function controlPlayer(): void {
    control.setInput(
      fc.Keyboard.mapToValue(-1, 0, [fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])
      + fc.Keyboard.mapToValue(1, 0, [fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])
    );
    //let movement: fc.Vector3 = fc.Vector3.X(control.getOutput());
    player.mtxLocal.translateX(control.getOutput() * 0.025);
  }

  function displayScore(): void {
    let output: HTMLDivElement = document.querySelector("h2#highscore");
    output.innerHTML = "Highscore: " + Math.round(highscore);

  }
}
