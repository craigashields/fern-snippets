import * as vscode from 'vscode';
import { COMPONENTS, buildDoc } from './components';

const COMPONENT_TAG_RE = /<([A-Z][a-zA-Z]+)/;

export class FernHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.Hover | undefined {
    const line = document.lineAt(position).text;
    const lineUpToCursor = line.substring(0, position.character + 1);

    // Walk backward to find the nearest < on this line
    const tagStart = lineUpToCursor.lastIndexOf('<');
    if (tagStart === -1) {
      return undefined;
    }

    const fromTag = line.substring(tagStart);
    const match = fromTag.match(COMPONENT_TAG_RE);
    if (!match) {
      return undefined;
    }

    const def = COMPONENTS.find(c => c.name === match[1]);
    if (!def) {
      return undefined;
    }

    const md = new vscode.MarkdownString(buildDoc(def), true);
    md.isTrusted = true;
    return new vscode.Hover(md);
  }
}
