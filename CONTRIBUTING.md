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
scripts/
  validate-snippets.js  # Validates the reference snippets/fern.code-snippets file
snippets/
  fern.code-snippets    # Reference file (not loaded by the extension)
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

## Validate reference snippets

```
npm run validate
```

Checks that `snippets/fern.code-snippets` contains all 40 expected prefixes and is valid JSON.

## Add a new component

1. Add a `ComponentDef` entry to the appropriate `COMPONENTS.push(...)` block in `src/components.ts`
2. Add the corresponding entry to `snippets/fern.code-snippets` (reference file)
3. Add the prefix to `EXPECTED_PREFIXES` in `scripts/validate-snippets.js`
4. Run `npm run validate` to confirm

## Package

```
npm run package
```

Produces `fern-snippets-<version>.vsix` in the project root.

## Install locally

In VS Code: Extensions panel → `...` → "Install from VSIX..." → select the `.vsix` file.
