"use client";

import { useEffect, useState } from "react";

const App = () => {
  interface Question {
    id: number;
    text: string;
    type: string;
    quizId: number;
    createdAt: string;
  }

  interface Answer {
    id: number;
    text: string;
    questionId: number;
    isCorrect: boolean;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [text, setText] = useState("");
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions", { cache: 'force-cache' });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setError("Failed to fetch questions. Please try again later.");
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questionId !== null) {
      const fetchAnswers = async () => {
        try {
          const response = await fetch(`/api/answers?questionId=${questionId}`, { cache: 'force-cache' });
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setAnswers(data);
        } catch (error) {
          console.error("Failed to fetch answers:", error);
          setError("Failed to fetch answers. Please try again later.");
        }
      };

      fetchAnswers();
    }
  }, [questionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questionId === null) {
      setError("Please select a question.");
      return;
    }
    try {
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, questionId, isCorrect }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const newAnswer = await response.json();
      setAnswers([...answers, newAnswer]);
      setText("");
      setIsCorrect(false);
    } catch (error) {
      console.error("Failed to create answer:", error);
      setError("Failed to create answer. Please try again later.");
    }
  };

  return (
    <div className="m-4">
      <h1 className="text-[99px] text-black">Answers</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <select
          value={questionId ?? ""}
          onChange={(e) => setQuestionId(Number(e.target.value))}
          required
          className="border text-black"
        >
          <option value="" disabled>
            Select a question
          </option>
          {questions.map((question) => (
            <option key={question.id} value={question.id}>
              {question.text}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new answer text"
          required
          className="border text-black placeholder-slate-400"
        />
        <label>
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
          />
          Correct Answer
        </label>
        <button
          className="bg-white p-8 m-3 text-black border-black border"
          type="submit"
        >
          Create Answer
        </button>
      </form>
      <ul className="text-gray-950">
        {answers.map((answer) => (
          <li
            key={answer.id}
            className={`${
              answer.isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {answer.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;