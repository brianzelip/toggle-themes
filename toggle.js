/**
 * @name toggle.js
 * @description Toggle dark/light themes in vscode and hyper via CLI.
 * @argument {String} preference 'light' or 'dark'
 *
 * Usage: `node toggle.js light` or `node toggle.js dark`.
 */
const preference = process.argv[2];

const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

const vscConfigPath = `${os.homedir()}/Library/Application Support/Code/User/settings.json`;

const editor = {
  path: vscConfigPath,
  json: require(vscConfigPath),
  key: 'workbench.colorTheme',
  dark: 'GitHub Dark Dimmed',
  light: 'GitHub Light Default'
};

const terminal = {
  dark: 'hyper-github-dark-dimmed',
  light: 'hyper-github-light'
};

main();

/**
 * @name main
 * @description Update editor and terminal settings.
 */
function main() {
  updateVSC();
  updateHyper();
}

/**
 * @name updateVSC
 * @description Change editor settings file.
 */
function updateVSC() {
  editor.json[editor.key] = editor[preference];
  fs.writeFileSync(editor.path, JSON.stringify(editor.json, null, 2));
}

/**
 * @name updateHyper
 * @description Change terminal settings via cli.
 */
function updateHyper() {
  if (preference === 'dark') {
    uninstall('light');
    install('dark');
  } else if (preference === 'light') {
    uninstall('dark');
    install('light');
  }

  /**
   * @name uninstall
   * @description Uninstall a hyper plugin
   * @param {String} mode 'light' or 'dark'
   */
  function uninstall(mode) {
    exec(`hyper uninstall ${terminal[mode]}`);
  }
  /**
   * @name install
   * @description Install a hyper plugin
   * @param {String} mode 'light' or 'dark'
   */
  function install(mode) {
    exec(`hyper install ${terminal[mode]}`);
  }
}
