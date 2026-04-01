---
applyTo: '**/*.spec.tsx'
---
# Project coding standards for component tests
- Also use the instructions in [unitTestBase.instructions.md](./unitTestBase.instructions.md) for unit test files and in [base.instructions.md](./base.instructions.md) for general guidelines.
- Create one describe block per component. In this block create nested it cases for each specific scenario.
- Focus on user interactions and component behavior rather than implementation details.
- Do not mock [Store.ts](../../src/reducers/Store.ts) or any [Redux-Slices](../../src/**/*Reducer.ts) (for mocking actions, reducers or selectors)! Use the renderWithProviders() function from [Utils.tsx](../../src/test/Utils.tsx) to provide a real redux store with defined values, as well as a react router context to the rendered component. So selectors and actions will work as expected.
- Mock backend calls using vi.mock(). If needed create the mock function definitions using vi.hoisted(), so they can be used inside vi.mock(), but also be modified and evaluated in the tests.
- Use the type `as Partial<RootState>` (where RootState is imported from [Store.ts](../../src/reducers/Store.ts)) to define the state object passed to renderWithProviders() when you only need to set a few properties of the redux store.
- Also fix errors that originate not from the test file itself but from the components it uses. In the end there should be no errors when running the test file.
