import { Todo } from '../../src/models/Todo';
import { todo1 } from '../../src/test/data/Todo';

const todo2 = {
  owner: 'tomsmith',
  dueDate: '2023-01-20T00:00:00+01:00',
  description: 'Beschreibung',
  completed: false,
  id: 2,
} as Todo;

describe('Todo dialog', () => {
  it('should load the todo dialog', () => {
    cy.addGlobalIntercepts();

    cy.visit('/');
    cy.get('[data-testid=loading-spinner]').should('not.exist');
    cy.get('[data-testid=EditNoteIcon]').click();
    cy.get('[col-id=owner]').should('exist');
  });

  it('should create a new todo', () => {
    cy.addGlobalIntercepts();
    cy.intercept('POST', 'http://localhost:5000/todos', todo2);

    cy.visit('/todos');
    cy.get('#todo-table-button-create').click();
    cy.get('#owner').type('tomsmith');
    cy.get('#dueDate').type('20.01.2023');
    cy.get('#description').type('Beschreibung');
    cy.get('#button-save').click();

    cy.get('#notistack-snackbar', { timeout: 10000 }).should('be.visible');
    cy.get('#notistack-snackbar').should('have.text', 'Todo wurde neu erstellt.');
    cy.get('#notistack-snackbar', { timeout: 10000 }).should('not.be.visible');

    cy.get('div[row-index=1] div[col-id=owner]:contains("tomsmith")').should('exist');
    cy.get('div[row-index=1] div[col-id=dueDate]:contains("20.01.2023")').should('exist');
    cy.get('div[row-index=1] div[col-id=description]:contains("Beschreibung")').should('exist');
    cy.get('div[row-index=1] div[col-id=completed] input').should('not.be.checked');
  });

  it('should edit the new todo', () => {
    cy.addGlobalIntercepts();
    cy.intercept('GET', 'http://localhost:5000/todos', [todo1, todo2]);
    cy.intercept('GET', 'http://localhost:5000/todos/2', todo2);
    cy.intercept('PATCH', 'http://localhost:5000/todos/2', { ...todo2, completed: true } as Todo);

    cy.visit('/todos');
    cy.get('div[row-index=1] [data-testid=EditIcon]').click();
    cy.get('#completed').click();
    cy.get('#button-save').click();

    cy.get('#notistack-snackbar', { timeout: 10000 }).should('be.visible');
    cy.get('#notistack-snackbar').should('have.text', 'Todo wurde aktualisiert.');
    cy.get('#notistack-snackbar', { timeout: 10000 }).should('not.be.visible');

    cy.get('div[row-index=1] div[col-id=completed] input').should('be.checked');
  });

  it('should delete the new todo', () => {
    cy.addGlobalIntercepts();
    cy.intercept('GET', 'http://localhost:5000/todos', [todo1, { ...todo2, completed: true } as Todo]);
    cy.intercept('DELETE', 'http://localhost:5000/todos/2', {});

    cy.visit('/todos');
    cy.get('div[row-index=1] [data-testid=DeleteIcon]').click();
    cy.get('#modal-confirm-cancel', { timeout: 10000 }).should('exist');
    cy.get('#modal-confirm-cancel-button-confirm').click();
    cy.get('#modal-confirm-cancel', { timeout: 10000 }).should('not.exist');

    cy.get('#notistack-snackbar', { timeout: 10000 }).should('be.visible');
    cy.get('#notistack-snackbar').should('have.text', 'Todo wurde gelöscht.');
    cy.get('#notistack-snackbar', { timeout: 10000 }).should('not.be.visible');

    cy.get('div[row-index=1] div[col-id=owner]:contains("tomsmith")').should('not.exist');
  });
});
