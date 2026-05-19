const fs = require('fs');
const path = require('path');
const assert = require('assert');

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
