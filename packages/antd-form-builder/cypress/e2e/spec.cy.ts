describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('01/toggle checkbox should change rating state', () => {
    // cy.get('[for="checkbox"]').click()
    // rating exists
    cy.get('[for="rating"]').should('exist');
    cy.get('.ant-rate-star-full').should('have.length', 1);

    // toggle
    cy.get('[for="checkbox"]').click();
    // rating not exists
    cy.get('[for="rating"]').should('not.exist');

    // toggle again
    cy.get('[for="checkbox"]').click();
    cy.get('[for="rating"]').should('exist');
  });

  it('02/password is disabled', () => {
    cy.get('#password').should('have.attr', 'disabled');
  });

  it('03/username is New Label', () => {
    cy.get('[for="username"]').should('have.text', 'New Label form promise');
  });
});
