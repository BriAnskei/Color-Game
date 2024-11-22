import { createContext, ReactNode, useEffect, useState } from "react";

interface Prop {
  children: ReactNode;
}

interface ContextType {
  progress: number;
  currentColor: string;
  choicesColors: string[];
  colors: string[];
  setAnswer: (ans: string) => void;
  score: number;
  lives: number;
}

export const StoreContext = createContext<ContextType | undefined>(undefined);

const StoreContextProvider: React.FC<Prop> = (props) => {
  const colors = ["RED", "BLUE", "GREEN", "YELLOW", "ORANGE", "PURPLE"];

  const [choicesColors, setChoicesColors] = useState<string[]>(colors);
  const [progress, setProgress] = useState(0);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [answer, setAnswer] = useState("");
  const [reset, setReset] = useState(false);

  // Stats
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  // Fisher-Yates shuffle function
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

  useEffect(() => {
    if (answer != currentColor) {
      console.log(`Wrong!! ${lives} left`);
      setLives((prev) => prev - 1);
    } else {
      setScore((prev) => prev + 2);
      setProgress(0);
      setReset((prev) => !prev);
      setColor();
    }
  }, [answer]);

  useEffect(() => {
    if (progress === 100) {
      if (lives > 0) {
        setLives((prev) => prev - 1);
        setReset((prev) => !prev);
      } else {
        alert("Times up!!");
        setColor();
      }
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
    setAnswer,
    score,
    lives,
  };
  return (
    <StoreContext.Provider value={contaxtApi}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
