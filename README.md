## Overview

Welcome to **cool-gallery**, a web application developed as a submission. This project utilizes **Vite** with **React** and **Styled Components** to create an elegant and modern gallery interface for displaying images and favouriting them. To get started, please ensure you have **Node.js v20.x** and **npm v10.x** installed on your machine and have a **Pexels** account.

## Environment Setup

Before running any scripts, you need to create a file named `.env.local` in the root of your project. This file should contain your Pexels API key as follows:

```
VITE_PEXELS_API_KEY="your_api_key_here"
```

You can find your API key after registering on the Pexels website and generating one.

## Available Scripts

### `npm start`

The `npm start` command launches the application in development mode. It starts the Vite development server, allowing you to view your app in the browser at `http://localhost:3000`.

### `npm typecheck`

Running `npm typecheck` executes TypeScript's type checker on your codebase. This command helps identify any type errors or inconsistencies in your TypeScript files, ensuring that your application adheres to the defined types and interfaces.

### `npm test`

The `npm test` command initiates the testing framework configured for your project.

### `npm preview`

The `npm preview` command builds the application for production and serves it locally, allowing you to preview how it will behave once deployed.

## Conclusion

With these scripts, you're well-equipped to develop, test, and preview your cool-gallery application effectively. Make sure to follow the environment setup instructions carefully to ensure smooth operation.