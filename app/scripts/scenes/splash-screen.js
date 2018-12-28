export default class SplashScreen extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets, including textures, tile
   *  maps, sound effects and other binary files, while displaying a busy
   *  splash screen.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'SplashScreen',

      //  Splash screen and progress bar textures.
      pack: {
        files: [{
          key: 'splash-screen',
          type: 'image'
        }, {
          key: 'progress-bar',
          type: 'image'
        }]
      }
    });
  }

  /**
   *  Show the splash screen and prepare to load game assets.
   *
   *  @protected
   */
  preload() {
    //  Display cover and progress bar textures.
    this.showCover();
    this.showProgressBar();

    //  HINT: Declare all game assets to be loaded here.
    //this.load.image('logo');
    this.load.image('space', 'images/space.png');
    this.load.image('player', 'images/player.png');
    this.load.image('bullet', 'images/bullet.png');
    this.load.image('enemyParticle', 'images/enemyParticle.png');
    this.load.spritesheet('yellowEnemy', 'images/yellow_enemy.png', {
      frameWidth: 50,
      frameHeight: 46,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet('redEnemy', 'images/red_enemy.png', {
      frameWidth: 50,
      frameHeight: 46,
      margin: 1,
      spacing: 1
    });
    this.load.spritesheet('greenEnemy', 'images/green_enemy.png', {
      frameWidth: 50,
      frameHeight: 46,
      margin: 1,
      spacing: 1
    });

    this.load.text('level1', 'data/level1.json');
    this.load.text('level2', 'data/level2.json');
    this.load.text('level3', 'data/level3.json');

    this.load.audio('orchestra', ['audio/8bit-orchestra.mp3', 'audio/8bit-orchestra.ogg']);
  }

  /**
   *  Set up animations, plugins etc. that depend on the game assets we just
   *  loaded.
   *
   *  @protected
   */
  create() {
    //  We have nothing left to do here. Start the next scene.
    this.scene.start('Game');
  }

  //  ------------------------------------------------------------------------

  /**
   *  Show the splash screen cover.
   *
   *  @private
   */
  showCover() {
    this.add.image(0, 0, 'splash-screen').setOrigin(0);
  }

  /**
   *  Show the progress bar and set up its animation effect.
   *
   *  @private
   */
  showProgressBar() {
    //  Get the progress bar filler texture dimensions.
    const {width: w, height: h} = this.textures.get('progress-bar').get();

    //  Place the filler over the progress bar of the splash screen.
    const img = this.add.sprite(82, 282, 'progress-bar').setOrigin(0);

    //  Crop the filler along its width, proportional to the amount of files
    //  loaded.
    this.load.on('progress', v => img.setCrop(0, 0, Math.ceil(v * w), h));
  }
}