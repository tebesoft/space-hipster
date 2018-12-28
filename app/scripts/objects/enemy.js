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

    if (!scene.anims.get(this.animKeys.getHit)) {
      scene.anims.create({
        key: this.animKeys.getHit,
        frames: scene.anims.generateFrameNumbers(this.texture.key, { frames: [0, 1, 2, 1, 0] }),
        frameRate: 7,
        repeat: 0
      });
    }

    Phaser.Health.AddTo(this, 100);

    //console.log(this.getHealth());
    //this.anims.play(this.animKeys.getHit);
    // this.scene.add.existing(this);
  }
}
