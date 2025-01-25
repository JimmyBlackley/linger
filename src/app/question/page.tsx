"use client";

import { useEffect, useState } from "react";
import { Quiz,  Question } from "@prisma/client";
// import { put } from "@vercel/blob";

const App = () => {


  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [text, setText] = useState("");
  const [quizId, setQuizId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions?quizId=${quizId}`);
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
  }, [quizId]);

    useEffect(() => {
      const fetchQuizzes = async () => {
        try {
          const response = await fetch("/api/quizzes");
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setQuizzes(data);
        } catch (error) {
          console.error("Failed to fetch quizzes:", error);
          setError("Failed to fetch quizzes. Please try again later.");
        }
      };
      fetchQuizzes();
    }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quizId === null) {
      setError("Please enter a quiz ID.");
      return;
    }
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
      setText("");
      setQuizId(null);
    } catch (error) {
      console.error("Failed to create question:", error);
      setError("Failed to create question. Please try again later.");
    }
  };

  const editQuestion = (question: Question) => async () => {
    console.log(question)
    const newText = prompt("Enter new question text:", question.text);
    if (newText === null) {
      return;
    }
    question.text = newText;
    try {
    
      const response = await fetch(`/api/questions?id=${question.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: question.id, text: question.text, quizId: question.quizId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedQuestion = await response.json();
      setQuestions((questions) =>
        questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
      );
    } catch (error) {
      console.error("Failed to update question:", error);
      setError("Failed to update question. Please try again later.");
    }
  }


  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold text-black">Questions</h1>
      <h2 className="text-xl font-bold text-gray-600">select quiz from drop down</h2>
      <select
        value={quizId || ""}
        onChange={(e) => setQuizId(e.target.value || null)}
        className="block w-full p-2 mt-2 border border-gray-600 rounded-md text-black"
      >
        <option value="">Select a quiz</option>
        {quizzes.map((quiz) => (
          <option key={quiz.id} value={quiz.id}>
            {quiz.title}
          </option>
        ))}
      </select>
      <ul className="mt-4">
        {questions.map((question) => (
          <li key={question.id} className="p-2 border border-gray-300 rounded-md text-black mt-2">
            {question.text} - {question.id} <button className="ml-2 bg-red-500 text-white p-1 rounded-md" type="button" onClick={editQuestion(question)}>Edit</button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Add a question</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter question text"
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded-md">
          Add Question
        </button>
      </form>


    </div>
  );
};

export default App;