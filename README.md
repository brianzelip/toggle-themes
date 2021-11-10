# toggleThemes.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/brianzelip/toggle-themes)

Automate toggling between dark and light themes in VS Code editor and Hyper terminal via the command line.

## Usage

### Direct

```bash
node ~/path/to/toggleThemes.js light
```

```bash
node ~/path/to/toggleThemes.js dark
```

### Alias

Add aliases in your shell config (.bashrc, .zshrc, etc.):

```bash
alias dark='node ~/path/to/toggleThemes.js dark'
alias light='node ~/path/to/toggleThemes.js light'
```

Then in a new shell session run:

```bash
light
```

```bash
dark
```

## Themes

My preferred themes are hardcoded.

### Hyper

- [hyper-github-dark-dimmed](https://github.com/brianzelip/hyper-github-dark-dimmed)
- [hyper-github-light](https://github.com/brianzelip/hyper-github-light)

### VS Code

- [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)

## Contributing

Open a PR!

## Author

Brian Zelip, https://zelip.me

## License

GNU GPLv3
