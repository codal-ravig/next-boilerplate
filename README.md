# Next.js Boilerplate with Tailwind CSS, TypeScript, ESLint, Prettier, Husky, and Jest

This is a **Next.js boilerplate** project pre-configured with:

- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code linting and formatting
- **Husky** for pre-commit hooks
- **Jest** and **React Testing Library** for testing

Use this template to kickstart your Next.js projects with all the best practices and tools already set up.

---

## Features

- **Next.js 15+** with App Router
- **Tailwind CSS** for utility-first styling
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality and formatting
- **Husky** pre-commit hooks for:

  - Linting
  - Type-checking
  - Building
  - Testing

- **Jest** and **React Testing Library** for unit and integration testing

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/codal-ravig/next-boilerplate.git
cd next-boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view your application.

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run format`: Format code using Prettier.
- `npm run type-check`: Run TypeScript type-checking.
- `npm run test`: Run Jest tests.
- `npm run test:watch`: Run Jest in watch mode.

---

## Pre-Commit Hooks

This project uses **Husky** to run the following checks before every commit:

1. **Linting**: Ensures your code follows ESLint rules.
2. **Type-checking**: Ensures TypeScript types are valid.
3. **Build**: Ensures the project can be built successfully.
4. **Testing**: Runs Jest tests to ensure no regressions.

If any of these checks fail, the commit will be aborted.

---

## Testing

This boilerplate includes **Jest** and **React Testing Library** for testing. Tests are located in the `__tests__` directory alongside their corresponding components.

### Running Tests

- Run all tests:

```bash
npm run test
```

- Run tests in watch mode:

```bash
npm run test:watch
```

### Example Test

A sample test is provided in `components/__tests__/Example.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import Example from '../Example';

describe('Example Component', () => {
  it('renders correctly', () => {
    render(<Example />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
```

---

## Folder Structure

```
my-nextjs-boilerplate/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Example.tsx
│   │   └── __tests__/
│   │       └── Example.test.tsx
│   ├── styles/
│   │   └── globals.css
│   └── lib/               # Optional: Utility functions or libraries
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── jest.setup.js
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

---

## Configuration

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js`. You can customize your theme, colors, and more here.

### ESLint and Prettier

- ESLint rules are defined in `.eslintrc.json`.
- Prettier formatting options are defined in `.prettierrc`.

### Jest

Jest is configured in `jest.config.js`. You can add custom matchers, setup files, and more here.

---

## Contributing

If you find any issues or want to add improvements, feel free to open a pull request or issue.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Enjoy building with this Next.js boilerplate! 🚀
