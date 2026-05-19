import * as vscode from 'vscode';
import { COMPONENTS, ComponentDef, buildDoc } from './components';

export const LANGUAGES_SELECTOR: vscode.DocumentSelector = [
  { scheme: 'file', language: 'mdx' },
  { scheme: 'file', language: 'markdown' },
];

function makePrefixItem(
  def: ComponentDef,
  position: vscode.Position,
  typedText: string,
): vscode.CompletionItem {
  const item = new vscode.CompletionItem(def.prefix, vscode.CompletionItemKind.Snippet);
  item.detail = def.description;
  item.insertText = new vscode.SnippetString(def.snippetBody);
  item.range = new vscode.Range(position.translate(0, -typedText.length), position);
  item.documentation = new vscode.MarkdownString(buildDoc(def), true);
  item.documentation.isTrusted = true;
  return item;
}

function makeJsxItem(
  def: ComponentDef,
  position: vscode.Position,
  document: vscode.TextDocument,
): vscode.CompletionItem {
  const item = new vscode.CompletionItem(def.name, vscode.CompletionItemKind.Snippet);
  item.detail = def.description;
  item.filterText = '<' + def.name;
  item.insertText = new vscode.SnippetString(def.snippetBody);
  // Replace the typed `<` and any auto-closed `>` VS Code inserted immediately after it
  const charAfterCursor = document.lineAt(position).text[position.character];
  const rangeEnd = charAfterCursor === '>' ? position.translate(0, 1) : position;
  item.range = new vscode.Range(position.translate(0, -1), rangeEnd);
  item.documentation = new vscode.MarkdownString(buildDoc(def), true);
  item.documentation.isTrusted = true;
  return item;
}

export class FernCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ): vscode.CompletionItem[] {
    const linePrefix = document.lineAt(position).text.substring(0, position.character);

    // fern- prefix trigger: match any partial fern- word at end of line
    const fernMatch = linePrefix.match(/fern-[\w-]*$/);
    if (fernMatch) {
      const typed = fernMatch[0];
      return COMPONENTS
        .filter(def => def.prefix.startsWith(typed))
        .map(def => makePrefixItem(def, position, typed));
    }

    // < JSX trigger
    if (context.triggerCharacter === '<' || linePrefix.endsWith('<')) {
      return COMPONENTS
        .filter(def => def.jsxForm)
        .map(def => makeJsxItem(def, position, document));
    }

    return [];
  }
}
