import { User } from '../../src/models/User';
import { user1 } from '../../test/data/User';

const user2 = {
  id: 2,
  name: 'Tom Smith',
  dateOfBirth: '1980-01-01T00:00:00+01:00',
  size: 180,
  weight: 75.3,
  email: 'tom.smith@example.com',
  phone: '0123/4567890',
} as User;

describe('User dialog', () => {
  it('should load the user dialog', () => {
    cy.addGlobalIntercepts();

    cy.visit('/');
    cy.get('[data-testid=loading-spinner]').should('not.exist');
    cy.get('[data-testid=PeopleIcon]').click();
    cy.get('[col-id=name]').should('exist');
  });

  it('should create a new user', () => {
    cy.addGlobalIntercepts();
    cy.intercept('POST', 'http://localhost:5000/users', user2);

    cy.visit('/users');
    cy.get('#user-table-button-create').click();
    cy.get('#name').type('Tom Smith');
    cy.get('#dateOfBirth').type('01.01.1980');
    cy.get('#size').type('180');
    cy.get('#weight').type('75,3');
    cy.get('#email').type('tom.smith@example.com');
    cy.get('#phone').type('0123/4567890');
    cy.get('#button-save').click();

    cy.get('#notistack-snackbar', { timeout: 10000 }).should('be.visible');
    cy.get('#notistack-snackbar').should('have.text', 'Nutzer wurde neu erstellt.');
    cy.get('#notistack-snackbar', { timeout: 10000 }).should('not.be.visible');

    cy.get('div[row-index=1] div[col-id=name]:contains("Tom Smith")').should('exist');
    cy.get('div[row-index=1] div[col-id=dateOfBirth]:contains("01.01.1980")').should('exist');
    cy.get('div[row-index=1] div[col-id=size]:contains("180")').should('exist');
    cy.get('div[row-index=1] div[col-id=weight]:contains("75,3")').should('exist');
    cy.get('div[row-index=1] div[col-id=email]:contains("tom.smith@example.com")').should('exist');
    cy.get('div[row-index=1] div[col-id=phone]:contains("0123/4567890")').should('exist');
  });

  it('should edit the new user', () => {
    cy.addGlobalIntercepts();
    cy.intercept('GET', 'http://localhost:5000/users', [user1, user2]);
    cy.intercept('GET', 'http://localhost:5000/users/2', user2);
    cy.intercept('PATCH', 'http://localhost:5000/users/2', { ...user2, phone: '0123/0987654' } as User);

    cy.visit('/users');
    cy.get('div[row-index=1] [data-testid=EditIcon]').click();
    cy.get('#phone').clear().type('0123/0987654');
    cy.get('#button-save').click();

    cy.get('#notistack-snackbar', { timeout: 10000 }).should('be.visible');
    cy.get('#notistack-snackbar').should('have.text', 'Nutzer wurde aktualisiert.');
    cy.get('#notistack-snackbar', { timeout: 10000 }).should('not.be.visible');

    cy.get('div[row-index=1] div[col-id=phone]:contains("0123/0987654")').should('exist');
  });

  it('should delete the new user', () => {
    cy.addGlobalIntercepts();
    cy.intercept('GET', 'http://localhost:5000/users', [user1, { ...user2, phone: '0123/0987654' } as User]);
    cy.intercept('DELETE', 'http://localhost:5000/users/2', {});

    cy.visit('/users');
    cy.get('div[row-index=1] [data-testid=DeleteIcon]').click();
    cy.get('#modal-confirm-cancel', { timeout: 10000 }).should('exist');
    cy.get('#modal-confirm-cancel-button-confirm').click();
    cy.get('#modal-confirm-cancel', { timeout: 10000 }).should('not.exist');

    cy.get('#notistack-snackbar', { timeout: 10000 }).should('be.visible');
    cy.get('#notistack-snackbar').should('have.text', 'Nutzer wurde gelöscht.');
    cy.get('#notistack-snackbar', { timeout: 10000 }).should('not.be.visible');

    cy.get('div[row-index=1] div[col-id=name]:contains("Tom Smith")').should('not.exist');
  });
});
