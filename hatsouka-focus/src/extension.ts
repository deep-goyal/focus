import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "hatsouka-focus" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "hatsouka-focus.helloWorld",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);

      vscode.window
        .showInputBox({ prompt: "Add your annotation" })
        .then((annotation) => {
          if (annotation) {
            const decorationType = vscode.window.createTextEditorDecorationType(
              {
                backgroundColor: "rgba(255, 255, 0, 0.2)",
                border: "1px solid yellow",
                isWholeLine: false,
              }
            );

            const decoration = { range: selection, hoverMessage: annotation };
            editor.setDecorations(decorationType, [decoration]);
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
