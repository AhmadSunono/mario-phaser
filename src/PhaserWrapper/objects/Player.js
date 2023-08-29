class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(x, y, "atlas").setScale(2);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.isDead = false;

    this.scene.cameras.main
      .setBounds(
        0,
        0,
        this.scene.map.widthInPixels,
        this.scene.map.heightInPixels
      )
      .startFollow(this.sprite);

    this.collider = this.scene.physics.add.collider(
      this.sprite,
      this.scene.platform
    );

    // Everything that falls inside the dead zone will be followed
    scene.cameras.main.setDeadzone(
      scene.game.config.width / 4,
      scene.game.config.height
    );
  }

  update(input) {
    // Mario is moving to the left
    if (input.left.isDown) {
      this.sprite.setVelocityX(-200).setFlipX(true);
      this.scene.cameras.main.stopFollow(this.sprite);

      // Mario is moving to the right
    } else if (input.right.isDown) {
      this.sprite.setVelocityX(200).setFlipX(false);
      this.reFollowPlayer();
    } else {
      // Mario is standing still
      this.sprite.setVelocityX(0);
    }

    // Mario is jumping
    if (input.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-350);
    }

    this.animate(input);
  }

  animate(input) {
    const { left, right, up } = input;
    const { sprite } = this;
    const isOnFloor = sprite.body.onFloor();

    if (up.isDown) {
      sprite.play("jump", true);
    } else if (left.isDown || right.isDown) {
      if (isOnFloor && !this.sprite.isDead) {
        sprite.play("run", true);
      }
    } else if (isOnFloor && !this.sprite.isDead) {
      sprite.play("idle", true);
    }
  }

  reFollowPlayer() {
    // Prevent player from going backward
    this.scene.physics.world.bounds.setPosition(
      this.scene.cameras.main.worldView.x,
      0
    );

    // Start follow if the player is in the middle
    if (
      this.sprite.body.position.x + this.sprite.body.width / 2 >
        this.scene.cameras.main.midPoint.x &&
      !this.scene.cameras.main._follow
    ) {
      this.scene.cameras.main.startFollow(this.sprite);
    }
  }

  die() {
    this.sprite.isDead = true;
    this.sprite.setVelocity(0, -350);
    this.sprite.play("die", true);
    this.sprite.setCollideWorldBounds(false);
  }
}

export default Player;
