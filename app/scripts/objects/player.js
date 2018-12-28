import Bullet from './bullet';

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
      delay: 300,
      callback: this.spawnBullet,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }

  spawnBullet() {
    let bullet = this.bullets.getFirstDead(false, this.x, this.body.top);
    if (bullet === null) {
      bullet = new Bullet(this.scene, this.x, this.body.top);
      this.bullets.add(bullet);
      bullet.setupWorldCollision();
    }
    bullet.activate();
  }
}
