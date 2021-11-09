/**
 * Toggle dark/light themes in my editor and terminal via CLI.
 *
 * Usage: `toggle light`, `toggle dark`
 *
 * Editor settings change by updating `workbench.colorTheme` json key.
 *
 * Terminal settings change by uninstalling current theme, then
 * installing preferred theme.
 */
const fs = require('fs');
const os = require('os');

const preference = process.argv[2]; // accepts `light` or `dark`

const hyperConfigPath = `${os.homedir()}/.hyper.js`;
const vscConfigPath = `${os.homedir()}/Library/Application Support/Code/User/settings.json`;

const editor = {
  path: vscConfigPath,
  json: require(vscConfigPath),
  key: 'workbench.colorTheme',
  dark: 'GitHub Dark Dimmed',
  light: 'GitHub Light Default',
};

function updateVSC() {
  editor.json[editor.key] = editor[preference];
  fs.writeFileSync(editor.path, JSON.stringify(editor.json, null, 2));
}

const terminal = {
  path: hyperConfigPath,
  json: require(hyperConfigPath),
  dark: 'hyper-github-dark-dimmed',
  light: 'hyper-github-light',
};

function updateHyper() {
  const fileContents = fs.readFileSync(terminal.path, 'utf-8');
  const modString = 'module.exports = ';
  const modRE = new RegExp(modString);
  const modIndex = fileContents.match(modRE).index;
  const modStringEndIndex = modIndex + modString.length;
  const fileHeader = fileContents.slice(0, modStringEndIndex);

  terminal.json.plugins = [terminal[preference]];

  const newFileContents = fileHeader + JSON.stringify(terminal.json, null, 2);

  fs.writeFileSync(terminal.path, newFileContents);
}

updateVSC();
updateHyper();
