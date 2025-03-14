describe('Weather Application', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('search for a city', () => {
        cy.contains('Weather Application');
        cy.get('[data-testid=search-input]').type('Melbourne');
        cy.contains('Search').click();
        cy.get('[data-testid=search-results] .search-result').should('have.length', 5);
    });
});