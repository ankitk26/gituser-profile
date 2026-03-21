import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react(), tailwindcss()],
	fmt: {
		$schema: "./node_modules/oxfmt/configuration_schema.json",
		useTabs: true,
		tabWidth: 4,
		printWidth: 80,
		sortImports: {
			newlinesBetween: false,
		},
		sortTailwindcss: {
			stylesheet: "./src/index.css",
			functions: ["clsx", "cn"],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
