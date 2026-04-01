---
applyTo: '**/*.cy.ts'
---
# Project coding standards for cypress tests
- Also use the instructions in [base.instructions.md](./base.instructions.md) for general guidelines.
- Cypress tests are located in the [cypress/e2e](../../cypress/e2e) folder and its subfolders. The file-ending for cypress test files is `.cy.ts`.
- Create one describe block for the tested part of the application. In this block create nested it cases for each specific scenario. There should be at least one happy path test case and one error case per tested part of the application.
- Follow AAA (Arrange, Act, Assert) pattern for test structure.
- To run the test file use a PowerShell terminal. Run the test using `npx cypress run --spec <file-path>`.
- Don't ask to apply fixes. Just do it and iterate until the test passes.
