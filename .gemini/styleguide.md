# chibird React/TypeScript Style Guide

## General Instructions

- **Posts a code review in Japanese language.**

## Introduction

This style guide defines the coding standards for React/TypeScript development at chibird.
It is based on [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html), with some adjustments made to suit
our needs.

## Core Principles

- **Readability**: Write code that is easy to understand for anyone who reads it.
- **Maintainability**: Structure the code so that it is easy to modify and extend.
- **Consistency**: Maintain a consistent style across the entire project.
- **Performance**: Optimize when necessary, but never sacrifice readability for performance.

---

## General Rules

### Line Length

- **Maximum line length: 100 characters**  
  If a line is too long, break it into multiple lines for readability.

### Indentation

- **Use 2 spaces for indentation** (following common JavaScript/TypeScript conventions).

---

## Naming Conventions

- **Variable/Function names**: Use `camelCase`.  
  Example: `userName`, `calculateTotal()`
- **Constant names**: Use `camelCase` or `ALL_CAPS` (when the constant's meaning strongly indicates it).  
  Example: `defaultPadding`, `MAX_RETRIES`
- **Class/Component names**: Use `PascalCase`.  
  Example: `UserManager`, `HomePage`
- **File names**: Use `kebab-case`.  
  Example: `user-profile.tsx`, `app-theme.ts`

---

## Documentation Comments

**Use `/** ... */` JSDoc style comments.**  
Be clear about parameters, return values, exceptions, etc.

```ts
/**
 * Formats the user's name.
 *
 * Combines firstName and lastName and capitalizes the first letter of each.
 *
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @returns The formatted full name (e.g., "Taro Yamada")
 */
function formatName(firstName: string, lastName: string): string {
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
}
```

---

## Type Annotations and Null Safety

- **Always specify types (especially for public APIs and props).**
- **Use optional types (`?`) only when absolutely necessary.**
- Avoid using `any`, and prefer explicit types.

```ts
const names: string[] = ['Alice', 'Bob']; // OK
const names: any[] = []; // Not recommended
```

---

## Comments

- **Explain "why" the implementation is done in a certain way when necessary.**
- **Avoid comments that only repeat the content of the code.**
- **Both Japanese and English are acceptable. However, it's preferable to maintain consistency.**

```ts
// This check is needed because the backend may return null.
if (response.data !== null) {
  ...
}
```

---

## Exception Handling

- **Handle errors explicitly using `try-catch` when error handling is required.**
- **Use specific error types when possible.**
- **Keep the `catch` scope narrow and ensure to log the output.**

```ts
try {
  await userService.fetch();
} catch (error) {
  if (error instanceof TimeoutError) {
    console.error('A timeout occurred', error);
  } else {
    console.error('An unexpected error occurred', error);
  }
}
```

---

## State Management (React Hooks)

We use **React Hooks** for state management.  
For larger applications, **React Context** or libraries like **Zustand/Recoil/Redux** may be used.

### Basic Usage

- Use `useState` for local state.
- Use `useEffect` for side effects.
- Use `Context` or external libraries for shared/global state.

```tsx
const [count, setCount] = useState<number>(0);

useEffect(() => {
  console.log(`Count updated: ${count}`);
}, [count]);
```

---

## Tools

- **Code Formatter**: [Prettier](https://prettier.io/)
- **Linter**: ESLint with TypeScript rules.
- **Recommended ESLint/Prettier Settings**:
  - `semi: true`
  - `singleQuote: true`
  - `trailingComma: all`
  - `@typescript-eslint/explicit-function-return-type`
  - `react-hooks/exhaustive-deps`, etc.

---
