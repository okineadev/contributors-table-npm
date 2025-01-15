import { optimize } from 'svgo'

import { SVGOConfig } from './config'
import { getbase64Image, generatePNGFromSVG } from './utils'
import type { Contributor } from './types'

interface ContributorsTableParams {
	/** Horizontal spacing between avatars in pixels */
	gap?: number
	/** Width and height of each avatar in pixels */
	width?: number
	/** Number of avatars per row */
	columns?: number
	/** Number of rows */
	rows?: number
	/** Border radius of avatars in pixels or `'yes'` for full roundness (width value) */
	roundness?: number | 'yes'
	/** Width of the border around avatars in pixels */
	strokeWidth?: number
	/** Whether to use server-side rendering to fetch and embed avatars in the SVG */
	ssr?: boolean
	/** Output image type*/
	format?: 'svg' | 'png'

	/** @deprecated use `format` instead */
	type?: 'svg' | 'png'
	/** @deprecated use `strokeWidth` instead */
	borderWidth?: number
}

/**
 * Generates image containing table with contributor avatars with links to their GitHub profiles
 *
 * @param contributors - Array of contributor objects containing `login` and `avatar_url`
 * @param options - Configuration options
 *
 * @returns Promise resolving to SVG string or PNG buffer
 */
export async function generateContributorsTable<
	T extends ContributorsTableParams,
	ReturnFormat = T['format'] extends 'png' ? Buffer : string,
>(
	contributors: Contributor[],
	{
		gap = 6,
		width = 40,
		columns = 21,
		rows = 7,
		roundness = 6,
		strokeWidth = 0,
		ssr = true,
		format = 'svg',

		type = undefined,
		borderWidth = undefined,
	}: T = {} as T,
): Promise<ReturnFormat> {
	if (contributors.length === 0) {
		throw new Error('The list of contributors is empty')
	}

	strokeWidth = borderWidth ?? strokeWidth
	format = type ?? format

	const adjustedRoundness =
		typeof roundness === 'string' && roundness === 'yes' ? width : roundness

	rows = rows || Math.ceil(contributors.length / columns)
	// const actualColumns = Math.min(columns, params.contributors.length)

	const svgDimensions = {
		width: columns * width + strokeWidth + (columns - 1) * gap,
		height: rows * width + strokeWidth + (rows - 1) * gap,
	}

	let SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgDimensions.width}" height="${svgDimensions.height}">`

	const svgStyle = `
	<style>
		a {
			cursor: pointer;
		}
		a > svg {
			overflow: visible;
		}
		a > svg > rect {
			stroke: #c0c0c0;
			stroke-width: ${strokeWidth ? `${strokeWidth}px` : 0};
			width: ${width}px;
			height: ${width}px;
		}
	</style>
	`

	SVG += svgStyle

	// Sequential avatar loading
	const avatarPromises = []
	for (const contributor of contributors) {
		const avatarUrl =
			ssr || format === 'png'
				? await getbase64Image(`${contributor.avatar_url}&s=${width}`)
				: `${contributor.avatar_url}&amp;s=${width}`
		avatarPromises.push(avatarUrl)
	}

	const avatarUrls = await Promise.all(avatarPromises)

	contributors.forEach((contributor, index) => {
		const username = contributor.login
		const avatarUrl = avatarUrls[index]

		const avatarPosition = {
			x: (index % columns) * (width + gap) + strokeWidth / 2,
			y: Math.floor(index / columns) * (width + gap) + strokeWidth / 2,
		}

		SVG += `
		<a href="https://github.com/${username}">
		  <svg x="${avatarPosition.x}" y="${avatarPosition.y}">
			<title>${username}</title>
			<rect rx="${adjustedRoundness}" fill="url(#i${index})"></rect>

			<defs>
			  <pattern id="i${index}" patternUnits="userSpaceOnUse" width="${width}" height="${width}">
				<image href="${avatarUrl}" width="${width}" height="${width}"></image>
			  </pattern>
			</defs>
		  </svg>
		</a>`
	})

	SVG += '</svg>'

	if (format === 'png') {
		return generatePNGFromSVG(SVG) as ReturnFormat
	}

	return optimize(SVG, SVGOConfig).data as ReturnFormat
}
