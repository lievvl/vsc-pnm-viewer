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
        return this.parse();
    }

    dispose(): void {
        super.dispose();
    }

    private parse() {
        let currentByte = 0,
            len = this._image.length,
            l = 0;
        let magic = String.fromCharCode(this._image[currentByte]);
        currentByte += 1;
        let number = String.fromCharCode(this._image[currentByte]);
        currentByte += 1;
        if (magic + number !== "P6") {
            throw new Error("Wrong file magic number");
        }
        
        let widthString = "";
        currentByte += 1;
        while (true)
        {
            let inp = String.fromCharCode(this._image[currentByte]);
            currentByte += 1;
            if (!('0' <= inp && inp <= '9'))
            {
                break;
            }
            widthString += inp;
        }
        let width = Number.parseInt(widthString);

        let heightString = "";
        while (true)
        {
            let inp = String.fromCharCode(this._image[currentByte]);
            currentByte += 1;
            if (!('0' <= inp && inp <= '9'))
            {
                break;
            }
            heightString += inp;
        }
        let height = Number.parseInt(heightString);

        let maxValString = "";
        while (true)
        {
            let inp = String.fromCharCode(this._image[currentByte]);
            currentByte += 1;
            if (!('0' <= inp && inp <= '9'))
            {
                break;
            }
            maxValString += inp;
        }
        let maxVal = Number.parseInt(maxValString);

        let colorData: { r: number; g: number; b: number }[][] = [];
        const totalPixels = width * height;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = this._image[currentByte];
                currentByte += 1;
                let g = this._image[currentByte];
                currentByte += 1;
                let b = this._image[currentByte];
                currentByte += 1;
                colorData[x][y] = {
                    r: r,
                    g: g,
                    b: b
                };
            }
        }

        return {width, height, colorData};

    }

}