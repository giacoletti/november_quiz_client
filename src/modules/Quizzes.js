import { api } from "./network";

const Quizzes = {
  create({ category, difficulty }) {

    return async dispatch => {
      const { data } = await api.post("/quizzes", {
        params: {
          category: category,
          difficulty: difficulty,
        },
      });
      dispatch({ type: 'STORE_QUIZ', payload: data.quiz });
    }
  },
};

export default Quizzes;
