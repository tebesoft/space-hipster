export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    this.bulletSpeed = -1000;
    scene.add.existing(this);
  }

  setupWorldCollision() {
    this.body.setCollideWorldBounds(true);

    this.body.onWorldBounds = true;

    this.body.world.on('worldbounds', function(body) {
      // Check if the body's game object is the sprite you are listening for
      if (body.gameObject === this) {
        // Stop physics and render updates for this object (Kill)
        this.setVisible(false);
        this.setActive(false);
      }
    }, this);
  }

  activate() {
    this.setActive(true);
    this.setVisible(true);
    this.body.setVelocityY(this.bulletSpeed);
  }
}
