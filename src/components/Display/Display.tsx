import { useContext } from "react";
import "./Display.css";
import { StoreContext } from "../../context/StoreContext";
const Display = () => {
  const context = useContext(StoreContext);

  if (!context) return <div>Loading.....</div>;

  const { currentColor, score, lives } = context;

  return (
    <div className="display-container">
      <div className="upper-text">
        <span>Lives: {lives} </span>
        <span className="current-score">Score:{score}</span>
        <span>Highest Score: 2637</span>
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
