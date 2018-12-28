export default class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class Player
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.speed = 200;
    this.bulletSpeed = -1000;
    //  Add this game object to the owner scene.
    //scene.children.add(this);
  }
  setupPhysics() {
    this.body.allowGravity = false;
    this.body.setCollideWorldBounds(true);
  }
}
