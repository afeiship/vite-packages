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

  it('04/email has assign global to local', () => {
    cy.get('[for="email"]').should('contain', 'from local');
  });

  it.only('05/email has placeholder props', () => {
    cy.get('#email').should('have.attr', 'placeholder', 'Please input your email');
  });
});
