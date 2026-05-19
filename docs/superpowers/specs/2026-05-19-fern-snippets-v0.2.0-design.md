# Fern Snippets v0.2.0 — Design Spec

**Date:** 2026-05-19  
**Status:** Approved  
**Extends:** `2026-05-19-fern-snippets-vscode-extension-design.md`

---

## Overview

Extends the v0.1.0 extension (20 snippets) with the remaining 18 Fern built-in components, adding 20 new snippets (Table gets 3 variants) and bringing the total to **40 snippets**.

All design conventions from v0.1.0 are unchanged: `fern-` prefix, `fern.code-snippets` file, required props as tab stops + 1-2 useful optional props, enum props as choice dropdowns.

---

## Approach

**Extend existing file (Option A):** All 20 new snippets are added to the existing `snippets/fern.code-snippets` file. The validator script is updated to expect 40 prefixes. No structural changes to the extension.

---

## New Snippet Catalog (v0.2.0)

20 new snippets across 18 components. Grand total after this release: 40.

| Trigger | Component | Tab stops |
|---|---|---|
| `fern-anchor` | `<Anchor>` | id, content |
| `fern-aside` | `<Aside>` | content |
| `fern-copy` | `<Copy>` | clipboard text, displayed text |
| `fern-download` | `<Download>` | src, button label |
| `fern-endpoint-request` | `<EndpointRequestSnippet>` | endpoint (`METHOD /path`) |
| `fern-endpoint-response` | `<EndpointResponseSnippet>` | endpoint |
| `fern-endpoint-schema` | `<EndpointSchemaSnippet>` | endpoint, selector dropdown |
| `fern-files` | `<Files>` + `<Folder>` + `<File>` | folder name, 2 file names, 1 top-level file |
| `fern-icon` | `<Icon>` | icon name |
| `fern-if` | `<If>` | products array value, content |
| `fern-indent` | `<Indent>` | content |
| `fern-paramfield` | `<ParamField>` | path, type dropdown, description |
| `fern-prompt` | `<Prompt>` | title, actions dropdown, prompt text |
| `fern-runnable-endpoint` | `<RunnableEndpoint>` | endpoint |
| `fern-schema` | `<Schema>` | type name |
| `fern-table` | markdown table | 3-column headers, 2 data rows |
| `fern-sticky-table` | `<StickyTable>` | 3-column headers, 1 data row |
| `fern-searchable-table` | `<SearchableTable>` | placeholder, 3-column headers, 1 data row |
| `fern-tooltip` | `<Tooltip>` | tip text, trigger content |
| `fern-versions` | `<Versions>` + 2 `<Version>` children | 2× version id + title + content |

---

## Snippet Bodies (reference)

```jsx
// fern-anchor
<Anchor id="$1">$2</Anchor>

// fern-aside
<Aside>
  $1
</Aside>

// fern-copy
<Copy clipboard="$1">$2</Copy>

// fern-download
<Download src="$1">
  <Button intent="primary">$2</Button>
</Download>

// fern-endpoint-request
<EndpointRequestSnippet endpoint="$1" />

// fern-endpoint-response
<EndpointResponseSnippet endpoint="$1" />

// fern-endpoint-schema
<EndpointSchemaSnippet endpoint="$1" selector="${2|request,request.body,response,response.body|}" />

// fern-files
<Files>
  <Folder name="$1" defaultOpen>
    <File name="$2" />
    <File name="$3" />
  </Folder>
  <File name="$4" />
</Files>

// fern-icon
<Icon icon="$1" />

// fern-if
<If products={["$1"]}>
  $2
</If>

// fern-indent
<Indent>
  $1
</Indent>

// fern-paramfield
<ParamField path="$1" type="${2|string,number,boolean,object,array|}">
  $3
</ParamField>

// fern-prompt
<Prompt title="$1" actions={["${2|cursor,claude,chatgpt|}"]}>
  $3
</Prompt>

// fern-runnable-endpoint
<RunnableEndpoint endpoint="$1" />

// fern-schema
<Schema type="$1" />

// fern-table (plain markdown)
| $1 | $2 | $3 |
|---|---|---|
| $4 | $5 | $6 |
| $7 | $8 | $9 |

// fern-sticky-table
<StickyTable>
| $1 | $2 | $3 |
|---|---|---|
| $4 | $5 | $6 |
</StickyTable>

// fern-searchable-table
<SearchableTable placeholder="$1">
| $2 | $3 | $4 |
|---|---|---|
| $5 | $6 | $7 |
</SearchableTable>

// fern-tooltip
<Tooltip tip="$1">$2</Tooltip>

// fern-versions
<Versions>
  <Version version="$1" title="$2" default>
    $3
  </Version>
  <Version version="$4" title="$5">
    $6
  </Version>
</Versions>
```

---

## Validator Update

`scripts/validate-snippets.js` `EXPECTED_PREFIXES` array grows from 20 to 40 entries. The 20 new prefixes to add:

```
'fern-anchor', 'fern-aside', 'fern-copy', 'fern-download',
'fern-endpoint-request', 'fern-endpoint-response', 'fern-endpoint-schema',
'fern-files', 'fern-icon', 'fern-if', 'fern-indent', 'fern-paramfield',
'fern-prompt', 'fern-runnable-endpoint', 'fern-schema',
'fern-table', 'fern-sticky-table', 'fern-searchable-table',
'fern-tooltip', 'fern-versions'
```

---

## CHANGELOG Update

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

---

## README Update

The Snippets table in README.md gains 20 rows. The version badge and description update to reflect full catalog coverage.

---

## Notes

- `<ParamField>` is Fern's actual component name (not `ParameterField`)
- `fern-table` expands to plain markdown syntax — no JSX wrapper
- `fern-if` defaults to the `products` prop as the most common use case; `versions` and `roles` props are available but not scaffolded separately
