import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Quizzes from "./modules/Quizzes";
import CategorySelector from "./components/Categoryselector";
import DifficultySelector from "./components/Difficultyselector";

const App = () => {
  const dispatch = useDispatch();
  const { quiz } = useSelector(state => state)
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();

  const createQuiz = async () => {
    dispatch(Quizzes.create({
      category: category,
      difficulty: difficulty,
    }));
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
