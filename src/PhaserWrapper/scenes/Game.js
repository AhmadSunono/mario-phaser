import Phaser from "phaser";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    /**
     * Assets are place in Public directory because this loader fetches them on runtime
     * So it needs a specific path for them
     */
    this.load.image("tiles", "assets/img/tiles.png");
    this.load.tilemapTiledJSON("map", "assets/json/map.json");
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("map-tileset", "tiles");
    this.platform = this.map.createStaticLayer("platform", this.tileset, 0, 0);

    this.map.createStaticLayer("background", this.tileset, 0, 0);
    this.platform.setCollisionByExclusion(-1, true);
  }

  update() {}
}

export default Game;
