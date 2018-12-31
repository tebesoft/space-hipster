import Player from '@/objects/player';
import EnemyBulletsPool from '@/objects/enemy-bullets-pool';
import EnemyPool from '@/objects/enemy-pool';

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
  create(data) {
    //this.physics.world.setBoundsCollision(true, true, true, true);
    // this.physics.world.on('worldbounds', function (body) {
    //   console.log('worldbounds', body);
    // });
    this.numLevels = 3;
    this.level = data.level ? data.level : 1;
    this.levelData = this.cache.json.get(`level${this.level}`);

    this.plugins.start('HealthPlugin');
    this.background = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'space');
    this.background.setOrigin(0);

    // Player
    this.player = this.add.existing(new Player(this, this.cameras.main.centerX, this.game.canvas.height-50));
    this.physics.add.existing(this.player);
    this.player.initPhysics();
    this.player.initBullets();

    // Enemies
    this.enemyPool = new EnemyPool(this, this.levelData);
    this.enemyPool.scheduleNextEnemy();

    //this.enemyPool.spawnEnemy(100, 100, 10, 'greenEnemy', 1, 100, 100);

    this.bulletsPool = new EnemyBulletsPool(this);

    this.physics.add.overlap(this.player.bullets, this.enemyPool.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.bulletsPool.bullets, this.player, this.hitPlayer, null, this);

    // Level timer
    this.time.delayedCall(this.levelData.duration * 1000, () => {
      if (this.level < this.numLevels) {
        this.level++;
      } else {
        this.level = 1;
      }
      this.orchestra.stop();
      this.scene.restart({ level: this.level });
    });

    // Music
    this.orchestra = this.sound.add('orchestra');
    this.orchestra.play();
  }

  hitEnemy(bullet, enemy) {
    enemy.hit();
    bullet.deactivate();
  }

  hitPlayer(player, bullet) {
    player.hit();
    bullet.deactivate();
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

    //if ( this.game.input.activePointer.isDown ) {
    const targetX = this.game.input.activePointer.position.x;
    const targetY = this.game.input.activePointer.position.y;
    const targetPos = new Phaser.Math.Vector2(targetX, targetY);
    const playerPos = new Phaser.Math.Vector2(this.player.x, this.player.y);

    const direction = targetPos.subtract(playerPos);
    this.player.body.setVelocityX(direction.normalize().x * this.player.speed);

    // const direction = targetX >= this.cameras.main.centerX ? 1 : -1;
    // this.player.body.setVelocityX(direction.x * this.player.speed);
    //}

    this.enemyPool.update();
  }
}
