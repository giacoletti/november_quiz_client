const rootReducer = (state, action) => {
  switch (action.type) {
    case 'STORE_QUIZ':
      return {
        ...state,
        quiz: action.payload
      };
    case 'SUBMIT_ANSWER':
      return {
        ...state,
        submissions: [...state.submissions, action.payload]
      };
    default:
      return state;
  }
};

export default rootReducer;
