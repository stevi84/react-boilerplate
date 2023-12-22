/// <reference types="cypress" />
import { todo1 } from '../../src/test/data/Todo';
import { user1 } from '../../src/test/data/User';
import { currentUserEditor } from '../../src/test/data/CurrentUser';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      addGlobalIntercepts(): Cypress.Chainable<JQuery>;
    }
  }
}

Cypress.Commands.add('addGlobalIntercepts', () => {
  cy.intercept('GET', 'http://localhost:5000/todos', [todo1]);
  cy.intercept('GET', 'http://localhost:5000/users', [user1]);
  cy.intercept('GET', 'http://localhost:5000/currentUser', currentUserEditor);
});
