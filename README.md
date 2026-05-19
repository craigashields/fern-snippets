# Fern Snippets

VS Code snippets for [Fern](https://buildwithfern.com) documentation components. Type `fern-` in any `.mdx` or `.md` file to see all available snippets.

## Install

**From marketplace:** Search "Fern Snippets" in the VS Code Extensions panel.

**From .vsix:** Download the latest `.vsix` release and run:

```
code --install-extension fern-snippets-0.1.0.vsix
```

## Usage

In any `.mdx` or `.md` file, type a trigger prefix and press `Tab` (or select from the autocomplete dropdown). Use `Tab` to move between placeholders. Enum props show a choice dropdown at their tab stop.

## Snippets

| Trigger | Component | Description |
|---|---|---|
| `fern-callout` | `<Callout>` | Callout with intent dropdown (8 options) and optional title |
| `fern-note` | `<Note>` | Note callout |
| `fern-info` | `<Info>` | Info callout |
| `fern-warning` | `<Warning>` | Warning callout |
| `fern-success` | `<Success>` | Success callout |
| `fern-error` | `<Error>` | Error callout |
| `fern-tip` | `<Tip>` | Tip callout |
| `fern-check` | `<Check>` | Check callout |
| `fern-launch` | `<Launch>` | Launch / announcement callout |
| `fern-card` | `<Card>` | Card with title, icon, href, and content |
| `fern-cardgroup` | `<CardGroup>` | CardGroup with cols dropdown (2/3/4) and two Card children |
| `fern-tabs` | `<Tabs>` | Tabs with two Tab children |
| `fern-steps` | `<Steps>` | Steps with three Step children |
| `fern-code` | fenced code block | Fenced code block with language dropdown (12 options) and title |
| `fern-codeblock` | `<CodeBlock>` | CodeBlock JSX with deep link support |
| `fern-accordion` | `<Accordion>` | Accordion with title and content |
| `fern-accordiongroup` | `<AccordionGroup>` | AccordionGroup with two Accordion children |
| `fern-frame` | `<Frame>` | Frame with caption and image |
| `fern-badge` | `<Badge>` | Badge with intent dropdown (8 options) |
| `fern-button` | `<Button>` | Button with intent dropdown (5 options), href, and label |

## Development

**Validate snippets:**

```
node scripts/validate-snippets.js
```

**Package the extension:**

```
npx @vscode/vsce package --allow-missing-repository
```

This produces `fern-snippets-0.1.0.vsix` in the project root. The `--allow-missing-repository` flag suppresses the warning about the empty `repository.url` field in `package.json`.

**Install locally from source:**

```
npx @vscode/vsce package --allow-missing-repository
code --install-extension fern-snippets-0.1.0.vsix
```

## Component Docs

Full Fern component documentation: [buildwithfern.com/learn/docs/writing-content/components/overview](https://buildwithfern.com/learn/docs/writing-content/components/overview)
