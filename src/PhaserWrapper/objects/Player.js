class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(x, y, "atlas").setScale(2);
    this.sprite.setCollideWorldBounds(true);

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
  }

  update(input) {
    // Mario is moving to the left
    if (input.left.isDown) {
      this.sprite.setVelocityX(-200).setFlipX(true);

      // Mario is moving to the right
    } else if (input.right.isDown) {
      this.sprite.setVelocityX(200).setFlipX(false);
    } else {
      // Mario is standing still
      this.sprite.setVelocityX(0);
    }

    // Mario is jumping
    if (input.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-350);
    }
  }
}

export default Player;
