import React from "react";
import { useSelector } from "react-redux";
import CreateQuizForm from "./components/CreateQuizForm";

const App = () => {
  const { quiz } = useSelector(state => state)

  let questionList;

  if (quiz.questions) {
    questionList = quiz.questions.map((question, index) => {
      return <li key={index}>{question.question}</li>;
    });
  }

  return (
    <>
      {!quiz.questions &&
        <CreateQuizForm />
      }
      <div data-cy="quiz-list">{questionList}</div>
    </>
  );
};

export default App;
