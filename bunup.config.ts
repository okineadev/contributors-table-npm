import { defineConfig } from 'bunup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	dts: true, // Generate declaration file (.d.ts)
	minify: true,
	banner: '// Built with bunup',
	clean: true,
})
