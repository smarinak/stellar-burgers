/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    addIngredient(name: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('addIngredient', (name: string) =>
  cy.contains('[data-e2e-test="ingredient-card"]', name).within(() => {
    cy.get('button').first().click();
  })
);
