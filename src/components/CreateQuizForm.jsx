import React, { useState } from 'react';
import CategorySelector from "./Categoryselector";
import DifficultySelector from "./Difficultyselector";
import Quizzes from "../modules/Quizzes";
import { useDispatch } from "react-redux";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CreateQuizForm = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [displayPaymentForm, setDisplayPaymentForm] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const createQuiz = async () => {
    setDisplayPaymentForm(true)
    // here we want to trigger the display of a payment form
    // dispatch(Quizzes.create({
    //   category: category,
    //   difficulty: difficulty,
    // }));
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    debugger;
  }

  return (
    <div className="quiz-container" data-cy="create-form">
      { displayPaymentForm ? 
        <form data-cy="payment-form" onSubmit={formSubmitHandler}>
          <h3 data-cy="payment-message">Pay a small fee to proceed</h3>
          <div data-cy="card-number">
            <CardNumberElement />
          </div>
          <div data-cy="exp-date">
            <CardExpiryElement />
          </div>
          <div data-cy="cvc">
            <CardCvcElement />
          </div>
          <button data-cy="submit-payment" type="submit" disabled={!stripe || !elements}>
            Pay
          </button>
        </form> : 
        <>
          <CategorySelector onCategoryChange={setCategory} />
          <DifficultySelector onDifficultyChange={setDifficulty} />
          <button className="box" data-cy="create-button" onClick={createQuiz}>
           Create Quiz
          </button>
        </>
      }
    </div>
  );
};

export default CreateQuizForm;
