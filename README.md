# masscom

<p>
  <a href="https://www.npmjs.com/package/masscom"><img src="https://img.shields.io/npm/v/masscom.svg?logo=nodedotjs" alt="npm package"></a>
  <a href="https://github.com/Timbic/masscom"><img src="https://img.shields.io/badge/Github-gray.svg?logo=github" alt="github repo"></a>
</p>

Run a shell command in every immediate subdirectory of the current directory.

## Install

The best way to use this package is by installing it globally

```bash
npm install -g masscom
```

## Usage

```bash
masscom [OPTION]... [COMMAND]
```

`masscom` loops over the immediate subdirectories of the current directory, changes into each one, and runs the given command with the
working directory set to that subdirectory.

```bash
# Run tests in every subproject
masscom "npm test"

# Check git status everywhere
masscom "git status"
```

## Options

| Option         | Description              |
| -------------- | ------------------------ |
| `-h`, `--help` | Display the help message |

## How it works

- Only **immediate** subdirectories are visited, the walk is not recursive. (for now...)
- The command is executed once per directory via a shell, with the subdirectory as the working directory.
- Non-directory entries and the current directory itself are skipped.

## License

Released under the [MIT License](./LICENSE).
