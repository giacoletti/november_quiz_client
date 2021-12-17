import React, { useState } from "react";
import Quizzes from "./modules/Quizzes";
import CategorySelector from "./components/Categoryselector";
import DifficultySelector from "./components/Difficultyselector";

const App = () => {
  const [quiz, setQuiz] = useState({});
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();

  const createQuiz = async () => {
    const data = await Quizzes.create({
      category: category,
      difficulty: difficulty,
    });
    setQuiz(data.quiz);
  };

  let questionList;

  if (quiz.questions) {
    questionList = quiz.questions.map((question, index) => {
      return <li key={index}>{question.question}</li>;
    });
  }

  return (
    <>
      {!quiz.questions &&
        <div data-cy="create-form">
          <CategorySelector onCategoryChange={setCategory} />
          <DifficultySelector onDifficultyChange={setDifficulty} />
          <button data-cy="create-button" onClick={createQuiz}>
            Create Quiz
          </button>
        </div>
      }
      <div data-cy="quiz-list">{questionList}</div>
    </>
  );
};

export default App;
