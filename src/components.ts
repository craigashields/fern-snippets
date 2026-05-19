export interface PropDef {
  name: string;
  type: string;
  required: boolean;
  description: string;
  choices?: string[];
}

export interface ComponentDef {
  name: string;        // PascalCase JSX name, e.g. "Card"
  prefix: string;      // fern- trigger, e.g. "fern-card"
  jsxForm: boolean;    // false for markdown-syntax snippets (fenced code, pipe table)
  description: string; // one-line summary shown in popup header
  props: PropDef[];
  example: string;     // raw MDX rendered as fenced block in popup
  docUrl: string;      // full buildwithfern.com docs URL
  snippetBody: string; // VS Code SnippetString syntax
}

export function buildDoc(def: ComponentDef): string {
  let md = `### ${def.name}\n\n${def.description}\n\n`;

  if (def.props.length > 0) {
    md += '| Prop | Type | Req | Description |\n';
    md += '|------|------|:---:|-------------|\n';
    for (const p of def.props) {
      const type = p.choices ? `${p.type} (${p.choices.join(' \\| ')})` : p.type;
      md += `| \`${p.name}\` | ${type} | ${p.required ? '✓' : ''} | ${p.description} |\n`;
    }
    md += '\n';
  }

  md += `**Example:**\n\`\`\`mdx\n${def.example}\n\`\`\`\n\n`;
  md += `[View docs →](${def.docUrl})`;
  return md;
}

export const COMPONENTS: ComponentDef[] = [];

COMPONENTS.push(
  {
    name: 'Callout',
    prefix: 'fern-callout',
    jsxForm: true,
    description: 'Callout box with configurable intent and optional title.',
    props: [
      { name: 'intent', type: 'string', required: true, description: 'Visual style of the callout.', choices: ['info', 'warning', 'success', 'error', 'note', 'tip', 'check', 'launch'] },
      { name: 'title', type: 'string', required: false, description: 'Optional heading displayed above the content.' },
    ],
    example: '<Callout intent="warning" title="Rate limits apply">\n  This endpoint is limited to 100 requests per minute.\n</Callout>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Callout intent="${1|info,warning,success,error,note,tip,check,launch|}" title="$2">\n  $3\n</Callout>',
  },
  {
    name: 'Note',
    prefix: 'fern-note',
    jsxForm: true,
    description: 'Note callout — shorthand for <Callout intent="note">.',
    props: [],
    example: '<Note>\n  This feature is available on all plans.\n</Note>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Note>$1</Note>',
  },
  {
    name: 'Info',
    prefix: 'fern-info',
    jsxForm: true,
    description: 'Info callout — shorthand for <Callout intent="info">.',
    props: [],
    example: '<Info>\n  The default timeout is 30 seconds.\n</Info>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Info>$1</Info>',
  },
  {
    name: 'Warning',
    prefix: 'fern-warning',
    jsxForm: true,
    description: 'Warning callout — shorthand for <Callout intent="warning">.',
    props: [],
    example: '<Warning>\n  Deleting a workspace is permanent and cannot be undone.\n</Warning>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Warning>$1</Warning>',
  },
  {
    name: 'Success',
    prefix: 'fern-success',
    jsxForm: true,
    description: 'Success callout — shorthand for <Callout intent="success">.',
    props: [],
    example: '<Success>\n  Your API key has been created successfully.\n</Success>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Success>$1</Success>',
  },
  {
    name: 'Error',
    prefix: 'fern-error',
    jsxForm: true,
    description: 'Error callout — shorthand for <Callout intent="error">.',
    props: [],
    example: '<Error>\n  Authentication failed. Check your API key and try again.\n</Error>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Error>$1</Error>',
  },
  {
    name: 'Tip',
    prefix: 'fern-tip',
    jsxForm: true,
    description: 'Tip callout — shorthand for <Callout intent="tip">.',
    props: [],
    example: '<Tip>\n  Use pagination to retrieve large result sets efficiently.\n</Tip>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Tip>$1</Tip>',
  },
  {
    name: 'Check',
    prefix: 'fern-check',
    jsxForm: true,
    description: 'Check callout — shorthand for <Callout intent="check">.',
    props: [],
    example: '<Check>\n  All required fields have been validated.\n</Check>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Check>$1</Check>',
  },
  {
    name: 'Launch',
    prefix: 'fern-launch',
    jsxForm: true,
    description: 'Launch callout — shorthand for <Callout intent="launch">. Used for announcements.',
    props: [],
    example: '<Launch>\n  Webhooks v2 are now available for all accounts.\n</Launch>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/callout',
    snippetBody: '<Launch>$1</Launch>',
  },
);
