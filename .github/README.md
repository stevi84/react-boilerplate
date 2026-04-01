# Instructions

- The instruction files contain general coding hints for certain file-types (specified by the applyTo header), that Github Copilot uses automatically.

# Prompts

## Test generation

- To generate or update unit-tests for javascript or typescript functions, open an AI Chat (Strg+Shift+I), add the concerned module to the request context, type `/generateUnitTest` in the chat window and wait until Github Copilot finishes.
- To generate or update component-tests for React components do the same as above, but type `/generateComponentTest` in the chat window.
- To generate a cypress-test, type `/generateCypressTest` in the chat window and additionally describe the test case (for cypress tests there is no easy relationship between a certain module and a specific test). Before running a cypress-test assure that the webclient is served (`start` script in [package.json](../webclient/package.json)), but the mock-api and graphql are **not!** running.
