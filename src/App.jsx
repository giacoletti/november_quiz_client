import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreateQuizForm from "./components/CreateQuizForm";
import Question from './components/Question';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { quiz } = useSelector(state => state);
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
          <div className="question box">
            {questionUI}
          </div>
        </div>
      }
    </>
  );
};

export default App;
