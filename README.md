## 🚀 SQL Query Runner Web Application

This project is a web-based application designed to accept, execute, and display
SQL query results in real-time. The application includes an interactive SQL
query editor, supports multiple queries, and provides performance optimizations
for an efficient user experience.

<img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" /> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />

<br>

## 🛠 Technologies Used

| Technology                 | Function in the Project                                                  |
| -------------------------- | ------------------------------------------------------------------------ |
| **Next.js**                | React-based framework for building the web application.                  |
| **TypeScript**             | Ensures type safety and improves code maintainability.                   |
| **CSS3**                   | Provides styling and responsiveness for the UI.                          |
| **Monaco-Editor**          | Powers the SQL query editor with syntax highlighting and autocompletion. |
| **Zustand**                | Manages global state efficiently for UI interactions.                    |
| **TanStack React-Table**   | Displays query results in an interactive, sortable table.                |
| **TanStack React-Virtual** | Optimizes table rendering for large datasets.                            |
| **ESLint & Prettier**      | Maintains code consistency and formatting.                               |
| **Husky & Commitlint**     | Enforces commit message standards and pre-commit checks.                 |

<br>

## 📜 Repository Standards

- Includes [`CODE_OF_CONDUCT.md`](/CODE_OF_CONDUCT.md) and
  [`MIT LICENSE`](/LICENSE) to ensure project integrity.
- Prettier is the default code formatter
  ([`prettier configuration`](/prettier.config.js)).
- Strict ESLint rules:
  - [`ESLint configurations`](/eslint.config.mjs) ensure clean and maintainable
    code.
  - Warns about unused variables and enforces TypeScript best practices.
- **Advanced TypeScript configurations** (`noImplicitAny`, `strictNullChecks`)
  for type safety ([`tsconfig.json`](/tsconfig.json)).
- **Automatic import sorting** using ESLint plugins for cleaner code
  organization.

<br>

## ✨ UI/UX Features

- **📂 Tab Interface** - Users can open multiple query tabs simultaneously,
  enabling seamless multitasking.
- **✍️ Query Editor** - Provides an interactive SQL editor with syntax
  highlighting, auto-completion, and error detection.
- **⚡ Query Execution** - Runs SQL queries and displays results in real-time
  with sorting inside tables.
- **📊 Query Stats** - Displays execution time, row count, and performance
  insights for each query.
- **🔄 Split View** - Allows users to view both the SQL editor and query results
  side by side.
- **📜 Table Schema Viewer** - Shows detailed information about database tables,
  including column names and data types.
- **📁 Saved Queries** - Users can save frequently used queries as collections
  for quick access.
- **🔀 Database Switcher** - Enables users to switch between different databases
  on the fly.
- **💾 Local Storage Integration** - Stores user preferences, query history, and
  saved queries in local storage.
- **🌙 Dark Mode Support** - Provides a toggle between light and dark themes for
  better readability.
- **📤 Export to CSV** - Allows users to download query results in CSV format
  for further analysis.
- **🚨 Error Handling & Feedback** - Displays clear error messages and
  suggestions when SQL execution fails.

<br>

## 🏗 Available Commands

Below are the commands you can use along with a brief explanation of their
functions.

- **`dev`** - Starts the development server.
- **`build`** - Compiles the application for production.
- **`start`** - Runs the built production version.
- **`lint`** - Checks for ESLint errors in the codebase.
- **`lint:fix`** - Fixes ESLint issues automatically.
- **`format`** - Checks if files adhere to the Prettier formatting rules.
- **`format:fix`** - Auto-formats files to match Prettier rules.
- **`type-check`** - Runs TypeScript type-checking to ensure correctness.
- **`prepare`** - Initializes Husky for commit hooks.
- **`lint-staged`** - Runs formatting and linting on staged files before
  committing.

<br>

## ⚡ Performance Optimizations

- **State Management with Zustand** - Ensures efficient state updates without
  unnecessary re-renders.
- **Optimized Event Handlers** - Utilizes `useCallback` for functions to prevent
  unwanted component re-renders.
- **Local State Variables** - Minimizes reliance on global state for improved
  responsiveness.
- **Memoization** - Functions like table row selection, toggles, and UI actions
  are memoized using `useMemo` and `useCallback` to enhance performance.
- **Virtualized Table Rendering** - Uses `TanStack React-Virtual` to display
  large datasets efficiently, reducing memory and rendering load.
- **Optimized DOM Manipulation** - Reduces expensive DOM updates using efficient
  reconciliation strategies.

<br>

## 🔥 Lighthouse Report: Page Load Time

To look into the page loading time of the application Lighthouse has been used and the report has been attached below for the reference.

![sql-editor](https://github.com/user-attachments/assets/a9ecb465-0e38-43c0-99de-2b122d8faf2f)
