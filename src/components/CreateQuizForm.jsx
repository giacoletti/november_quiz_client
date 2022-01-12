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
import axios from 'axios';

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
    if (elements == null){
      return;
    }
    const cardNumElement = elements.getElement(CardNumberElement);
    const stripeResponse = await stripe.createToken(cardNumElement);
    // make call to our api and finalize the charge
    const paymentStatus = await axios.post('http://localhost:3000/api/payments', {
      stripeToken: stripeResponse.token.id,
      currency: 'sek',
      amount: 1000,
      email: event.target.email.value
    });
    // if response contains {paid: true} then call
    if (paymentStatus.data.paid){
      dispatch(Quizzes.create({ category: category, difficulty: difficulty }));
    } else {
      // if not, then tell the user that the payment is not done
    }
  }

  return (
    <div className="quiz-container" data-cy="create-form">
      { displayPaymentForm ? 
        <form data-cy="payment-form" onSubmit={formSubmitHandler}>
          <h3 data-cy="payment-message">Pay a small fee to proceed</h3>
          <div>
            <input type="text" data-cy="email" name="email" />
          </div>
          <div data-cy="cardnumber">
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
