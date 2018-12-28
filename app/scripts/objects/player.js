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
  initPhysics() {
    this.body.allowGravity = false;
    this.body.setCollideWorldBounds(true);
  }

  initBullets() {
    this.bullets = this.scene.physics.add.group({
      allowGravity: false
    });
    this.shootingTimer = this.scene.time.addEvent({
      delay: 200,
      callback: this.createBullet,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }

  createBullet() {
    const bullet = this.bullets.getFirstDead(true, this.body.center.x, this.body.y, 'bullet');
    bullet.setActive(true);
    bullet.body.setVelocityY(this.bulletSpeed);
  }
}
