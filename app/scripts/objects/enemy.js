export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class Enemy
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.animKeys = {
      getHit: 'getHit'
    };

    this.startPosition = { x, y };

    if (!scene.anims.get(this.animKeys.getHit)) {
      scene.anims.create({
        key: this.animKeys.getHit,
        frames: scene.anims.generateFrameNumbers(this.texture.key, { frames: [0, 1, 2, 1, 0] }),
        frameRate: 25,
        repeat: 0
      });
    }

    // screen bounds
    this.leftBound = 0.05 * scene.game.canvas.width;
    this.rightBound = 0.95 * scene.game.canvas.width;
    this.bottomBound = scene.game.canvas.height;

    //console.log(this.getHealth());
    //this.anims.play(this.animKeys.getHit);
    // this.scene.add.existing(this);

    this.on('die', this.deactivate, this);
  }

  hit() {
    this.damage();
    this.anims.play(this.animKeys.getHit);
  }

  initPhysics() {
    Phaser.Health.AddTo(this, 10);
    this.body.velocity.x = 100;
    this.body.velocity.y = 50;
  }

  deactivate() {
    this.body.setVelocity(0);
    this.setPosition(this.startPosition.x, this.startPosition.y);
    this.kill();            // set helth to zero
    this.setActive(false);
    this.setVisible(false);
  }

  update() {
    if (this.x < this.leftBound) {
      this.x = this.leftBound + 2;
      this.body.velocity.x *= -1;   // reverse x direction
    }
    else if (this.x > this.rightBound) {
      this.x = this.rightBound - 2;
      this.body.velocity.x *= -1;
    }

    if (this.y > this.bottomBound) {
      this.deactivate();
    }
  }
}
