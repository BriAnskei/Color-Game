import { useContext } from "react";
import "./Choices.css";
import { StoreContext } from "../../context/StoreContext";
const Choices = () => {
  const context = useContext(StoreContext);

  if (!context) return <div>Loading .....</div>;

  const { progress, choicesColors, setAnswer } = context;

  return (
    <>
      <div className="choices-container">
        {choicesColors.map((color, index) => (
          <div
            key={index}
            className="choice-progress progress-bar-vertical"
            style={{ backgroundColor: `${color}` }}
            onClick={() => {
              setAnswer(choicesColors[index]);
            }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                height: `${progress}%`,
                backgroundColor: `${color}`,
                filter: "brightness(0.7)",
              }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
            <div className="choices-text">
              <span>{color}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Choices;
