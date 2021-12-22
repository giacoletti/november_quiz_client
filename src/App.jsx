import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateQuizForm from "./components/CreateQuizForm";
import Question from './components/Question';
import Quizzes from "./modules/Quizzes";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { quiz, submissions } = useSelector(state => state);
  const dispatch = useDispatch();
  let questionUI;

  if (quiz.questions) {
    let question = quiz.questions[currentQuestion]
    questionUI =
      currentQuestion >= quiz.questions.length ?
        <h1 style={{ color: 'white' }}>You are done!</h1> :
        <Question
          currentQuestion={currentQuestion}
          question={question}
          incrementQuestion={setCurrentQuestion} />
  }

  return (
    <>
      {!quiz.questions ?
        <CreateQuizForm /> :
        <div data-cy="quiz-list" className="quiz-container">
          {questionUI}
          {submissions.length > 0 &&
            <button data-cy="submit-quiz" onClick={() => dispatch(Quizzes.submit())}>Submit Quiz</button>}
        </div>
      }
    </>
  );
};

export default App;
