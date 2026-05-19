# Fern Snippets VS Code Extension — Design Spec

**Date:** 2026-05-19  
**Status:** Approved

---

## Overview

A VS Code snippet extension — modeled after Simple React Snippets — that provides fast, tab-stop-driven expansion of Fern documentation components in `.mdx` and `.md` files.

All snippets are triggered with a `fern-` prefix (e.g., `fern-card`, `fern-callout`), which surfaces the full catalog in VS Code's autocomplete dropdown when the user types `fern-`, acting as a built-in discovery mechanism.

---

## Approach

**Pure snippet JSON (Option A):** A single `snippets/fern.code-snippets` file registered in `package.json`. No build step, no TypeScript compilation, no VS Code API surface area. The entire extension ships as `package.json` + one JSON file.

Rationale: The MVP covers 9 component families (~20 snippets). Hand-authored JSON is the right scale for this scope and is easy for contributors to extend. A generator can be introduced later if the catalog grows to all 27 components.

---

## Project Structure

```
fern-snippets/
├── package.json               # extension manifest + marketplace metadata
├── README.md                  # usage guide with trigger reference table
├── CHANGELOG.md               # version history
├── LICENSE
├── .vscodeignore              # excludes dev files from published .vsix
├── images/
│   └── icon.png               # 128x128 extension icon (Fern logo placeholder)
└── snippets/
    └── fern.code-snippets     # all snippets in one file
```

---

## Extension Metadata (`package.json`)

| Field | Value |
|---|---|
| `name` | `fern-snippets` |
| `displayName` | `Fern Snippets` |
| `description` | `VS Code snippets for Fern documentation components` |
| `version` | `0.1.0` |
| `publisher` | `YOUR_PUBLISHER_ID` (placeholder) |
| `engines.vscode` | `^1.60.0` |
| `categories` | `["Snippets"]` |
| `keywords` | `fern`, `mdx`, `documentation`, `snippets`, `components` |
| `icon` | `images/icon.png` |

Snippets activate for both `mdx` and `markdown` language IDs.

---

## Snippet Catalog

**20 snippets across 9 component families.** MVP scope — most-used components only. Remaining 18 Fern components deferred to a future release.

### Snippet body conventions

- **Required props** are tab stops (`$1`, `$2`, ...)
- **Enum props** use VS Code choice syntax (`${1|a,b,c|}`) — a dropdown appears at that tab stop
- **Compound components** scaffold their children (e.g., `fern-cardgroup` includes 2 ready-to-fill `<Card>` children)
- Final cursor position (`$0`) lands inside the innermost content area

### Full catalog

| Trigger | Expands to | Tab stops |
|---|---|---|
| `fern-callout` | `<Callout intent="..." title="...">` | intent (8-option dropdown), title, content |
| `fern-note` | `<Note>` | content |
| `fern-info` | `<Info>` | content |
| `fern-warning` | `<Warning>` | content |
| `fern-success` | `<Success>` | content |
| `fern-error` | `<Error>` | content |
| `fern-tip` | `<Tip>` | content |
| `fern-check` | `<Check>` | content |
| `fern-launch` | `<Launch>` | content |
| `fern-card` | `<Card title icon href>` | title, icon, href, content |
| `fern-cardgroup` | `<CardGroup cols>` + 2 cards | cols (2/3/4 dropdown), 2× title/icon/href/content |
| `fern-tabs` | `<Tabs>` + 2 `<Tab>` | 2× title + content |
| `fern-steps` | `<Steps>` + 3 `<Step>` | 3× title + content |
| `fern-code` | fenced code block | language (12-option dropdown), title, content |
| `fern-codeblock` | `<CodeBlock links={...}>` | links key, links value, language dropdown, content |
| `fern-accordion` | `<Accordion title>` | title, content |
| `fern-accordiongroup` | `<AccordionGroup>` + 2 accordions | 2× title + content |
| `fern-frame` | `<Frame caption>` + `<img>` | caption, src, alt |
| `fern-badge` | `<Badge intent>` | intent (8-option dropdown), label text |
| `fern-button` | `<Button intent href>` | intent (5-option dropdown), href, label text |

### Snippet bodies (reference)

```jsx
// fern-callout
<Callout intent="${1|info,warning,success,error,note,tip,check,launch|}" title="$2">
  $3
</Callout>

// fern-note (same pattern for info/warning/success/error/tip/check/launch)
<Note>$1</Note>

// fern-card
<Card title="$1" icon="$2" href="$3">
  $4
</Card>

// fern-cardgroup
<CardGroup cols={${1|2,3,4|}}>
  <Card title="$2" icon="$3" href="$4">
    $5
  </Card>
  <Card title="$6" icon="$7" href="$8">
    $9
  </Card>
</CardGroup>

// fern-tabs
<Tabs>
  <Tab title="$1">
    $2
  </Tab>
  <Tab title="$3">
    $4
  </Tab>
</Tabs>

// fern-steps
<Steps>
  <Step title="$1">
    $2
  </Step>
  <Step title="$3">
    $4
  </Step>
  <Step title="$5">
    $6
  </Step>
</Steps>

// fern-code
```${1|javascript,typescript,python,bash,go,java,csharp,curl,http,ruby,swift,kotlin|} ${2:title}
$3
```

// fern-codeblock
<CodeBlock links={{"$1": "$2"}}>
```${3|javascript,typescript,python,bash,go,java,csharp,curl,http|}
$4
```
</CodeBlock>

// fern-accordion
<Accordion title="$1">
  $2
</Accordion>

// fern-accordiongroup
<AccordionGroup>
  <Accordion title="$1">
    $2
  </Accordion>
  <Accordion title="$3">
    $4
  </Accordion>
</AccordionGroup>

// fern-frame
<Frame caption="$1">
  <img src="$2" alt="$3" />
</Frame>

// fern-badge
<Badge intent="${1|info,success,warning,error,note,tip,check,launch|}">$2</Badge>

// fern-button
<Button intent="${1|none,primary,success,warning,danger|}" href="$2">$3</Button>
```

---

## File Type Targeting

Snippets activate for:
- `mdx` — `.mdx` files (primary Fern format)
- `markdown` — `.md` files (Fern also supports components in plain `.md`)

---

## README Structure

The README will include:
1. Short description + install instructions (local `.vsix` + marketplace link when published)
2. Full trigger reference table (mirrors the catalog above)
3. Example GIF/screenshot of snippet expansion in action
4. Link to Fern component docs for each component

---

## Out of Scope (v0.1.0)

The following 18 Fern components are deferred to a future release:

Anchor, Aside, Copy, Download, EndpointRequestSnippet, EndpointResponseSnippet, EndpointSchemaSnippet, Files, Icon, If, Indent, ParameterField, Prompt, RunnableEndpoint, Schema, Table, Tooltip, Versions

---

## Publishing Path

The extension is built marketplace-ready from day one. When ready to publish:

1. Register a publisher at marketplace.visualstudio.com
2. Replace `YOUR_PUBLISHER_ID` in `package.json`
3. Add `images/icon.png` (128×128, Fern logo)
4. Run `vsce package` to generate `.vsix`, then `vsce publish`

No structural changes to the extension are required.
