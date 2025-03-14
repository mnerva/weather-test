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
    
    it('renders the app title', () => {
        cy.get('h1', { timeout: 10000 }).should('contain.text', 'Weather Application').should('be.visible');
    });

    it('searcher to see id the weather category is clouds', () => {
        cy.get('[data-testid=search-input]').type('Melbourne');
        cy.contains('Search').click();
        cy.get('[data-testid=search-results] .search-result').first().click();
        cy.get('[data-testid=my-weather-list] .weather-container').should('have.length', 1);
        cy.get('[data-testid=my-weather-list] .weather-container').should('have.class', 'clouds');
      });
});