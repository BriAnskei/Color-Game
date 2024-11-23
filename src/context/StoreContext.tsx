import { createContext, ReactNode, useEffect, useState } from "react";

interface Prop {
  children: ReactNode;
}

interface ContextType {
  progress: number;
  currentColor: string;
  choicesColors: string[];
  colors: string[];
  checkAnswer: (answer: string) => void;
  score: number;
  lives: number;
  highestScore: number;
}

export const StoreContext = createContext<ContextType | undefined>(undefined);

const StoreContextProvider: React.FC<Prop> = (props) => {
  const colors = ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "PURPLE"];

  const [choicesColors, setChoicesColors] = useState<string[]>(colors);
  const [progress, setProgress] = useState(0);
  const [currentColor, setCurrentColor] = useState("");
  const [reset, setReset] = useState(false);

  // Stats
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highestScore, setHighestScore] = useState(0);

  // Fisher-Yates shuffle function, set the array of choices index to ramdom every trigger
  const shuffleColors = (arr: string[]) => {
    let shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  };

  const setColor = () => {
    const ramdomIdex = Math.floor(Math.random() * colors.length);
    setCurrentColor(choicesColors[ramdomIdex]);

    // Shuffle the colors array to ensure no repeated colors
    const shuffledColors = shuffleColors(colors);
    setChoicesColors(shuffledColors); // Update all progress bar colors with shuffled colors
  };

  const checkAnswer = (answer: string) => {
    if (answer !== currentColor) {
      if (lives === 1) {
        alert(`Game Over! highest Score: ${highestScore}`);
        saveNewRecord();
      } else {
        console.log(`Wrong!! ${lives} left`);
        setLives((prev) => prev - 1);
      }
    } else {
      setScore((prev) => {
        const currentScore = prev + 2;
        setHighestScore((prev) => (prev > currentScore ? prev : currentScore));
        return currentScore;
      });
      setColor(); //Ramdomize colors

      // Reset time progress
      setProgress(0);
      setReset((prev) => !prev);
    }
  };

  const saveNewRecord = () => {
    sessionStorage.setItem("highestScore", highestScore.toString());
  };

  useEffect(() => {
    setColor();
    const scoreData = sessionStorage.getItem("highestScore");

    if (scoreData) {
      setHighestScore(Number(scoreData));
    }
  }, []);

  useEffect(() => {
    if (progress === 100) {
      if (lives !== 1) {
        setLives((prev) => prev - 1);
        setReset((prev) => !prev);
      } else {
        alert(`Game Over! highest Score: ${highestScore}`);
      }
      saveNewRecord();
    }
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        return prev >= 100 ? 0 : prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [reset]);

  const contaxtApi: ContextType = {
    progress,
    currentColor,
    choicesColors,
    colors,
    checkAnswer,
    score,
    highestScore,
    lives,
  };
  return (
    <StoreContext.Provider value={contaxtApi}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
