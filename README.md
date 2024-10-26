# User Management Application Project

## Description

The User Management Application is a production-ready web application designed to provide a comprehensive user experience (UX) for performing CRUD (Create, Read, Update, Delete) operations on a User entity.

## Features

- User management functionalities (view, add, edit, delete users)
- GraphQL and RESTful APIs
- Type safety with TypeScript
- Component-based architecture
- Styled with Material-UI

## Technologies

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Material-UI**: React UI framework for faster and easier web development.
- **React Query**: Data-fetching library for React.
- **Apollo Client**: State management library for GraphQL.
- **GraphQL**: Query language for APIs and a runtime for executing those queries.
- **JSON Server**: Fake REST API for testing and development.
- **Playwright**: End-to-end testing framework.
- **Jest**: JavaScript testing framework used for unit and integration testing.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khumbon/user-management-app
   cd user-management-app
   ```

2. Install dependencies using npm run:
   ```bash
   npm install
   ```

### Running the Application

To start the application along with the GraphQL and JSON server, run:

```bash
npm run start
```

This command will run the following scripts concurrently:

- React development server (on port 3000)
- JSON server (on port 5000)
- GraphQL server (on port 4000)

### Testing

To run the unit tests, use:

```bash
npm run test
```

To run Playwright end-to-end tests, use:

```bash
npm run test:pw
```

### Linting

To check for code quality issues, run:

```bash
npm run lint
```

To automatically fix linting errors, run:

```bash
npm run lint:fix
```

### Type Checking

To perform type checking on the codebase, run:

```bash
npm run typecheck
```

## Scripts

The following scripts are available:

- `start:web`: Starts the React development server.
- `build`: Builds the application for production.
- `eject`: Ejects the create-react-app configuration (not recommended).
- `graphql-server`: Starts the GraphQL server.
- `json-server`: Starts the JSON server.
- `start:server`: Starts both the JSON server and GraphQL server.
- `start`: Starts the web server, JSON server, and GraphQL server concurrently.
- `format`: Formats code using Prettier.
- `lint`: Lints the code using ESLint.
- `lint:fix`: Fixes linting issues automatically.
- `test`: Runs unit tests with Jest.
- `typecheck`: Checks TypeScript types.
- `test:pw`: Runs Playwright tests.

TODO: atoms, molecules, organisms, test queries and mutations using msw - mock service worker
