import React from 'react';
import { useDispatch } from 'react-redux';
import shuffleArray from '../modules/shuffleArray';

const Question = ({ currentQuestion, question, incrementQuestion }) => {
  let answers = [...question.incorrect_answers, question.correct_answer];
  answers = shuffleArray(answers);
  const dispatch = useDispatch();
  
  const onClickHandler = (selector) => {
    dispatch({
      type: 'SUBMIT_ANSWER',
      payload: {
        index: currentQuestion,
        submittedAnswer: selector.textContent,
        correctAnswer: question.correct_answer
      }
    });
    incrementQuestion(currentQuestion + 1);
  };

  return (
    <>
      <div className="question box">
        <p><span>{currentQuestion + 1}. </span>{question.question}</p>
      </div>
      <ul className="answers">
        {answers.map((answer, answerIndex) => {
          return <li
            data-cy={`question-${currentQuestion}-${answerIndex}`}
            onClick={(event) => onClickHandler(event.target)}
            className="answer box"
            key={`question-${currentQuestion}-${answerIndex}`}>
            {answer}
          </li>
        })}
      </ul>
    </>
  );
};

export default Question;
