import Phaser from "phaser";
import { useEffect, useState } from "react";
import { config } from "./configs/phaser";
import Emitter from "../services/eventEmitter";
import { INCREASE_SCORE_EVENT } from "../constants/events";

const usePhaserWrapper = () => {
  const [game, setGame] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const _game = new Phaser.Game(config);
    setGame(_game);

    return () => {
      _game.destroy(true);
      setGame(null);
    };
  }, []);

  useEffect(() => {
    if (game) {
      Emitter.on(INCREASE_SCORE_EVENT, (incrementValue) => {
        setScore(score + incrementValue);
      });
    }
  }, [game, score]);

  return {
    game,
    score,
    setScore,
  };
};

export default usePhaserWrapper;
