import Phaser from "phaser";
import Player from "../objects/Player";
import { animations as generateAnimations } from "../configs/animations";
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

    this.load.atlas(
      "atlas",
      "assets/img/mario-atlas.png",
      "assets/json/mario-atlas.json"
    );

    // Register animations
    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }

  create() {
    // Prepare loaded assets
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("map-tileset", "tiles");

    // Make use of layers
    this.platform = this.map.createStaticLayer("platform", this.tileset, 0, 0);
    this.map.createStaticLayer("background", this.tileset, 0, 0);

    // Activate collisions
    this.platform.setCollisionByExclusion(-1, true);

    // Add player
    this.player = new Player(this, 25, 400);

    // Initialize inputs to track keys
    this.inputs = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.inputs);
  }
}

export default Game;
