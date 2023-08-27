class Coin {
  constructor(scene) {
    this.scene = scene;
    this.coins = this.scene.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    // Extract sprites from map's objects
    const coinSprites = this.scene.map.createFromObjects("coin");

    for (const coin of coinSprites) {
      coin
        .setTexture("atlas")
        .setScale(1) // setTexture resets the scale to .5 so this is needed
        .setOrigin(0)
        .setDepth(-1);

      this.coins.add(coin);
    }

    // Play animation for coins
    for (const coin of this.coins.children.entries) {
      coin.play("rotate", true);
    }

    //Setup collider
    for (const coin of this.coins.children.entries) {
      coin.collider = this.scene.physics.add.overlap(
        coin,
        this.scene.player.sprite,
        this.collect,
        null,
        this
      );
    }
  }

  update() {}

  collect(coin) {
    this.scene.tweens.add({
      targets: coin,
      ease: "Power1",
      scaleX: 0,
      scaleY: 0,
      duration: 200,
      onComplete: () => coin.destroy(),
    });

    this.scene.increaseScore(1);

    coin.collider.destroy();
  }
}

export default Coin;
