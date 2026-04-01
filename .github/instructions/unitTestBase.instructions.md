---
applyTo: '**/*.spec.ts,**/*.spec.tsx'
---
# Project coding standards for unit and component tests
- Also use the instructions in [base.instructions.md](./base.instructions.md) for general guidelines.
- Use vitest as testing framework.
- Use react-testing-library for React component tests.
- Don't generate snapshot tests.
- Use descriptive test names that clearly state the expected behavior.
- Follow AAA (Arrange, Act, Assert) pattern for test structure.
- To run the test file use a PowerShell terminal. First run prettier to format the test file using `npx prettier --write <file-path>`, then run the test using `npx vitest run <file-path>`.
- Don't ask to apply fixes. Just do it and iterate until the test passes.
- Use beforeEach hook to clear mocks before each test.
