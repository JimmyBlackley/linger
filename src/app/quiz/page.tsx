'use client';

import { useEffect, useState } from 'react';

const App = () => {
  interface Quiz {
    id: number;
    title: string;
  }

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch('/api/quizzes');
      const data = await response.json();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;