import * as vscode from 'vscode';
import { FernCompletionProvider, LANGUAGES_SELECTOR } from './completion';
import { FernHoverProvider } from './hover';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      LANGUAGES_SELECTOR,
      new FernCompletionProvider(),
      '<',
      '-',
    ),
    vscode.languages.registerHoverProvider(
      LANGUAGES_SELECTOR,
      new FernHoverProvider(),
    ),
  );
}

export function deactivate(): void {}
