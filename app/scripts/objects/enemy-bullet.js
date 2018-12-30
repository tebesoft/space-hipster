import Bullet from './bullet';

export default class EnemyBullet extends Bullet {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class EnemyBullet
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, 150);
  }
}
