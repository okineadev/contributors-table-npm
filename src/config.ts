import type { Config } from 'svgo'

/**
 * Application authentication that is presented
 * with each request to the GitHub API
 */
// TODO: Find out if it is necessary
export const USER_AGENT =
	'contributors-table-generator (https://github.com/okineadev/contributors-table-npm)'

/** SVGO configuration for SVG compression */
export const SVGOConfig: Config = {
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeUnknownsAndDefaults: false,
					removeTitle: false,
				},
			},
		},
	],
}
