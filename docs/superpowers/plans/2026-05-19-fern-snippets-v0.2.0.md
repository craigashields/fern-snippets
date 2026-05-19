# Fern Snippets v0.2.0 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 20 new snippets covering the remaining 18 Fern components, bringing the total to 40, and ship as v0.2.0.

**Architecture:** Same as v0.1.0 — extend `snippets/fern.code-snippets` with new entries, update the validator's expected prefix list first (TDD), add in 4 logical batches, then update metadata and repackage.

**Tech Stack:** VS Code snippet JSON, Node.js (validator), `@vscode/vsce` (packaging)

---

## File Map

| File | Change |
|---|---|
| `scripts/validate-snippets.js` | Add 20 new expected prefixes (40 total) |
| `snippets/fern.code-snippets` | Add 20 new snippet entries |
| `CHANGELOG.md` | Prepend v0.2.0 section |
| `package.json` | Bump version `0.1.0` → `0.2.0` |
| `README.md` | Add 20 new rows to Snippets table |

---

## Task 1: Update validator to expect all 40 snippets

**Files:**
- Modify: `scripts/validate-snippets.js`

- [ ] **Step 1: Replace `EXPECTED_PREFIXES` in `scripts/validate-snippets.js`**

Replace the existing `const EXPECTED_PREFIXES = [...]` block with:

```javascript
const EXPECTED_PREFIXES = [
  // v0.1.0
  'fern-callout', 'fern-note', 'fern-info', 'fern-warning', 'fern-success',
  'fern-error', 'fern-tip', 'fern-check', 'fern-launch',
  'fern-card', 'fern-cardgroup',
  'fern-tabs', 'fern-steps',
  'fern-code', 'fern-codeblock',
  'fern-accordion', 'fern-accordiongroup',
  'fern-frame', 'fern-badge', 'fern-button',
  // v0.2.0
  'fern-anchor', 'fern-aside', 'fern-copy', 'fern-download',
  'fern-endpoint-request', 'fern-endpoint-response', 'fern-endpoint-schema',
  'fern-files', 'fern-icon', 'fern-if', 'fern-indent', 'fern-paramfield',
  'fern-prompt', 'fern-runnable-endpoint', 'fern-schema',
  'fern-table', 'fern-sticky-table', 'fern-searchable-table',
  'fern-tooltip', 'fern-versions'
];
```

- [ ] **Step 2: Run the validator — verify it shows 20 missing snippets**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ Missing snippets:
  - fern-anchor
  - fern-aside
  - fern-copy
  - fern-download
  - fern-endpoint-request
  - fern-endpoint-response
  - fern-endpoint-schema
  - fern-files
  - fern-icon
  - fern-if
  - fern-indent
  - fern-paramfield
  - fern-prompt
  - fern-runnable-endpoint
  - fern-schema
  - fern-table
  - fern-sticky-table
  - fern-searchable-table
  - fern-tooltip
  - fern-versions
```

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-snippets.js
git commit -m "test: update validator to expect 40 snippets"
```

---

## Task 2: Add layout and inline snippets (5)

Components: Anchor, Aside, Indent, Icon, Copy

**Files:**
- Modify: `snippets/fern.code-snippets` — add 5 entries before the closing `}`

- [ ] **Step 1: Add 5 entries to `snippets/fern.code-snippets` before the final `}`**

```json
  ,
  "Fern Anchor": {
    "prefix": "fern-anchor",
    "body": ["<Anchor id=\"$1\">$2</Anchor>"],
    "description": "Fern Anchor for linking to non-heading content"
  },
  "Fern Aside": {
    "prefix": "fern-aside",
    "body": [
      "<Aside>",
      "  $1",
      "</Aside>"
    ],
    "description": "Fern Aside — sticky right-side container"
  },
  "Fern Indent": {
    "prefix": "fern-indent",
    "body": [
      "<Indent>",
      "  $1",
      "</Indent>"
    ],
    "description": "Fern Indent for nested or hierarchical content"
  },
  "Fern Icon": {
    "prefix": "fern-icon",
    "body": ["<Icon icon=\"$1\" />"],
    "description": "Fern Icon — Font Awesome icon by name"
  },
  "Fern Copy": {
    "prefix": "fern-copy",
    "body": ["<Copy clipboard=\"$1\">$2</Copy>"],
    "description": "Fern Copy — click-to-copy with optional custom clipboard text"
  }
```

- [ ] **Step 2: Run the validator — verify 15 remaining missing**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ Missing snippets:
  - fern-download
  - fern-endpoint-request
  - fern-endpoint-response
  - fern-endpoint-schema
  - fern-files
  - fern-if
  - fern-paramfield
  - fern-prompt
  - fern-runnable-endpoint
  - fern-schema
  - fern-searchable-table
  - fern-sticky-table
  - fern-table
  - fern-tooltip
  - fern-versions
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add anchor, aside, indent, icon, copy snippets"
```

---

## Task 3: Add interaction snippets (3)

Components: Tooltip, Download, If

**Files:**
- Modify: `snippets/fern.code-snippets` — add 3 entries before the closing `}`

- [ ] **Step 1: Add 3 entries before the final `}`**

```json
  ,
  "Fern Tooltip": {
    "prefix": "fern-tooltip",
    "body": ["<Tooltip tip=\"$1\">$2</Tooltip>"],
    "description": "Fern Tooltip — hover info on trigger content"
  },
  "Fern Download": {
    "prefix": "fern-download",
    "body": [
      "<Download src=\"$1\">",
      "  <Button intent=\"primary\">$2</Button>",
      "</Download>"
    ],
    "description": "Fern Download — file download with button trigger"
  },
  "Fern If": {
    "prefix": "fern-if",
    "body": [
      "<If products={[\"$1\"]}>",
      "  $2",
      "</If>"
    ],
    "description": "Fern If — show content conditionally by product, version, or role"
  }
```

- [ ] **Step 2: Run the validator — verify 12 remaining missing**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ Missing snippets:
  - fern-endpoint-request
  - fern-endpoint-response
  - fern-endpoint-schema
  - fern-files
  - fern-paramfield
  - fern-prompt
  - fern-runnable-endpoint
  - fern-schema
  - fern-searchable-table
  - fern-sticky-table
  - fern-table
  - fern-versions
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add tooltip, download, if snippets"
```

---

## Task 4: Add API reference snippets (6)

Components: EndpointRequestSnippet, EndpointResponseSnippet, EndpointSchemaSnippet, RunnableEndpoint, Schema, ParamField

**Files:**
- Modify: `snippets/fern.code-snippets` — add 6 entries before the closing `}`

- [ ] **Step 1: Add 6 entries before the final `}`**

```json
  ,
  "Fern EndpointRequestSnippet": {
    "prefix": "fern-endpoint-request",
    "body": ["<EndpointRequestSnippet endpoint=\"$1\" />"],
    "description": "Fern EndpointRequestSnippet — embed API request code snippet (format: METHOD /path)"
  },
  "Fern EndpointResponseSnippet": {
    "prefix": "fern-endpoint-response",
    "body": ["<EndpointResponseSnippet endpoint=\"$1\" />"],
    "description": "Fern EndpointResponseSnippet — embed API response code snippet (format: METHOD /path)"
  },
  "Fern EndpointSchemaSnippet": {
    "prefix": "fern-endpoint-schema",
    "body": [
      "<EndpointSchemaSnippet endpoint=\"$1\" selector=\"${2|request,request.body,response,response.body|}\" />"
    ],
    "description": "Fern EndpointSchemaSnippet — embed API schema with selector dropdown"
  },
  "Fern RunnableEndpoint": {
    "prefix": "fern-runnable-endpoint",
    "body": ["<RunnableEndpoint endpoint=\"$1\" />"],
    "description": "Fern RunnableEndpoint — interactive API request builder (format: METHOD /path)"
  },
  "Fern Schema": {
    "prefix": "fern-schema",
    "body": ["<Schema type=\"$1\" />"],
    "description": "Fern Schema — display type definition from API reference"
  },
  "Fern ParamField": {
    "prefix": "fern-paramfield",
    "body": [
      "<ParamField path=\"$1\" type=\"${2|string,number,boolean,object,array|}\">",
      "  $3",
      "</ParamField>"
    ],
    "description": "Fern ParamField — document an API parameter with type and description"
  }
```

- [ ] **Step 2: Run the validator — verify 6 remaining missing**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ Missing snippets:
  - fern-files
  - fern-prompt
  - fern-searchable-table
  - fern-sticky-table
  - fern-table
  - fern-versions
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add API reference snippets (endpoint, schema, paramfield)"
```

---

## Task 5: Add structure, table, and versioning snippets — validator goes green (6)

Components: Files, Prompt, Table, StickyTable, SearchableTable, Versions

**Files:**
- Modify: `snippets/fern.code-snippets` — add 6 final entries before the closing `}`

- [ ] **Step 1: Add 6 entries before the final `}`**

```json
  ,
  "Fern Files": {
    "prefix": "fern-files",
    "body": [
      "<Files>",
      "  <Folder name=\"$1\" defaultOpen>",
      "    <File name=\"$2\" />",
      "    <File name=\"$3\" />",
      "  </Folder>",
      "  <File name=\"$4\" />",
      "</Files>"
    ],
    "description": "Fern Files — interactive file tree with folders and files"
  },
  "Fern Prompt": {
    "prefix": "fern-prompt",
    "body": [
      "<Prompt title=\"$1\" actions={[\"${2|cursor,claude,chatgpt|}\"]}>" ,
      "  $3",
      "</Prompt>"
    ],
    "description": "Fern Prompt — copyable AI prompt card with open-in actions"
  },
  "Fern Table": {
    "prefix": "fern-table",
    "body": [
      "| $1 | $2 | $3 |",
      "|---|---|---|",
      "| $4 | $5 | $6 |",
      "| $7 | $8 | $9 |"
    ],
    "description": "Fern Table — standard markdown table (3 columns, 2 rows)"
  },
  "Fern StickyTable": {
    "prefix": "fern-sticky-table",
    "body": [
      "<StickyTable>",
      "| $1 | $2 | $3 |",
      "|---|---|---|",
      "| $4 | $5 | $6 |",
      "</StickyTable>"
    ],
    "description": "Fern StickyTable — table with sticky header row"
  },
  "Fern SearchableTable": {
    "prefix": "fern-searchable-table",
    "body": [
      "<SearchableTable placeholder=\"$1\">",
      "| $2 | $3 | $4 |",
      "|---|---|---|",
      "| $5 | $6 | $7 |",
      "</SearchableTable>"
    ],
    "description": "Fern SearchableTable — table with real-time search filter"
  },
  "Fern Versions": {
    "prefix": "fern-versions",
    "body": [
      "<Versions>",
      "  <Version version=\"$1\" title=\"$2\" default>",
      "    $3",
      "  </Version>",
      "  <Version version=\"$4\" title=\"$5\">",
      "    $6",
      "  </Version>",
      "</Versions>"
    ],
    "description": "Fern Versions — show different content based on version selection"
  }
```

- [ ] **Step 2: Run the validator — verify all 40 snippets pass**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✓ All 40 snippets validated successfully
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add files, prompt, table variants, versions snippets — all 40 complete"
```

---

## Task 6: Bump version and update CHANGELOG

**Files:**
- Modify: `package.json`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Bump version in `package.json`**

Change line:
```json
"version": "0.1.0",
```
To:
```json
"version": "0.2.0",
```

- [ ] **Step 2: Prepend v0.2.0 section to `CHANGELOG.md`**

Add after the first line (`# Changelog`) and before the existing `## [0.1.0]` section:

```markdown

## [0.2.0] - 2026-05-19

### Added
- 20 new snippets completing the full Fern component catalog (40 total)
- Navigation/layout: `fern-anchor`, `fern-aside`, `fern-indent`
- Content: `fern-copy`, `fern-download`, `fern-icon`, `fern-tooltip`
- Conditional/versioning: `fern-if`, `fern-versions`
- API reference: `fern-endpoint-request`, `fern-endpoint-response`, `fern-endpoint-schema`, `fern-runnable-endpoint`, `fern-schema`, `fern-paramfield`
- Structure: `fern-files`, `fern-prompt`
- Tables: `fern-table`, `fern-sticky-table`, `fern-searchable-table`

```

- [ ] **Step 3: Commit**

```bash
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 0.2.0"
```

---

## Task 7: Update README

**Files:**
- Modify: `README.md` — add 20 new rows to the Snippets table

- [ ] **Step 1: Replace the Snippets table in `README.md`**

Replace the existing `## Snippets` section with the full 40-row table:

```markdown
## Snippets

### Callouts

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

### Cards, Tabs, Steps

| Trigger | Component | Description |
|---|---|---|
| `fern-card` | `<Card>` | Card with title, icon, href, and content |
| `fern-cardgroup` | `<CardGroup>` | CardGroup with cols dropdown (2/3/4) and two Card children |
| `fern-tabs` | `<Tabs>` | Tabs with two Tab children |
| `fern-steps` | `<Steps>` | Steps with three Step children |

### Code

| Trigger | Component | Description |
|---|---|---|
| `fern-code` | fenced code block | Fenced code block with language dropdown (12 options) and title |
| `fern-codeblock` | `<CodeBlock>` | CodeBlock JSX with deep link support |

### Accordion and Frame

| Trigger | Component | Description |
|---|---|---|
| `fern-accordion` | `<Accordion>` | Accordion with title and content |
| `fern-accordiongroup` | `<AccordionGroup>` | AccordionGroup with two Accordion children |
| `fern-frame` | `<Frame>` | Frame with caption and image |

### Inline

| Trigger | Component | Description |
|---|---|---|
| `fern-badge` | `<Badge>` | Badge with intent dropdown (8 options) |
| `fern-button` | `<Button>` | Button with intent dropdown (5 options), href, and label |
| `fern-icon` | `<Icon>` | Font Awesome icon by name |
| `fern-copy` | `<Copy>` | Click-to-copy with optional custom clipboard text |
| `fern-tooltip` | `<Tooltip>` | Hover info on trigger content |
| `fern-anchor` | `<Anchor>` | Linkable anchor for non-heading content |

### Layout

| Trigger | Component | Description |
|---|---|---|
| `fern-aside` | `<Aside>` | Sticky right-side container |
| `fern-indent` | `<Indent>` | Indented / hierarchical content |
| `fern-download` | `<Download>` | File download with button trigger |
| `fern-if` | `<If>` | Show content conditionally by product, version, or role |
| `fern-prompt` | `<Prompt>` | Copyable AI prompt card with open-in actions |

### Tables

| Trigger | Component | Description |
|---|---|---|
| `fern-table` | markdown table | Standard 3-column, 2-row markdown table |
| `fern-sticky-table` | `<StickyTable>` | Table with sticky header row |
| `fern-searchable-table` | `<SearchableTable>` | Table with real-time search filter |

### Files and Structure

| Trigger | Component | Description |
|---|---|---|
| `fern-files` | `<Files>` | Interactive file tree with folders and files |

### API Reference

| Trigger | Component | Description |
|---|---|---|
| `fern-endpoint-request` | `<EndpointRequestSnippet>` | Embed API request code snippet |
| `fern-endpoint-response` | `<EndpointResponseSnippet>` | Embed API response code snippet |
| `fern-endpoint-schema` | `<EndpointSchemaSnippet>` | Embed API schema with selector dropdown |
| `fern-runnable-endpoint` | `<RunnableEndpoint>` | Interactive API request builder |
| `fern-schema` | `<Schema>` | Display type definition from API reference |
| `fern-paramfield` | `<ParamField>` | Document an API parameter with type and description |

### Versioning

| Trigger | Component | Description |
|---|---|---|
| `fern-versions` | `<Versions>` | Show different content based on version selection |
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README for v0.2.0 with full 40-snippet catalog"
```

---

## Task 8: Repackage and reinstall

**Files:** No changes — packaging only.

- [ ] **Step 1: Run the validator one final time**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✓ All 40 snippets validated successfully
```

- [ ] **Step 2: Package the extension**

```bash
npx @vscode/vsce package --allow-missing-repository
```

Expected output:
```
 DONE  Packaged: fern-snippets-0.2.0.vsix (X files, Y KB)
```

- [ ] **Step 3: Install in VS Code**

Open VS Code → Extensions panel (`Ctrl+Shift+X`) → `...` menu → **Install from VSIX...** → select `fern-snippets-0.2.0.vsix`

Note: the `code --install-extension` CLI does not work on this machine — always use the UI.

- [ ] **Step 4: Smoke test**

1. Open any `.mdx` or `.md` file
2. Type `fern-` — verify the dropdown now shows 40 snippets
3. Test `fern-endpoint-schema` — verify the selector choice dropdown appears (request/request.body/response/response.body)
4. Test `fern-versions` — verify 2 Version children are scaffolded
5. Test `fern-files` — verify Folder + File children are scaffolded
6. Test `fern-table` — verify plain markdown table expands (no JSX tags)

- [ ] **Step 5: Commit .gitignore update if new .vsix appears**

The `.gitignore` already excludes `*.vsix` — no action needed.
