describe("User can create a quiz by choosing category and difficulty", () => {
  before(() => {
    cy.intercept("POST", "**/api/quizzes", {
      fixture: "apiResult.json",
    }).as('getQuizzes');
    cy.visit("/");
    cy.get('[data-cy=create-form]').should('be.visible');
    cy.get("[data-cy=category]").select("history", { force: true });
    cy.get("[data-cy=difficulty]").select("hard", { force: true });
    cy.get("[data-cy=create-button]").click({ force: true });
  });

  it('is expected to make a POST request to the API', () => {
    cy.wait("@getQuizzes").its('request.method').should('eq', 'POST')
  });

  it('is expected to hide the create form', () => {
    cy.get('[data-cy=create-form]').should('not.exist')
  });

  it('is expected to get collection of 4 possible answers', () => {
    cy.get('[data-cy=quiz-list] ul').children().should('have.length', 4)
  })
});