import Enemy from './enemy';

export default class EnemyPool {
  constructor(scene, levelData) {
    this.scene = scene;
    this.levelData = levelData;
    this.enemies = scene.physics.add.group({
      allowGravity: false
    });

    this.currentEnemyIndex = 0;
  }

  scheduleNextEnemy() {
    let nextEnemy = this.levelData.enemies[this.currentEnemyIndex];
    if (!nextEnemy) return;

    let nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex].time - 1));

    this.scene.time.delayedCall(
      nextTime,
      () => {
        this.spawnEnemy(nextEnemy.x, nextEnemy.y, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);
        this.currentEnemyIndex++;
        this.scheduleNextEnemy();
      },
      [],
      this
    );
  }

  spawnEnemy(x, y, health, key, scale, speedX, speedY) {
    let enemy = this.enemies.getFirstDead(false, x, y);

    if (enemy === null) {
      enemy = new Enemy(this.scene, x, y, key, scale, health, speedX, speedY);
      this.enemies.add(enemy);
      enemy.initPhysics();
    } else {
      enemy.reset(x, y, key, scale, health, speedX, speedY);
    }

    enemy.activate();
  }

  update() {
    const enemies = this.enemies.getChildren().filter((child) => child.active);

    enemies.forEach((enemy) => {
      enemy.update();
    });
  }
}
