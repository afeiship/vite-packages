describe('empty spec', () => {
  it('01/toggle checkbox should change rating state', () => {
    cy.visit('http://localhost:3000');
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
});
