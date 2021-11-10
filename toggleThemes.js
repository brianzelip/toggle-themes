/**
 * toggleThemes.js
 *
 * Toggle dark/light themes in VS Code and Hyper via CLI.
 *
 * Usage: `node toggleThemes.js dark` or `node toggleThemes.js light`
 * @argument {String} preference 'dark' or 'light'
 * @author Brian Zelip
 * @license GPLv3
 */
const preference = process.argv[2];

const validArgs = ['dark', 'light'];

if (!validArgs.includes(preference)) throw 'Invalid argument passed.';

const opposite = preference === validArgs[0] ? validArgs[1] : validArgs[0];

const { homedir } = require('os');
const { writeFileSync } = require('fs');
const { exec } = require('child_process');

const codeConfigPath = `${homedir()}/Library/Application Support/Code/User/settings.json`;

const code = {
  path: codeConfigPath,
  json: require(codeConfigPath),
  key: 'workbench.colorTheme',
  dark: 'GitHub Dark Dimmed',
  light: 'GitHub Light Default'
};

const hyper = {
  dark: 'hyper-github-dark-dimmed',
  light: 'hyper-github-light'
};

toggleThemes();

/**
 * @name toggleThemes
 * @description Update VS Code and Hyper settings.
 */
function toggleThemes() {
  updateCode();
  updateHyper();
}

/**
 * @name updateCode
 * @description Write over VS Code settings file.
 */
function updateCode() {
  code.json[code.key] = code[preference];
  writeFileSync(code.path, JSON.stringify(code.json, null, 2));
}

/**
 * @name updateHyper
 * @description Change Hyper plugins via its cli. Uninstalls old plugin
 * to avoid Hyper style bugs with multiple themes installed, installs
 * new plugin.
 */
function updateHyper() {
  exec(`hyper uninstall ${hyper[opposite]}`);
  exec(`hyper install ${hyper[preference]}`);
}
