describe('User can submit the quiz', () => {
  before(() => {
    cy.visit('/');

    cy.fixture('apiResult').then((obj) => {
      cy.window()
        .its('store')
        .invoke('dispatch', { type: 'STORE_QUIZ', payload: obj.quiz});
    });
    cy.window()
      .its('store')
      .invoke('dispatch', { 
        type: 'SUBMIT_ANSWER',
        payload: {
          index: 0,
          submittedAnswer: 'A',
          correctAnswer: 'A'
        }
      });
    cy.window()
      .its('store')
      .invoke('dispatch', { 
        type: 'SUBMIT_ANSWER',
        payload: {
          index: 1,
          submittedAnswer: 'B',
          correctAnswer: 'C'
        }
      });
  });

  describe('by clicking the "Submit Quiz" button', () => {
    before(() => {
      cy.get('[data-cy=submit-quiz]').click();
    });

    it('is expected to store the Quiz results and display', () => {
      cy.window()
        .its('store')
        .invoke('getState')
        .then((state) => {
          expect(state.results).to.eql({
            totalAnswers: 2,
            correctAnswers: 1,
            wrongAnswers: 1,
            percentCorrect: 0.5
          });
        });
    });
  });
});