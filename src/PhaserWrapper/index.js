import React from "react";
import usePhaserWrapper from "./usePhaserWrapper";
import "./styles.css";

const PhaserWrapper = () => {
  const { score } = usePhaserWrapper();

  return (
    <div id="mario">
      <div className="score">
        Score: <span className="score-amount">{score}</span>
      </div>
      {/* <div className="game-over">Game Over</div> */}
    </div>
  );
};

export default PhaserWrapper;
