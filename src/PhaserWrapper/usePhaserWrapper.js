import Phaser from "phaser";
import { useEffect, useState } from "react";
import config from "./config";

const usePhaserWrapper = () => {
  const [game, setGame] = useState();

  useEffect(() => {
    const _game = new Phaser.Game(config);
    setGame(_game);

    return () => {
      _game.destroy(true);
      setGame(null);
    };
  }, []);

  return {
    game,
  };
};

export default usePhaserWrapper;
