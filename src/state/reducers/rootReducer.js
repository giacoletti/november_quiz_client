const rootReducer = (state, action) => {
  switch (action.type) {
    case 'STORE_QUIZ':
      return {
        ...state,
        quiz: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;
