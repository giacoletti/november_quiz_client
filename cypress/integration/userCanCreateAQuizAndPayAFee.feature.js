describe('User can create a quiz by choosing category and difficulty and by paying a fee', () => {
  before(() => {
    cy.intercept('POST', '**/api/quizzes', {
        fixture: 'apiResult.json'
      })
      .as('getQuizzes');
    // cy.intercept()
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
      cy.get('[data-cy=payment-form]').within(() => {
        cy.get('[data-cy=card-number]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type('4242424242424242', { delay: 2 });
          });
        });

        // cy.fillInStripeElement('exp-date', '1223') // in cypress/support/commands.js;

        cy.get('[data-cy=exp-date]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type('1223', { delay: 2 });
          });
        });

        cy.get('[data-cy=cvc]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body)
              .find('input[name="cvc"]')
              .type('123', { delay: 2 });
          });
        });

        cy.get('[data-cy=submit-payment]').click();
      });
    });

    it('is expected to ...', () => {});
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
