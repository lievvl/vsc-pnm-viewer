import * as vscode from 'vscode';
import { PnmProvider } from './pnm-preview';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vsc-pnm-viewer" is now active!');
	let disposable = vscode.commands.registerCommand('vsc-pnm-viewer.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from VSC pnm viewer!');
	});
	context.subscriptions.push(PnmProvider.register(context));
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
