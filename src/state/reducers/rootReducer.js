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
        submissions: [ ...state.submissions, action.payload ]
      };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
