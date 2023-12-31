// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { TreeProvider } from "./TreeProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "Timers" is now active!');

  const treeProvider = new TreeProvider();
  vscode.window.registerTreeDataProvider("timers", treeProvider);

  vscode.commands.registerCommand("timers.resetTimer", (timer) =>
    treeProvider.resetTimer(timer)
  );

  vscode.commands.registerCommand("timers.resetAll", () => {
    treeProvider.resetAll();
  });

  vscode.commands.registerCommand("timers.deleteTimer", (timer) => {
    treeProvider.deleteTimer(timer);
  });

  vscode.commands.registerCommand("timers.addTimer", () => {
    vscode.window
      .showInputBox({
        prompt: "New Timer Name:",
        placeHolder: "(new timer name)",
        validateInput: (value) =>
        /^[a-zA-Z\s]*$/.test(value)
          ? undefined
          : `${value} is not a valid timer name.`,
      })
      .then((name) => {
        vscode.window
          .showInputBox({
            prompt: "New Timer Length (mins):",
            placeHolder: "(new timer length (mins))",
            validateInput: (value) =>
              isNaN(parseInt(value))
                ? `${value} is not a valid timer length.`
                : undefined,
          })
          .then((length) => {
            treeProvider.addTimer(name as string, parseInt(length as string));
          });
      });
  });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("timers.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from timers!");
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
