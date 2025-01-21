
'use client';

import { useEffect, useState } from 'react';

const App = () => {
  interface Quiz {
    id: number;
    title: string;

    description?: string;
    creatorId: number;
    createdAt: string;
  }

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch("/api/quizzes");
      const data = await response.json();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const creatorId = 1; // Hardcoded user ID
    const response = await fetch("/api/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, creatorId }),
    });
    const newQuiz = await response.json();
    setQuizzes([...quizzes, newQuiz]);
    setTitle("");
  };

  return (
    <div className="m-4">
      <h1 className="text-[99px] text-black">Quizzes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new quiz type"
          required
          className="border text-black placeholder-slate-400"
        />
        <button
          className="bg-white p-8 m-3 text-black border-black border"
          type="submit"
        >
          Create Quiz
        </button>
      </form>
      <ul className="text-gray-950">
        {quizzes.map((quiz) => {
          return <li key={quiz.id}>{quiz.title}</li>;
        })}
      </ul>
    </div>
  );
};


export default App;