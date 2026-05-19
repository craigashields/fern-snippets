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

COMPONENTS.push(
  // Cards and layout
  {
    name: 'Card',
    prefix: 'fern-card',
    jsxForm: true,
    description: 'Card with title, optional icon, and optional link.',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Card heading text.' },
      { name: 'icon', type: 'string', required: false, description: 'Font Awesome icon name (e.g. "rocket").' },
      { name: 'href', type: 'string', required: false, description: 'URL the card navigates to when clicked.' },
    ],
    example: '<Card title="Getting Started" icon="rocket" href="/quickstart">\n  Learn how to set up your first project.\n</Card>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/card',
    snippetBody: '<Card title="$1" icon="$2" href="$3">\n  $4\n</Card>',
  },
  {
    name: 'CardGroup',
    prefix: 'fern-cardgroup',
    jsxForm: true,
    description: 'Grid of Card components with configurable column count.',
    props: [
      { name: 'cols', type: 'number', required: false, description: 'Number of columns (default 2).', choices: ['2', '3', '4'] },
    ],
    example: '<CardGroup cols={2}>\n  <Card title="API Reference" icon="code" href="/api">\n    Full endpoint reference.\n  </Card>\n  <Card title="Guides" icon="book" href="/guides">\n    Step-by-step tutorials.\n  </Card>\n</CardGroup>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/card',
    snippetBody: '<CardGroup cols={${1|2,3,4|}}>\n  <Card title="$2" icon="$3" href="$4">\n    $5\n  </Card>\n  <Card title="$6" icon="$7" href="$8">\n    $9\n  </Card>\n</CardGroup>',
  },
  {
    name: 'Tabs',
    prefix: 'fern-tabs',
    jsxForm: true,
    description: 'Tabbed content container with Tab children.',
    props: [],
    example: '<Tabs>\n  <Tab title="Python">\n    ```python\n    client.users.list()\n    ```\n  </Tab>\n  <Tab title="Node.js">\n    ```js\n    client.users.list()\n    ```\n  </Tab>\n</Tabs>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/tabs',
    snippetBody: '<Tabs>\n  <Tab title="$1">\n    $2\n  </Tab>\n  <Tab title="$3">\n    $4\n  </Tab>\n</Tabs>',
  },
  {
    name: 'Steps',
    prefix: 'fern-steps',
    jsxForm: true,
    description: 'Numbered step-by-step instructions with Step children.',
    props: [],
    example: '<Steps>\n  <Step title="Install the SDK">\n    Run `npm install @acme/sdk`.\n  </Step>\n  <Step title="Initialize the client">\n    Pass your API key to the constructor.\n  </Step>\n  <Step title="Make your first request">\n    Call `client.users.list()` to verify setup.\n  </Step>\n</Steps>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/steps',
    snippetBody: '<Steps>\n  <Step title="$1">\n    $2\n  </Step>\n  <Step title="$3">\n    $4\n  </Step>\n  <Step title="$5">\n    $6\n  </Step>\n</Steps>',
  },
  // Code
  {
    name: 'Code',
    prefix: 'fern-code',
    jsxForm: false,
    description: 'Fenced code block with language selector and optional title.',
    props: [],
    example: '```python title="List users"\nusers = client.users.list()\nfor user in users:\n    print(user.name)\n```',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/code-blocks',
    snippetBody: '```${1|javascript,typescript,python,bash,go,java,csharp,curl,http,ruby,swift,kotlin|} ${2:title}\n$3\n```',
  },
  {
    name: 'CodeBlock',
    prefix: 'fern-codeblock',
    jsxForm: true,
    description: 'JSX code block with deep-link support via a links map.',
    props: [
      { name: 'links', type: 'object', required: false, description: 'Map of text tokens in the code to URLs (makes them clickable).' },
    ],
    example: '<CodeBlock links={{"client.users.list": "/api/users/list"}}>\n```python\nusers = client.users.list()\n```\n</CodeBlock>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/code-blocks',
    snippetBody: '<CodeBlock links={{"$1": "$2"}}>\n```${3|javascript,typescript,python,bash,go,java,csharp,curl,http|}\n$4\n```\n</CodeBlock>',
  },
  // Accordion
  {
    name: 'Accordion',
    prefix: 'fern-accordion',
    jsxForm: true,
    description: 'Collapsible section with a clickable title.',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Label shown on the collapsed toggle.' },
    ],
    example: '<Accordion title="What authentication methods are supported?">\n  We support API keys, OAuth 2.0, and JWT tokens.\n</Accordion>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/accordion',
    snippetBody: '<Accordion title="$1">\n  $2\n</Accordion>',
  },
  {
    name: 'AccordionGroup',
    prefix: 'fern-accordiongroup',
    jsxForm: true,
    description: 'Group of Accordion components rendered as a unified FAQ list.',
    props: [],
    example: '<AccordionGroup>\n  <Accordion title="How do I reset my API key?">\n    Go to Settings → API Keys and click Regenerate.\n  </Accordion>\n  <Accordion title="What are the rate limits?">\n    100 requests per minute per API key.\n  </Accordion>\n</AccordionGroup>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/accordion',
    snippetBody: '<AccordionGroup>\n  <Accordion title="$1">\n    $2\n  </Accordion>\n  <Accordion title="$3">\n    $4\n  </Accordion>\n</AccordionGroup>',
  },
  // Frame
  {
    name: 'Frame',
    prefix: 'fern-frame',
    jsxForm: true,
    description: 'Bordered image frame with optional caption.',
    props: [
      { name: 'caption', type: 'string', required: false, description: 'Text displayed below the image.' },
    ],
    example: '<Frame caption="The Fern dashboard overview">\n  <img src="/images/dashboard.png" alt="Dashboard screenshot" />\n</Frame>',
    docUrl: 'https://buildwithfern.com/learn/docs/writing-content/components/frame',
    snippetBody: '<Frame caption="$1">\n  <img src="$2" alt="$3" />\n</Frame>',
  },
);
