# Contributing

## Project structure

```
src/
  extension.ts    # Entry point — registers CompletionItemProvider and HoverProvider
  components.ts   # All 40 ComponentDef objects + buildDoc helper
  completion.ts   # FernCompletionProvider (fern- prefix and < JSX triggers)
  hover.ts        # FernHoverProvider (hover over JSX tags)
build.js          # esbuild build script
tsconfig.json     # TypeScript config
assets/
  icon.png        # Extension icon (128x128)
```

## Setup

```
npm install
```

## Build

```
npm run build
```

## Watch mode

```
npm run watch
```

Rebuilds `dist/extension.js` automatically on save.

## Type check

```
npx tsc --noEmit
```

## Add a new component

1. Add a `ComponentDef` entry to the appropriate `COMPONENTS.push(...)` block in `src/components.ts`
2. Run `npx tsc --noEmit` to confirm no type errors

## Package

```
npm run package
```

Produces `fern-snippets-<version>.vsix` in the project root.

## Install locally

In VS Code: Extensions panel → `...` → "Install from VSIX..." → select the `.vsix` file.
