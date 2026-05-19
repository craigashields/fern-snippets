# Fern Snippets VS Code Extension — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a VS Code snippet extension that expands 20 `fern-*` triggers into Fern documentation component scaffolds in `.mdx` and `.md` files.

**Architecture:** Pure snippet JSON — one `snippets/fern.code-snippets` file registered via `package.json`. No TypeScript, no build step, no VS Code API. A Node.js validator script (`scripts/validate-snippets.js`) acts as the test suite, checking that all 20 expected snippet prefixes are present and well-formed before each commit.

**Tech Stack:** VS Code snippet JSON format, Node.js (validator only), `@vscode/vsce` (packaging)

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Extension manifest — activates snippets for `mdx` and `markdown` |
| `snippets/fern.code-snippets` | All 20 snippets in VS Code snippet JSON format |
| `scripts/validate-snippets.js` | Node.js validator — parses and asserts all 20 snippets present and well-formed |
| `README.md` | Usage guide with full trigger reference table |
| `CHANGELOG.md` | Version history |
| `LICENSE` | MIT license |
| `.vscodeignore` | Excludes `docs/`, `scripts/` from published `.vsix` |

---

## Task 1: Initialize project structure

**Files:**
- Create: `package.json`
- Create: `.vscodeignore`
- Create: `CHANGELOG.md`
- Create: `LICENSE`
- Create: `snippets/` (directory — leave empty for now)
- Create: `scripts/` (directory — leave empty for now)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "fern-snippets",
  "displayName": "Fern Snippets",
  "description": "VS Code snippets for Fern documentation components",
  "version": "0.1.0",
  "publisher": "YOUR_PUBLISHER_ID",
  "engines": {
    "vscode": "^1.60.0"
  },
  "categories": [
    "Snippets"
  ],
  "keywords": [
    "fern",
    "mdx",
    "documentation",
    "snippets",
    "components"
  ],
  "repository": {
    "type": "git",
    "url": ""
  },
  "contributes": {
    "snippets": [
      {
        "language": "mdx",
        "path": "./snippets/fern.code-snippets"
      },
      {
        "language": "markdown",
        "path": "./snippets/fern.code-snippets"
      }
    ]
  }
}
```

- [ ] **Step 2: Create `.vscodeignore`**

```
docs/
scripts/
.gitignore
.vscodeignore
```

- [ ] **Step 3: Create `CHANGELOG.md`**

```markdown
# Changelog

## [0.1.0] - 2026-05-19

### Added
- Initial release with 20 snippets across 9 Fern component families
- Callout variants: `fern-callout`, `fern-note`, `fern-info`, `fern-warning`, `fern-success`, `fern-error`, `fern-tip`, `fern-check`, `fern-launch`
- Card components: `fern-card`, `fern-cardgroup`
- Layout: `fern-tabs`, `fern-steps`
- Code: `fern-code`, `fern-codeblock`
- Accordion: `fern-accordion`, `fern-accordiongroup`
- Inline: `fern-frame`, `fern-badge`, `fern-button`
```

- [ ] **Step 4: Create `LICENSE`**

```
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 5: Commit**

```bash
git add package.json .vscodeignore CHANGELOG.md LICENSE
git commit -m "chore: initialize project structure"
```

---

## Task 2: Write snippet validator (the test suite)

**Files:**
- Create: `scripts/validate-snippets.js`

- [ ] **Step 1: Create `scripts/validate-snippets.js`**

```javascript
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const EXPECTED_PREFIXES = [
  'fern-callout', 'fern-note', 'fern-info', 'fern-warning', 'fern-success',
  'fern-error', 'fern-tip', 'fern-check', 'fern-launch',
  'fern-card', 'fern-cardgroup',
  'fern-tabs', 'fern-steps',
  'fern-code', 'fern-codeblock',
  'fern-accordion', 'fern-accordiongroup',
  'fern-frame', 'fern-badge', 'fern-button'
];

const snippetsPath = path.join(__dirname, '..', 'snippets', 'fern.code-snippets');

let raw;
try {
  raw = fs.readFileSync(snippetsPath, 'utf8');
} catch {
  console.error('✗ snippets/fern.code-snippets not found');
  process.exit(1);
}

let snippets;
try {
  snippets = JSON.parse(raw);
} catch (e) {
  console.error('✗ Invalid JSON:', e.message);
  process.exit(1);
}

const prefixes = Object.values(snippets).map(s => s.prefix);
const missing = EXPECTED_PREFIXES.filter(p => !prefixes.includes(p));

if (missing.length > 0) {
  console.error('✗ Missing snippets:\n' + missing.map(p => `  - ${p}`).join('\n'));
  process.exit(1);
}

for (const [name, snippet] of Object.entries(snippets)) {
  assert(typeof snippet.prefix === 'string', `${name}: prefix must be a string`);
  assert(Array.isArray(snippet.body), `${name}: body must be an array`);
  assert(snippet.body.length > 0, `${name}: body must not be empty`);
  assert(snippet.body.every(l => typeof l === 'string'), `${name}: all body lines must be strings`);
  assert(typeof snippet.description === 'string', `${name}: description must be a string`);
}

console.log(`✓ All ${EXPECTED_PREFIXES.length} snippets validated successfully`);
```

- [ ] **Step 2: Run the validator — verify it fails**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ snippets/fern.code-snippets not found
```

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-snippets.js
git commit -m "test: add snippet validator script"
```

---

## Task 3: Implement Callout snippets (9)

**Files:**
- Create: `snippets/fern.code-snippets`

- [ ] **Step 1: Create `snippets/fern.code-snippets` with all 9 callout snippets**

```json
{
  "Fern Callout": {
    "prefix": "fern-callout",
    "body": [
      "<Callout intent=\"${1|info,warning,success,error,note,tip,check,launch|}\" title=\"$2\">",
      "  $3",
      "</Callout>"
    ],
    "description": "Fern Callout with intent dropdown and optional title"
  },
  "Fern Note": {
    "prefix": "fern-note",
    "body": ["<Note>$1</Note>"],
    "description": "Fern Note callout"
  },
  "Fern Info": {
    "prefix": "fern-info",
    "body": ["<Info>$1</Info>"],
    "description": "Fern Info callout"
  },
  "Fern Warning": {
    "prefix": "fern-warning",
    "body": ["<Warning>$1</Warning>"],
    "description": "Fern Warning callout"
  },
  "Fern Success": {
    "prefix": "fern-success",
    "body": ["<Success>$1</Success>"],
    "description": "Fern Success callout"
  },
  "Fern Error": {
    "prefix": "fern-error",
    "body": ["<Error>$1</Error>"],
    "description": "Fern Error callout"
  },
  "Fern Tip": {
    "prefix": "fern-tip",
    "body": ["<Tip>$1</Tip>"],
    "description": "Fern Tip callout"
  },
  "Fern Check": {
    "prefix": "fern-check",
    "body": ["<Check>$1</Check>"],
    "description": "Fern Check callout"
  },
  "Fern Launch": {
    "prefix": "fern-launch",
    "body": ["<Launch>$1</Launch>"],
    "description": "Fern Launch callout"
  }
}
```

- [ ] **Step 2: Run the validator — verify it shows remaining missing snippets**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ Missing snippets:
  - fern-card
  - fern-cardgroup
  - fern-tabs
  - fern-steps
  - fern-code
  - fern-codeblock
  - fern-accordion
  - fern-accordiongroup
  - fern-frame
  - fern-badge
  - fern-button
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add callout snippets (fern-callout + 8 shorthands)"
```

---

## Task 4: Add Card, Tabs, and Steps snippets (4)

**Files:**
- Modify: `snippets/fern.code-snippets` — add 4 entries before the closing `}`

- [ ] **Step 1: Add Card, CardGroup, Tabs, and Steps entries to `snippets/fern.code-snippets`**

Replace the closing `}` of the JSON object with the following (add these entries before the final `}`):

```json
  ,
  "Fern Card": {
    "prefix": "fern-card",
    "body": [
      "<Card title=\"$1\" icon=\"$2\" href=\"$3\">",
      "  $4",
      "</Card>"
    ],
    "description": "Fern Card with title, icon, href, and content"
  },
  "Fern CardGroup": {
    "prefix": "fern-cardgroup",
    "body": [
      "<CardGroup cols={${1|2,3,4|}}>",
      "  <Card title=\"$2\" icon=\"$3\" href=\"$4\">",
      "    $5",
      "  </Card>",
      "  <Card title=\"$6\" icon=\"$7\" href=\"$8\">",
      "    $9",
      "  </Card>",
      "</CardGroup>"
    ],
    "description": "Fern CardGroup with cols dropdown and two Card children"
  },
  "Fern Tabs": {
    "prefix": "fern-tabs",
    "body": [
      "<Tabs>",
      "  <Tab title=\"$1\">",
      "    $2",
      "  </Tab>",
      "  <Tab title=\"$3\">",
      "    $4",
      "  </Tab>",
      "</Tabs>"
    ],
    "description": "Fern Tabs with two Tab children"
  },
  "Fern Steps": {
    "prefix": "fern-steps",
    "body": [
      "<Steps>",
      "  <Step title=\"$1\">",
      "    $2",
      "  </Step>",
      "  <Step title=\"$3\">",
      "    $4",
      "  </Step>",
      "  <Step title=\"$5\">",
      "    $6",
      "  </Step>",
      "</Steps>"
    ],
    "description": "Fern Steps with three Step children"
  }
```

- [ ] **Step 2: Run the validator — verify remaining missing snippets**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ Missing snippets:
  - fern-code
  - fern-codeblock
  - fern-accordion
  - fern-accordiongroup
  - fern-frame
  - fern-badge
  - fern-button
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add card, tabs, and steps snippets"
```

---

## Task 5: Add CodeBlock and Accordion snippets (4)

**Files:**
- Modify: `snippets/fern.code-snippets` — add 4 entries before the closing `}`

- [ ] **Step 1: Add CodeBlock and Accordion entries to `snippets/fern.code-snippets`**

Add before the final `}`:

```json
  ,
  "Fern Code": {
    "prefix": "fern-code",
    "body": [
      "```${1|javascript,typescript,python,bash,go,java,csharp,curl,http,ruby,swift,kotlin|} ${2:title}",
      "$3",
      "```"
    ],
    "description": "Fern fenced code block with language dropdown and title"
  },
  "Fern CodeBlock": {
    "prefix": "fern-codeblock",
    "body": [
      "<CodeBlock links={{\"$1\": \"$2\"}}>",
      "```${3|javascript,typescript,python,bash,go,java,csharp,curl,http|}",
      "$4",
      "```",
      "</CodeBlock>"
    ],
    "description": "Fern CodeBlock JSX component with deep link support"
  },
  "Fern Accordion": {
    "prefix": "fern-accordion",
    "body": [
      "<Accordion title=\"$1\">",
      "  $2",
      "</Accordion>"
    ],
    "description": "Fern Accordion with title and content"
  },
  "Fern AccordionGroup": {
    "prefix": "fern-accordiongroup",
    "body": [
      "<AccordionGroup>",
      "  <Accordion title=\"$1\">",
      "    $2",
      "  </Accordion>",
      "  <Accordion title=\"$3\">",
      "    $4",
      "  </Accordion>",
      "</AccordionGroup>"
    ],
    "description": "Fern AccordionGroup with two Accordion children"
  }
```

- [ ] **Step 2: Run the validator — verify remaining missing snippets**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✗ Missing snippets:
  - fern-frame
  - fern-badge
  - fern-button
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add code block and accordion snippets"
```

---

## Task 6: Add Frame, Badge, and Button snippets — validator goes green

**Files:**
- Modify: `snippets/fern.code-snippets` — add 3 final entries before the closing `}`

- [ ] **Step 1: Add Frame, Badge, and Button entries to `snippets/fern.code-snippets`**

Add before the final `}`:

```json
  ,
  "Fern Frame": {
    "prefix": "fern-frame",
    "body": [
      "<Frame caption=\"$1\">",
      "  <img src=\"$2\" alt=\"$3\" />",
      "</Frame>"
    ],
    "description": "Fern Frame with caption and image"
  },
  "Fern Badge": {
    "prefix": "fern-badge",
    "body": [
      "<Badge intent=\"${1|info,success,warning,error,note,tip,check,launch|}\">$2</Badge>"
    ],
    "description": "Fern Badge with intent dropdown and label text"
  },
  "Fern Button": {
    "prefix": "fern-button",
    "body": [
      "<Button intent=\"${1|none,primary,success,warning,danger|}\" href=\"$2\">$3</Button>"
    ],
    "description": "Fern Button with intent dropdown, href, and label"
  }
```

- [ ] **Step 2: Run the validator — verify all 20 snippets pass**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✓ All 20 snippets validated successfully
```

- [ ] **Step 3: Commit**

```bash
git add snippets/fern.code-snippets
git commit -m "feat: add frame, badge, and button snippets — all 20 complete"
```

---

## Task 7: Write README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
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

## Component Docs

Full Fern component documentation: [buildwithfern.com/learn/docs/writing-content/components/overview](https://buildwithfern.com/learn/docs/writing-content/components/overview)
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with full snippet reference table"
```

---

## Task 8: Package the extension and install locally

**Files:** No changes — packaging only.

- [ ] **Step 1: Run the validator one final time**

```bash
node scripts/validate-snippets.js
```

Expected output:
```
✓ All 20 snippets validated successfully
```

- [ ] **Step 2: Package the extension**

```bash
npx @vscode/vsce package
```

Expected output (last few lines):
```
 DONE  Packaged: fern-snippets-0.1.0.vsix (X files, Y KB)
```

If `vsce` warns about a missing publisher, that is expected for local packaging — it does not block the `.vsix` from being created.

- [ ] **Step 3: Install the extension in VS Code**

```bash
code --install-extension fern-snippets-0.1.0.vsix
```

Expected output:
```
Extension 'fern-snippets-0.1.0.vsix' was successfully installed.
```

- [ ] **Step 4: Smoke test in VS Code**

1. Open (or create) any `.mdx` or `.md` file in VS Code
2. Type `fern-` — the autocomplete dropdown should show all 20 snippets
3. Select `fern-callout` and press `Tab` — verify the intent choice dropdown appears
4. Select `fern-cardgroup` and press `Tab` — verify 2 Card children are scaffolded with tab stops
5. Select `fern-steps` and press `Tab` — verify 3 Step children appear

- [ ] **Step 5: Commit the packaged `.vsix`** (optional — add to `.gitignore` if you prefer not to track it)

To ignore the `.vsix`:
```bash
echo "*.vsix" >> .gitignore
git add .gitignore
git commit -m "chore: ignore packaged .vsix files"
```

Or to track it:
```bash
git add fern-snippets-0.1.0.vsix
git commit -m "chore: add packaged extension v0.1.0"
```

---

## Publishing Checklist (future — not part of v0.1.0)

When ready to publish to the VS Code Marketplace:

1. Register a publisher at [marketplace.visualstudio.com](https://marketplace.visualstudio.com/manage)
2. Replace `YOUR_PUBLISHER_ID` in `package.json` with your real publisher ID
3. Add `"icon": "images/icon.png"` to `package.json` and place a 128×128 PNG at `images/icon.png`
4. Add `"repository": { "type": "git", "url": "<your-repo-url>" }` to `package.json`
5. Run `npx @vscode/vsce publish`
