# Storyboard Generator

This project is a storyboard generator application built using [SvelteKit](https://kit.svelte.dev/), integrating modern frontend technologies such as GraphQL, TailwindCSS, and TypeScript. It leverages `GraphQL Codegen` for generating GraphQL-related types and operations, and is containerized using Docker for simplified environment setup.

## Requirements

- [Node.js](https://nodejs.org/en/) v20.17.0
- [Docker](https://www.docker.com/) (for containerized services)
- [Docker Compose](https://docs.docker.com/compose/) (to orchestrate services)

## Project Structure

- **Frontend**: Built with SvelteKit and TailwindCSS for a reactive and modern user interface.
- **Backend**: GraphQL API integrated using `pg_graphql` for PostgreSQL database interactions.
- **Code Generation**: Uses GraphQL Codegen to automatically generate TypeScript types based on GraphQL schema and queries.

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yunus-acar/storyboard.git
cd storyboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment configuration and set up your environment variables.
```bash
cp .env.example .env
```
Ensure that the following variables are correctly set in the `.env` file:

- `POSTGRES_DB`: Your PostgreSQL database name
- `POSTGRES_USER`: Your PostgreSQL username
- `POSTGRES_PASSWORD`: Your PostgreSQL password
- `VITE_GRAPHQL_URL`: GraphQL endpoint (e.g., `http://localhost:4000/graphql`)
- `VITE_GRAPHQL_WS_URL`: WebSocket URL for GraphQL subscriptions (e.g., `ws://localhost:4000/graphql`)

### 4. Start Docker Containers
Spin up the necessary Docker containers for services like the database and API.
```bash
docker compose up -d
```

### 5. Generate GraphQL Types
Run the following command to generate the necessary GraphQL types and operations.
```bash
npm run codegen
```

### 6. Start the Development Server
Once everything is set up, you can start the development server.
```bash
npm run dev
```

Navigate to `http://localhost:5173` to access the app in the browser.

## Features

- **SvelteKit**: Reactive framework with file-based routing for building scalable web applications.
- **GraphQL**: Uses pg_graphql for PostgreSQL integration, allowing efficient data querying.
- **GraphQL Codegen**: Automatically generates TypeScript types from GraphQL schemas, ensuring type safety.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: Component library built on top of TailwindCSS for enhanced design consistency and reusable UI components.
- **Yup**: Validation library for data validation in forms.
- **Dockerized Setup**: The app and its dependencies can be run inside Docker containers for a consistent development environment.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run codegen`: Runs GraphQL Codegen to generate types and operations.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Testing

To run tests (if applicable), use:
```bash
npm run test
```
Make sure to add relevant test cases for UI components, GraphQL queries, and business logic.

## Deployment

For production, you can build the project and serve it using the following commands:
```bash
npm run build
npm run preview
```
This will build the application for production and serve it locally for testing purposes.

## Additional Information

- **GraphQL Codegen**: Read more about [GraphQL Code Generator](https://www.graphql-code-generator.com/) and how it simplifies GraphQL integration with TypeScript.
- **SvelteKit Documentation**: For more information on using SvelteKit, visit the official [SvelteKit documentation](https://kit.svelte.dev/docs).
- **Shadcn/UI Documentation**: For more information on using Shadcn/UI, visit the official [Shadcn/UI documentation](https://www.shadcn-svelte.com/docs).
- **Yup Documentation**: For more information on using Yup, visit the official [Yup documentation](https://github.com/jquense/yup).