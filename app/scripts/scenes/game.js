import Player from '@/objects/player';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    //  TODO: Replace this content with really cool game code here :)
    // this.logo = this.add.existing(new Logo(this));
    this.background = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'space');
    this.background.setOrigin(0);

    // Player
    this.player = this.add.existing(new Player(this, this.cameras.main.centerX, this.game.canvas.height-50));
    this.physics.add.existing(this.player);
    this.player.setupPhysics();
  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
    this.background.tilePositionY -= 0.5;

    this.player.body.setVelocityX(0);

    if ( this.game.input.activePointer.isDown ) {
      const targetX = this.game.input.activePointer.position.x;
      const direction = targetX >= this.cameras.main.centerX ? 1 : -1;
      this.player.body.setVelocityX(direction * this.player.speed);
    }
  }
}
