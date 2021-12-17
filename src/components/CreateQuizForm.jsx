import React, { useState } from 'react';
import CategorySelector from "./Categoryselector";
import DifficultySelector from "./Difficultyselector";
import Quizzes from "../modules/Quizzes";
import { useDispatch } from "react-redux";

const CreateQuizForm = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();

  const createQuiz = async () => {
    dispatch(Quizzes.create({
      category: category,
      difficulty: difficulty,
    }));
  };

  return (
    <div data-cy="create-form">
      <CategorySelector onCategoryChange={setCategory} />
      <DifficultySelector onDifficultyChange={setDifficulty} />
      <button data-cy="create-button" onClick={createQuiz}>
        Create Quiz
      </button>
    </div>
  );
};

export default CreateQuizForm;
