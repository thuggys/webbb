"use client";

import React, { useState } from 'react';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizProps = {
  questions: Question[];
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }

    const trackProgress = async () => {
      try {
        await fetch('/api/achievements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'lessons' })
        })
      } catch (error) {
        console.error('Failed to track progress:', error)
      }
    }

    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      trackProgress();
    }
  };

  return (
    <div>
      {showScore ? (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div>
            {questions[currentQuestionIndex].options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
