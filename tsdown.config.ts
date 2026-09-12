import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	target: "node22",
	minify: false,
	fixedExtension: false,
	deps: { onlyBundle: false },
	inputOptions: { resolve: { mainFields: ["module", "main"] } },
});
