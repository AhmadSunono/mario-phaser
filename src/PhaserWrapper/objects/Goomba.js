class Goomba {
  constructor(scene) {
    this.scene = scene;
    this.goombas = this.scene.physics.add.group();

    this.collider = this.scene.physics.add.collider(
      this.scene.player.sprite,
      this.goombas,
      this.checkCollisionCase,
      null,
      this
    );

    const goombaObjects = this.scene.map.createFromObjects("goomba");

    for (const goomba of goombaObjects) {
      goomba
        .setTexture("atlas")
        .setScale(1.5)
        .setOrigin(0)
        .setDepth(-1)
        .setX(goomba.x)
        .setY(goomba.y - goomba.height);

      this.goombas.add(goomba);
    }

    for (const goomba of this.goombas.children.entries) {
      goomba.direction = "RIGHT";
      goomba.isDead = false;
    }

    this.scene.physics.add.collider(this.goombas, this.scene.platform);
  }

  update() {
    for (const goomba of this.goombas.children.entries) {
      if (goomba.body.blocked.right) {
        goomba.direction = "LEFT";
      }

      if (goomba.body.blocked.left) {
        goomba.direction = "RIGHT";
      }

      if (goomba.direction === "RIGHT") {
        goomba.body.setVelocityX(100);
      } else {
        goomba.body.setVelocityX(-100);
      }

      if (!goomba.isDead) {
        goomba.play("goombaRun", true);
      }
    }
  }

  checkCollisionCase() {
    // If the player is touching the goomba from goomba's head (player's bottom) - then goomba is dead
    if (this.scene.player.sprite.body.touching.down) {
      return this.killGoomba();
    }

    // Game Over
  }

  killGoomba() {
    for (const goomba of this.goombas.children.entries) {
      if (goomba.body.touching.up) {
        goomba.isDead = true;
        goomba.play("goombaDie", true);
        goomba.on("animationcomplete", () => goomba.destroy());

        this.scene.increaseScore(0.5);

        this.scene.player.sprite.setVelocity(0, -350);
        this.scene.player.sprite.play("jump");
      }
    }
  }
}

export default Goomba;
