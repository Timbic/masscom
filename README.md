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

`masscom` loops over the subdirectories of the current directory, changes into each one, and runs the given command with the working
directory set to that subdirectory. By default only **immediate** subdirectories are visited; use `--level` to recurse deeper.

```bash
# Run tests in every subproject
masscom "npm test"

# Check git status everywhere
masscom "git status"
```

## Options

| Option          | Description                                              |
| --------------- | -------------------------------------------------------- |
| `-h`, `--help`  | Display the help message                                 |
| `-l`, `--level` | Run the command up to this many levels deep (default: 1) |

## How it works

- With `--level` (or `-l`), the walk recurses up to that many levels deep into every subdirectory tree.
- The command is executed once per directory via a shell, with the subdirectory as the working directory.
- Non-directory entries and the current directory itself are skipped.

## License

Released under the [MIT License](./LICENSE).
