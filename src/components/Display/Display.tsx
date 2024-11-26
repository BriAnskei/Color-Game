import { useContext, useEffect, useState, useRef } from "react";
import "./Display.css";
import { StoreContext } from "../../context/StoreContext";

const Display = () => {
  const context = useContext(StoreContext);

  const [livesAni, setLivesAni] = useState("");
  const [scoreAni, setScoreAni] = useState(false);
  const [highestAni, setHighestAni] = useState(false);
  const prevLivesRef = useRef<number | null>(null); // to track previous value of lives

  if (!context) return <div>Loading.....</div>;

  const { currentColor, score, lives, highestScore } = context;

  useEffect(() => {
    if (prevLivesRef.current !== null) {
      if (lives > prevLivesRef.current) {
        setLivesAni("lives-increase-animation");
      } else if (lives < prevLivesRef.current) {
        setLivesAni("lives-deduc-animation");
      }
      const timeout = setTimeout(() => {
        setLivesAni(""); // Reset animation after 500ms
      }, 500);
      prevLivesRef.current = lives;
      return () => clearTimeout(timeout);
    } else {
      prevLivesRef.current = lives; // Set the initial previous value
    }
  }, [lives]);

  useEffect(() => {
    console.log(lives, prevLivesRef.current, livesAni);
  }, [lives, prevLivesRef.current, livesAni]);

  useEffect(() => {
    setScoreAni(true);
    const timeout = setTimeout(() => {
      setScoreAni(false);
    }, 500); // Reset animation after 500ms

    return () => clearTimeout(timeout);
  }, [score]);

  useEffect(() => {
    setHighestAni(true);
    const timeout = setTimeout(() => {
      setHighestAni(false);
    }, 500); // Reset animation after 500ms

    return () => clearTimeout(timeout);
  }, [highestScore]);

  return (
    <div className="display-container">
      <div className="upper-text">
        <span>
          Lives: <span className={livesAni}>{lives}</span>
        </span>
        <span className="current-score">
          Score:{" "}
          <span className={scoreAni ? "score-animation" : ""}>{score}</span>
        </span>
        <span>
          Highest Score:{" "}
          <span className={highestAni ? "score-animation" : ""}>
            {highestScore}
          </span>
        </span>
      </div>
      <div className="main-text">
        <div
          style={{
            height: `90%`,
            backgroundColor: `${currentColor}`,
          }}
        >
          <span>{currentColor}</span>
        </div>
      </div>
    </div>
  );
};

export default Display;
