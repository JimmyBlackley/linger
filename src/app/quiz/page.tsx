'use client';

import { useEffect, useState } from 'react';

const App = () => {
  interface Quiz {
    id: number;
    title: string;
  }

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch('/api/quizzes');
      const data = await response.json();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
    });
    const newQuiz = await response.json();
    setQuizzes([...quizzes, newQuiz]);
    setTitle('');
  };
  return (
    <div>
      <h1>Quizzes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          required
        />
        <button type="submit">Create Quiz</button>
      </form>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;