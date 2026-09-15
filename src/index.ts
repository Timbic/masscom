import cp from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import mri from "mri";

const helpMessage = `\
Usage: masscom [OPTION]... [COMMAND]

Run a shell command in every immediate subdirectory of the current directory.
The command runs with each subdirectory as the working directory.

Options:
  -h, --help                            display this help message

Examples:
  masscom "npm test"
  masscom "git status"
`;

// Arguments from cli
const args = mri<{
	help?: boolean;
}>(process.argv.slice(2), {
	boolean: ["help"],
	alias: { h: "help" },
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

	const cwd = process.cwd();
	for (const entry of fs.readdirSync(cwd)) {
		const full = path.join(cwd, entry);
		if (fs.statSync(full).isDirectory()) {
			try {
				process.chdir(full);
				console.log(`Running in ${full}`);

				cp.execSync(command, { stdio: "inherit" });
				process.chdir(cwd);
			} catch (e) {
				console.error(e);
			}
		}
	}
}

init().catch((e) => {
	console.error(e);
});
