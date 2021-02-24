namespace Game {
  import fc = FudgeCore;

  enum GAMESTATE {
    PLAY, GAMEOVER
  }

  
  // window.addEventListener("click", sceneLoad);
  let player: Player;
  let platforms: Platforms[];
  let gameStatePlay: GAMESTATE = GAMESTATE.PLAY;
  let latestPlatform: Platforms;
  let highscore: number = 0;
  let highscoreNode: GameObject = new GameObject("Camera", new fc.Vector2(0, 0), new fc.Vector2 (0, 0));
  let platformCount: number = 1;
  let end: fc.Vector3;
  //Audio
  let audioJump: fc.Audio = new fc.Audio("../assets/audio/Jump.mp3");
  let audioMusic: fc.Audio = new fc.Audio("../assets/audio/Music.mp3");
  let audioLost: fc.Audio = new fc.Audio("../assets/audio/Lost.mp3");
  let cmpAudioJump: fc.ComponentAudio = new fc.ComponentAudio(audioJump, false);
  let cmpAudioMusic: fc.ComponentAudio = new fc.ComponentAudio(audioMusic, true);
  let cmpAudioLost: fc.ComponentAudio = new fc.ComponentAudio(audioLost, false);
  let lostCounter: number = 0;
  export let viewport: fc.Viewport;
  let root: fc.Node;

  let control: fc.Control = new fc.Control("PlayerControl", 20, fc.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(100);
  window.addEventListener("load", hndLoad);
  let canvas: HTMLCanvasElement    = document.querySelector("canvas"); // ƒ.Debug.log(canvas);   
  
  function hndLoad(): void {

    canvas = document.querySelector("canvas"); // ƒ.Debug.log(canvas);
    //Player & root & canvas setup
                                                        
    root = new fc.Node("root");
    player = new Player("Player", new fc.Vector2(0, 0), new fc.Vector2(1, 1));
    root.addChild(player);
    platforms = initialPlatform();
    latestPlatform = platforms[0];
    //root.addChild(new Platform("Platform 0", new fc.Vector2(0, -10), new fc.Vector2(3, 1)));
    root.addComponent(cmpAudioMusic);
    root.addComponent(cmpAudioJump);
    root.addComponent(cmpAudioLost);
    cmpAudioMusic.play(true);
    root.addComponent(new fc.ComponentAudioListener);
    fc.AudioManager.default.listenTo(root);
    //Camera & viewport & start
    let cmpCamera: fc.ComponentCamera = new fc.ComponentCamera();
    cmpCamera.pivot.translateZ(100);
    cmpCamera.pivot.rotateY(180);
    highscoreNode.addComponent(cmpCamera);
    Hud.start();
    viewport = new fc.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, hndLoop);
    fc.Loop.start(fc.LOOP_MODE.TIME_GAME, 60);
  }

  function hndLoop(_event: Event): void {
    if (gameStatePlay == GAMESTATE.GAMEOVER) {
      cmpAudioMusic.play(false);
      if (lostCounter == 0) {
        cmpAudioLost.play(true);
        lostCounter++;
      }
      return;
    }

    gameState.highscore = Math.round(highscore);
    let canvasHeight: number = viewport.getCanvas().height;
    end = viewport.getRayFromClient(new fc.Vector2(0, canvasHeight)).intersectPlane(new fc.Vector3(0 , canvasHeight, 0), new fc.Vector3(0, 0, 1));
    player.move();
    controlPlayer();
    updateHighscore();
    highscoreNode.mtxWorld.translation = new fc.Vector3(0, highscore, 0);
    for (let i: number = 0; i < platforms.length; i++) {
      if (platforms[i].cmpTransform.local.translation.y < end.y) {
        switch (platforms[i].type) {
          case "Platform":
            root.removeChild(platforms[i] as Platform);
            break;
          case "PlatformCloud":
            root.removeChild(platforms[i] as PlatformCloud);
            break;
          case "PlatformMoving":
            root.removeChild(platforms[i] as PlatformMoving);
            break;
        }
      }
      if (platforms[i].type == "PlatformMoving") {
        platforms[i].update();
      }
    }
    hndCollision();
    
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
      if (Math.round(highscore) % 15 == 0) {
        createPlatform(latestPlatform);
      }
    }
  }

  function checkIfLost(): void {
    if (player.mtxWorld.translation.y <= end.y) {
      fc.Time.game.setTimer(50, 1, (_event: fc.EventTimer) => {console.log("end at:" + player.mtxWorld.translation.y + " with end coordinates of: " + end.y + " and a highscore of: " + highscore); });
      gameStatePlay = GAMESTATE.GAMEOVER;
    }
  } 

  function hndCollision(): void {
    for (let i: number = 0; i < platforms.length; i++) {
      //idk how to destroy platforms[i]
      if (platforms[i].checkCollision(player)) {
        cmpAudioJump.play(true);
      }
    }
  }

  function createPlatform(latestPlatform: Platforms ): void {
    let random: number = fc.random.getRangeFloored(1 , 4);
    let scale: number = -viewport.getRayFromClient(new fc.Vector2(0, 0)).intersectPlane(new fc.Vector3(0 , 0, 0), new fc.Vector3(0, 0, 1)).x;
    let platformLength: number = 5;
    let distance: number = 5;
    if (highscore >= 500) {
      distance = 6;
    }
    if (highscore >= 100) {
      platformLength = 4;
      if (highscore >= 300) {
        platformLength = 3;
        if (highscore >= 500) {
          platformLength = 2;
          if (highscore >= 700) {
            platformLength = 1;
          }
        }
      }
    }

    let newPlatform: Platforms;
    switch ( random ) {
      case 1:
        newPlatform = new Platform("Platform " + platformCount, new fc.Vector2(fc.random.getRange(-scale, scale), latestPlatform.cmpTransform.local.translation.y + fc.random.getRange(distance - 2, distance)), new fc.Vector2(platformLength, 1));
        latestPlatform.cmpTransform.local.translation = newPlatform.cmpTransform.local.translation;
        platforms[platformCount] = newPlatform;
        root.addChild(platforms[platformCount] as Platform);
        break;
      case 2:
        newPlatform = new PlatformCloud("PlatformCloud " + platformCount, new fc.Vector2(fc.random.getRange(-scale, scale), latestPlatform.cmpTransform.local.translation.y + fc.random.getRange(distance - 2, distance)), new fc.Vector2(platformLength, 1));
        latestPlatform.cmpTransform.local.translation = newPlatform.cmpTransform.local.translation;
        platforms[platformCount] = newPlatform;
        root.addChild(platforms[platformCount] as PlatformCloud);
        break;
      case 3:
        newPlatform = new PlatformMoving("PlatformMoving " + platformCount, new fc.Vector2(fc.random.getRange(-scale, scale), latestPlatform.cmpTransform.local.translation.y + fc.random.getRange(distance - 2, distance)), new fc.Vector2(platformLength, 1));
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
}
