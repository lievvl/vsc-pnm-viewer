import * as vscode from "vscode";
import * as path from "path";

const generateHTMLCanvas = (
  data: string,
  width: number,
  height: number,
): string => {
  const styles = {
    canvas: `padding: 0;
            margin: auto;
            display: block;`
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div id="canvas-container" style="overflow: auto">
            <canvas width="${width}" height="${height}" id="canvas-area" style="${styles.canvas}"></canvas>
        </div>
    </body>
        <script>
          const jsonStr = '${data}';
          let message = JSON.parse(jsonStr);
          const canvas = document.getElementById('canvas-area');

          function drawCanvas(targetCanvas) {
            const { width, height, colorData } = message;
            let ctx = targetCanvas.getContext('2d');
            targetCanvas.width = width;
            targetCanvas.height = height;
            for (let x = 0; x < width; x++){
              for (let y = 0; y < height; y++){
                let color = colorData[x][y];
                ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + 1.0 + ")";
                ctx.fillRect(x, y, 1, 1);
              }
            }
          }
          drawCanvas(canvas);
        </script>
      </body>
    </html>`;
};

export default generateHTMLCanvas;