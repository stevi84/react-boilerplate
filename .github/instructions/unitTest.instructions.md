---
applyTo: '**/*.spec.ts'
---
# Project coding standards for unit tests
- Also use the instructions in [unitTestBase.instructions.md](./unitTestBase.instructions.md) for unit test files and in [base.instructions.md](./base.instructions.md) for general guidelines.
- Create one describe block per module. In this block create nested describe blocks for each method in the module being tested. In these nested blocks, add individual it cases for each specific scenario.
- Mock external dependencies to isolate the unit being tested. Test the happy path as well as edge cases and error conditions.
