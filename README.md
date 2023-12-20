# React-boilerplate project

## Template
To setup this react-boilerplate project a vite template was used https://github.com/reduxjs/redux-templates/tree/master/packages/vite-template-redux (see [below](#vite-template-redux))
```bash
npx degit reduxjs/redux-templates/packages/vite-template-redux react-boilerplate
```

## Features
- typescript
- vite as build tool
- dashboard and 4 dialogs to view/edit users/todos
- every dialog and every entity has its own url for easy bookmarking and forwarding
- api and model generation from swagger specification using openapi-client-axios (for users)
- manually implemented api and models (for todos)
- environment perceiving (prod, dev, test) using VITE_ENV custom environment variable
- authorisation using a custom HOC (higher order component)
- error boundary for (remote) logging of errors
- codestyling using eslint, prettier
  - VS-Code configuration for encoding, end of line, tab size
  - IntelliJ configuration
- complete unit tested using vitest
- TODO: e2e tests of the most important functionalities using cypress
- material UI as UI library
- notifications using notistack
- translations using i18next
- routing using react-router (404-Not Found page included)
- forms using formik (input validation, input state tracking (was there any change?) included)
- tables using ag-grid-community

## Project setup
- install node (version 20 LTS) https://nodejs.org/en/download/
- install VS-Code https://code.visualstudio.com/download
  - install the following extensions:
    - Name: ESLint
      Id: dbaeumer.vscode-eslint
      Description: Integrates ESLint JavaScript into VS Code.
      Publisher: Microsoft
      VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
    - Name: Prettier - Code formatter
      Id: esbenp.prettier-vscode
      Description: Code formatter using prettier
      Publisher: Prettier
      VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- clone project, configure git
```bash
git clone https://github.com/stevi84/react-boilerplate.git
cd ./react-boilerplate
git config --local core.autocrlf false
npm install
npm run start:backend
npm start
```

## Production

For getting this app production ready, follow these steps:
- remove mock-backend
```bash
npm uninstall json-server
```
- delete db.json from project root
- remove start:backend Skript from package.json
- provide your own swagger file with server specifications (it is also possible to configure servers in OpenApiClient.ts directly) for generated apis or modify getUrl() in BaseApi.ts for manual apis
- if you don't want to use generated apis and types you can remove openapi-client-axios and js-yaml, remove typegen script and adapt build script from package.json, and use manually generated api like in TodoApi.ts
```bash
npm uninstall openapi-client-axios js-yaml
```

## Npm scripts
- start... starts a development server
- start:backend... starts a mock backend
- typegen... generates api and interface types when the interface specification changes
- build... makes a production build
- preview... starts a server for a preview of the production build
- test... runs unit and snapshot tests
- test:updateSnapshots... runs unit and updates snapshot tests
- test:coverage... generates a coverage report
- cypress:open... opens the cypress gui
- cypress:run... runs the e2e-tests headlless
- format... reformats all files using prettier
- lint... checks the code-style in all files
- type-check... check for typescript issues everywhere

## Dependencies

Dependencies marked with "vite-default" already came with the used vite-template.

### Dependencies
- @emotion/react (ui)
- @emotion/styled (ui)
- @mui/material (ui)
- @mui/icons-material (icons)
- @mui/x-date-pickers (datepicker component)
- @reduxjs/toolkit (redux, vite-default)
- ag-grid-community (table component)
- ag-grid-react (table component)
- axios (api rest calls)
- date-fns (working with dates)
- formik (forms)
- js-yaml (yaml support for openapi-client-axios)
- notistack (notifications)
- openapi-client-axios (generator for api and interface types)
- react (react, vite-default)
- react-dom (react, vite-default)
- react-i18next (internationalization)
- react-redux (redux, vite-default)
- react-router-dom (routing)
- yup (form validation)

### Dev dependencies
- @testing-library/dom (unittests, vite-default)
- @testing-library/jest-dom (unittests, vite-default)
- @testing-library/react (unittests, vite-default)
- @testing-library/user-event (unittests, vite-default)
- @types/react (types, vite-default)
- @types/react-dom (types, vite-default)
- @types/redux-mock-store (types)
- @types/testing-library__jest-dom (types, vite-default)
- @vitejs/plugin-react (react, vite-default)
- @vitest/coverage-v8 (coverage provider for unittests)
- cross-env (set environment variables independent of operating system)
- cypress (e2e-testing)
- eslint (code-style, vite-default)
- eslint-config-prettier (code-style)
- eslint-config-react-app (code-style, vite-default)
- eslint-plugin-prettier (code-style, vite-default)
- jsdom (unittests, vite-default)
- json-server (mock-backend)
- prettier (code-style, vite-default)
- redux-mock-store (mock redux store in unittests)
- typescript (typescript, vite-default)
- vite (vite, vite-default)
- vite-plugin-eslint (code-style, vite-default)
- vitest (unittests, vite-default)

# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
