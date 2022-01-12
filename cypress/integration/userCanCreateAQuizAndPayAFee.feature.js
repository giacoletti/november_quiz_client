describe('User can create a quiz by choosing category and difficulty and by paying a fee', () => {
  before(() => {
    cy.intercept('POST', '**/api/quizzes', {
        fixture: 'apiResult.json'
      })
      .as('getQuizzes');
    // cy.intercept('POST', 'https://r.stripe.com/0', { statusCode: 201 }); //not working ???
    cy.visit('/');
    cy.get('[data-cy=create-form]').should('be.visible');
    cy.get('[data-cy=category]').select('history', { force: true });
    cy.get('[data-cy=difficulty]').select('hard', { force: true });
    cy.get('[data-cy=create-button]').click({ force: true });
  });

  it('is expected to display a payment form', () => {
    cy.get('[data-cy=payment-form]').should('be.visible');
  });

  it('is expected to display a message', () => {
    cy.get('[data-cy=payment-form]').within(() => {
      cy.get('[data-cy=payment-message]')
        .should('contain.text', 'Pay a small fee to proceed');
    });
  });

  describe('filling in valid credit card data', () => {
    before(() => {
      cy.intercept('POST', 'https://r.stripe.com/0', { statusCode: 201 });
      cy.intercept('POST', '*api/payments', { body: { paid: true }, statusCode: 201 });
      cy.get('[data-cy=payment-form]').within(() => {
        cy.get('[data-cy=email]').type('fake@mail.com');

        cy.fillInStripeElement('cardnumber', '4242424242424242') // in cypress/support/commands.js;
        cy.fillInStripeElement('exp-date', '1223') // in cypress/support/commands.js;
        cy.fillInStripeElement('cvc', '123') // in cypress/support/commands.js;

        cy.get('[data-cy=submit-payment]').click();
      });
    });

    it.only('is expected to ...', () => {});
  });

  xit('is expected to make a POST request to the API', () => {
    cy.wait('@getQuizzes').its('request.method').should('eq', 'POST');
  });

  xit('is expected to hide the create form', () => {
    cy.get('[data-cy=create-form]').should('not.exist');
  });

  xit('is expected to get collection of 4 possible answers', () => {
    cy.get('[data-cy=quiz-list] ul').children().should('have.length', 4);
  });
});
