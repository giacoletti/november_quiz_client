import { api } from './network';

const Quizzes = {
  create({ category, difficulty }) {
    return async (dispatch) => {
      const { data } = await api.post('/quizzes', {
        params: {
          category: category,
          difficulty: difficulty
        }
      });
      dispatch({ type: 'STORE_QUIZ', payload: data.quiz });
    };
  },
  submit() {
    return async (dispatch, state) => {
      let totalAnswers = 0,
        correctAnswers = 0,
        wrongAnswers = 0,
        percentCorrect;
      let submissions = state().submissions;

      submissions.forEach((submission) => {
        totalAnswers += 1;
        submission.submittedAnswer === submission.correctAnswer ? 
          (correctAnswers += 1) : (wrongAnswers += 1);
      });
      percentCorrect = correctAnswers / totalAnswers;
      dispatch({
        type: 'SET_RESULTS',
        payload: {
          totalAnswers: totalAnswers,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          percentCorrect: percentCorrect
        }
      });
    };
  }
};

export default Quizzes;
