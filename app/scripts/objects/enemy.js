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
  constructor(scene, x, y, key, scale, health, speedX, speedY) {
    super(scene, x, y, key);

    this.reset(x, y, key, scale, health, speedX, speedY);

    this.animKeys = {
      getHit: 'getHit'
    };

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

    // Particles
    this.particles = scene.add.particles('enemyParticle');

    scene.add.existing(this);
  }

  reset(x, y, key, scale, health, speedX, speedY) {
    this.startPosition = { x, y };
    this.speedX = speedX;
    this.speedY = speedY;
    this.health = health;
    this.setTexture(key);
    this.scale = scale;
    //this.setDisplaySize(this.width, this.height);
    //this.body.setCollideWorldBounds(this.width, this.height);
  }

  initPhysics() {
    Phaser.Health.AddTo(this, this.health);
    this.setVelocity(this.speedX, this.speedY);
    this.emitter = this.particles.createEmitter({
      on: false,
      speed: { min: -200, max: 200 },
      lifespan: 500,
      blendMode: Phaser.BlendModes.ADD
    });
  }

  setVelocity(x, y) {
    this.body.velocity.x = x;
    this.body.velocity.y = y;
  }


  hit() {
    this.damage();
    this.anims.play(this.animKeys.getHit);

    if (this.isDead()) {
      this.emitter.explode(100, this.x, this.y);
    }
  }

  activate() {
    this.setActive(true);
    this.setVisible(true);
    this.revive(this.health);
    this.setVelocity(this.speedX, this.speedY);
    this.setScale(this.scale);
  }

  deactivate() {
    // deactivate at the end of event queue
    setTimeout(() => {
      this.body.setVelocity(0);
      this.setPosition(this.startPosition.x, this.startPosition.y);
      this.kill();            // set helth to zero
      this.setActive(false);
      this.setVisible(false);
    }, 0);
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
