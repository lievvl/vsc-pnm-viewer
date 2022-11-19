import * as vscode from 'vscode';

export class PnmPreviewer implements vscode.CustomReadonlyEditorProvider<PnmDocument> {
    openCustomDocument(
        uri: vscode.Uri, 
        openContext: vscode.CustomDocumentOpenContext, 
        token: vscode.CancellationToken
    ): PnmPreviewer | Thenable<PnmDocument> 
    {
        throw new Error('Method not implemented.');
    }
    resolveCustomEditor(
        document: PnmDocument, 
        webviewPanel: vscode.WebviewPanel, 
        token: vscode.CancellationToken
    ): void | Thenable<void> 
    {
        throw new Error('Method not implemented.');
    }

}

class PnmDocument 
    extends vscode.Disposable
    implements vscode.CustomDocument 
{
    readonly uri: vscode.Uri;
    private _image: Uint8Array;

    private static async readFile(uri: vscode.Uri) {
        return vscode.workspace.fs.readFile(uri);
    }

    static async create(uri: vscode.Uri) {
        const fileData = await PnmDocument.readFile(uri);
        return new PnmDocument(uri, fileData);
    }

    private constructor(uri: vscode.Uri, image: Uint8Array) {
        super(() => {});
        this.uri = uri;
        this._image = image;
    }

    public get getRawImage() {
        return this._image;
    }
    
    public get getParsedImage() {
        return parse.parseByteFormat(this.getDocumentData);
    }
    
    dispose(): void {
        super.dispose();
    }

}