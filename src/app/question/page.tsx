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

  const [questions, setQuestions] = useState<Question[]>([]);
  const [text, setText] = useState("");
  const [quizId, setQuizId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, quizId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const newQuestion = await response.json();
      setQuestions([...questions, newQuestion]);
      setText("")
      setQuizId(null);
    } catch (error) {
      console.error("Failed to create question:", error);
      setError("Failed to create question. Please try again later.");
    }
  };

  return (
    <div className="m-4">
      <h1 className="text-[99px] text-black">Questions</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new question text"
          required
          className="border text-black placeholder-slate-400"
        />
        <input 
          type="text"
          value = { Number(quizId) }
          onChange={(e) => setQuizId(Number(e.target.value))}
          placeholder="Enter Question ID"
          required
          className="border text-black placeholder-slate-400"
        />
        <button
          className="bg-white p-8 m-3 text-black border-black border"
          type="submit"
        >
          Create Question
        </button>
      </form>
      <ul className="text-gray-950">
        {questions.map((question) => (
          <li key={question.id}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;