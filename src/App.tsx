import { useState, useEffect } from 'react';
import './App.css';

const getRandomColor = () => {
  const digits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  const resultColor = new Array(6)
    .fill('')
    .map(digit => digits[Math.floor(Math.random() * digits.length)])
    .join('');
  return `#${resultColor}`;
}

function App() {
  const [color, setColor] = useState<string>();
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  const pickColor = () => {
    getRandomColor();
    const rightColor = getRandomColor();
    setColor(rightColor);
    setAnswers([rightColor, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()));
  }

  useEffect(() => {
    pickColor();
  }, [])

  const checkAnswer = (answer: string) => {
    if(answer === color) { 
      setResult(true);
      pickColor();
    } else { 
      setResult(false);
    }
  }
  
  return (
    <div className="App">
      <div className="col">
        <div className="card" style={{background: color}}></div>
        <div className="button-container">
          {
            answers.map((answer) => <button onClick={() => checkAnswer(answer)} key={answer}>{answer}</button>)
          }
        </div>
        {result === false && <p className='wrong'>Incorrect</p>}
        {result === true && <p className='correct'>Correct</p>}
      </div>
    </div>
  );
}

export default App;
