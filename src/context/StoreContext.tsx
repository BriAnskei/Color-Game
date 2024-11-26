import { createContext, ReactNode, useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";

interface Prop {
  children: ReactNode;
}

interface ContextType {
  timer: number;
  currentColor: string;
  choicesColors: string[];
  colors: string[];
  checkAnswer: (answer: string) => void;
  score: number;
  lives: number;
  highestScore: number;
  answer: string;
}

export const StoreContext = createContext<ContextType | undefined>(undefined);

const StoreContextProvider: React.FC<Prop> = (props) => {
  const colors = [
    "RED",
    "BLUE",
    "GREEN",
    "YELLOW",
    "ORANGE",
    "PURPLE",

    "GRAY",
    "BROWN",
    "PINK",
    "MAGENTA",
    "MAROON",
    "NAVY",
    "OLIVE",
    "TEAL",
    "VIOLET",
    "INDIGO",
    "LIME",
    "GOLD",
    "SILVER",
    "CORAL",
    "PLUM",
    "CRIMSON",
  ];

  const [currentColor, setCurrentColor] = useState("");
  const [choicesColors, setChoicesColors] = useState<string[]>([]);
  const [timer, setProgress] = useState(0);
  const [reset, setReset] = useState(false);
  const [answer, setAnswer] = useState("");

  // Stats
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highestScore, setHighestScore] = useState(0);

  // Counter for stats
  const [_, setCounter] = useState(0);

  const setColor = () => {
    const ramdomColors: string[] = [];
    const selectedIndices = new Set<number>();

    while (ramdomColors.length < 6) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      if (!selectedIndices.has(randomIndex)) {
        ramdomColors.push(colors[randomIndex]);
        selectedIndices.add(randomIndex);
      }
    }

    // Update both states correctly

    setCurrentColor(
      ramdomColors[Math.floor(Math.random() * ramdomColors.length)]
    );
    setChoicesColors(ramdomColors);
  };

  const checkAnswer = (answer: string) => {
    setAnswer(answer);
    if (answer !== currentColor) {
      if (lives === 1) {
        alert(`Game Over! highest Score: ${highestScore}`);
        saveNewRecord();
      } else {
        setLives((prev) => prev - 1);
      }

      setCounter(0);
    } else {
      setScore((prev) => {
        const currentScore = prev + 2;
        setHighestScore((prev) => (prev > currentScore ? prev : currentScore));
        return currentScore;
      });

      setCounter((prev) => {
        const newCount = prev + 1;
        // Increse every 6 correct answer
        if (newCount % 2 === 0) {
          setLives((prev) => prev + 1);
        }
        return newCount;
      });
    }

    // Reset time progress
    setProgress(0);
    setColor(); // Ramdomize colors
    setReset((prev) => !prev);
  };

  const saveNewRecord = () => {
    sessionStorage.setItem("highestScore", highestScore.toString());
  };

  useEffect(() => {
    const scoreData = sessionStorage.getItem("highestScore");

    if (scoreData) {
      setHighestScore(Number(scoreData));
    }
    setColor();
  }, []);

  useEffect(() => {
    if (timer === 100) {
      if (lives !== 1) {
        setLives((prev) => prev - 1);
        setReset((prev) => !prev);
      } else {
        saveNewRecord();
        alert(`Game Over! highest Score: ${highestScore}`);
      }

      setColor();
    }
  }, [timer]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       return prev >= 100 ? 0 : prev + 1;
  //     });
  //   }, 10);

  //   return () => clearInterval(interval);
  // }, [reset]);

  const contaxtApi: ContextType = {
    timer,
    currentColor,
    choicesColors,
    colors,
    checkAnswer,
    score,
    highestScore,
    lives,
    answer,
  };
  return (
    <StoreContext.Provider value={contaxtApi}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
