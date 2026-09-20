import cp from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import mri from "mri";

const helpMessage = `\
Usage: masscom [COMMAND] [OPTION]...

Run a shell command in every immediate subdirectory of the current directory.
The command runs with each subdirectory as the working directory.

Options:
  -h, --help                            display this help message
  -l, --level <number>                  run the command up to this many levels deep (default: 1)

Examples:
  masscom "npm test"
  masscom "git status" --level 2 
`;

// Arguments from cli
const args = mri<{
	help?: boolean;
	level?: string;
}>(process.argv.slice(2), {
	boolean: ["help"],
	string: ["level"],
	alias: { h: "help", l: "level" },
});

// Main function
async function init() {
	if (args.help) {
		console.log(helpMessage);
		return;
	}

	const command = String(args._[0] ?? "");
	if (!command) {
		throw new Error("No command was provided");
	}

	const parsedLevel = Number.parseInt(args.level ?? "1");
	const level = Number.isNaN(parsedLevel) ? 1 : parsedLevel;

	const cwd = process.cwd();
	function execute(cwd: string, level: number) {
		if (level < 1) return;

		for (const entry of fs.readdirSync(cwd)) {
			const full = path.join(cwd, entry);
			if (fs.statSync(full).isDirectory()) {
				try {
					process.chdir(full);
					console.log(`Running in ${full}`);

					cp.execSync(command, { stdio: "inherit" });

					execute(full, level - 1);

					process.chdir(cwd);
				} catch (e) {
					console.error(e instanceof Error ? e.message : e);
				}
			}
		}
	}

	execute(cwd, level);
}

init().catch((e) => {
	console.error(e);
});
