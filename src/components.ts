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
