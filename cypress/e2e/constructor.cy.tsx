describe('Burger constructor – happy path', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setCookie('accessToken', 'fake-access-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('adds a bun and a sauce to the constructor', () => {
    cy.addIngredient('Флюоресцентная булка R2-D3');
    cy.addIngredient('Соус фирменный Space Sauce');

    cy.get('[data-e2e-test="constructor-bun"]').should('have.length', 2);
    cy.get('[data-e2e-test="constructor-ingredient"]').should('have.length', 1);
  });

  it('opens and closes the ingredient modal', () => {
    cy.contains(
      '[data-e2e-test="ingredient-card"]',
      'Соус фирменный Space Sauce'
    ).click();
    cy.get('[data-e2e-test="modal"]')
      .as('modal')
      .should('be.visible')
      .and('contain', 'Соус фирменный Space Sauce');

    cy.get('[data-e2e-test="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.contains(
      '[data-e2e-test="ingredient-card"]',
      'Соус фирменный Space Sauce'
    ).click();
    cy.get('[data-e2e-test="modal-overlay"]').click('topLeft', { force: true });
    cy.get('@modal').should('not.exist');
  });

  it('places an order and clears the constructor', () => {
    cy.addIngredient('Флюоресцентная булка R2-D3');
    cy.addIngredient('Соус фирменный Space Sauce');

    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-e2e-test="modal"]').should('contain', '65536');
    cy.get('[data-e2e-test="modal-close"]').click();

    cy.get('[data-e2e-test="constructor-bun"]').should('not.exist');
    cy.get('[data-e2e-test="constructor-ingredient"]').should('have.length', 0);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.clear();
  });
});
