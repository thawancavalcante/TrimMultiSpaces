# TrimMultiSpaces
A TypeScript transformer that handling with multiline template strings by removing unnecessary spaces at compile time

## Overview

When working with template strings in TypeScript, it's common to encounter unwanted indentation when dealing with multiline text.

For example:

```typescript
function yourMethod() {
  const body = `Detail:
Name: ${user.name}
Age: ${user.age}
`;
}
```

To fix that indentation we need to lead to multiple spaces being included in your final string, which is often undesirable.
While one workaround is to manually remove these spaces using `.replaceAll('  +/g', '')`, doing so repeatedly can be cumbersome and error-prone.

```typescript
function yourMethod() {
  const body = `Detail:
        Name: ${user.name}
        Age: ${user.age}
    `.replaceAll("  +/g", "");
}
```

To address this, I've created the `TrimMultiSpaces` transformer. This removes all unnecessary whitespaces at compile time, ensuring that your TypeScript code is clean and your compiled output is free of unwanted spaces.

## Installation

1. **Use [ttypescript](https://github.com/cevek/ttypescript)**: Replace `typescript` with [ttypescript](https://github.com/cevek/ttypescript) as your compiler since the default TypeScript compiler doesn't support transformer plugins.

2. **Add `globals.d.ts`**: Create a `globals.d.ts` file in your project and add this line of code:

   ```typescript
   declare function TrimMultiSpaces(input: string): string;
   ```

3. **Set up the transformer**:

   - Copy the `transformers` folder of this repo in the root directory of your project (where your `tsconfig.json` is located).
   - Update your `tsconfig.json` to include the transformer plugin:

   ```json
   {
     "compilerOptions": {
       "plugins": [{ "transform": "./transformers/TrimMultiSpaces.ts" }]
     }
   }
   ```

## Usage

To use `TrimMultiSpaces`, simply wrap your template string as shown below:

```typescript
const body = TrimMultiSpaces(`Detail:
    Name: ${user.name}
    Age: ${user.age}
`);
```

When you compile your project using `ttsc`, the multiline template string will be transformed, removing any unnecessary spaces, resulting in clean and consistent output:

```typescript
const body = `Detail:\nName: ${user.name}\nAge: ${user.age}\n`;
```

## Why Use TrimMultiSpaces?

- **Cleaner Code**: No more cluttered template strings with unwanted spaces.
- **Efficiency**: Eliminates the need for manual space removal.
- **Compile-Time Transformation**: Ensures your strings are optimized before they even reach runtime.
