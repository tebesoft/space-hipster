import EnemyBullet from './enemy-bullet';

export default class EnemyBulletsPool {
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class EnemyBulletsPool
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene) {
    this.scene = scene;
    this.bullets = this.scene.physics.add.group({
      allowGravity: false
    });
    this.shootingTimer = this.scene.time.addEvent({
      paused: true,
      delay: 300,
      callback: this.spawnBullet,
      //args: [],
      callbackScope: this,
      loop: true
    });

    this.shootingScheduleTimer = this.scene.time.addEvent({
      delay: Phaser.Math.Between(100, 1000),
      callback: () => this.shootingTimer.paused = !Phaser.Math.Between(0, 1),
      loop: true
    });
  }

  spawnBullet() {
    const enemies = this.scene.enemies.getChildren().filter((child) => child.active);
    enemies.forEach((enemy) => {
      let bullet = this.bullets.getFirstDead(false, enemy.x, enemy.y);
      if (bullet === null) {
        bullet = new EnemyBullet(this.scene, enemy.x, enemy.y);
        this.bullets.add(bullet);
        bullet.setupWorldCollision();
      }
      bullet.activate();
    });
  }
}
