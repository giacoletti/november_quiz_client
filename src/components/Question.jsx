import React from 'react'

const Question = ({ currentQuestion, question, incrementQuestion }) => {
  let answers = [...question.incorrect_answers, question.correct_answer]

  return (
    <div className="answer box">
      <span>{currentQuestion + 1}</span>{question.question}
      <ul className="answers">
        {answers.map((answer, answerIndex) => {
          return <li 
          onClick={() => incrementQuestion(currentQuestion + 1)}
          className="answer box"
            key={`question-${currentQuestion}-${answerIndex}`}>
            {answer}
          </li>
        })}
      </ul>
    </div>
  )
}

export default Question
