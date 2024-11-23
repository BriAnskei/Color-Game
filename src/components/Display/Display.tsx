import { useContext, useEffect, useState } from "react";
import "./Display.css";
import { StoreContext } from "../../context/StoreContext";
const Display = () => {
  const context = useContext(StoreContext);

  const [livesAni, setLivesAni] = useState(false);
  const [scoreAni, setScoreAni] = useState(false);

  if (!context) return <div>Loading.....</div>;

  const { currentColor, score, lives, highestScore } = context;

  useEffect(() => {
    setLivesAni(true);
    const timeout = setTimeout(() => {
      setLivesAni(false);
    }, 500); // set animation to 500ms

    return () => clearTimeout(timeout);
  }, [lives]);

  useEffect(() => {
    setScoreAni(true);
    const timeout = setTimeout(() => {
      setScoreAni(false);
    }, 500); // set animation to 500ms

    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <div className="display-container">
      <div className="upper-text">
        <span>
          Lives:{" "}
          <span className={livesAni ? "lives-animation" : ""}>{lives}</span>
        </span>
        <span className="current-score">
          Score:{" "}
          <span className={scoreAni ? "score-animation" : ""}>{score}</span>
        </span>
        <span>Highest Score: {highestScore}</span>
      </div>
      <div className="main-text">
        <div className="progress-bar-vertical">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              height: `90%`,
              backgroundColor: `${currentColor}`,
            }}
            aria-valuenow={90}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span>{currentColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
