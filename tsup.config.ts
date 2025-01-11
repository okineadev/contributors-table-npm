import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	dts: true, // Generate declaration file (.d.ts)
	bundle: true,
	minify: true,
	sourcemap: true,
	banner: { js: '// Built with tsup' },
	clean: true,
})
