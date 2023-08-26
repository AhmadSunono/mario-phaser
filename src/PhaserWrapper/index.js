import React from "react";
import usePhaserWrapper from "./usePhaserWrapper";

const PhaserWrapper = () => {
  usePhaserWrapper();

  return (
    <div id="mario">
      <div className="score">
        Score: <span className="score-amount">0</span>
      </div>
      <div className="game-over">Game Over</div>
    </div>
  );
};

export default PhaserWrapper;
