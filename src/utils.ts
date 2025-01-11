import sharp from 'sharp'
import { USER_AGENT } from './config'

/**
 * Fetches an image from the given URL and converts it to a base64-encoded string.
 *
 * @param url - The URL of the image to fetch.
 * @returns A promise that resolves to a base64-encoded string representation of the image.
 */
export async function getbase64Image(url: string) {
	const response = await fetch(url, {
		headers: {
			'User-Agent': USER_AGENT,
		},
	})
	const contentType = response.headers.get('content-type') || 'image/png'
	const buffer = await response.arrayBuffer()
	return `data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`
}

/**
 * Converts an SVG string to a PNG buffer.
 *
 * @param SVG - The SVG string to be converted.
 * @returns A promise that resolves to a buffer containing the PNG image.
 */
export async function generatePNGFromSVG(SVG: string) {
	const svgBuffer = Buffer.from(SVG)
	const pngBuffer = await sharp(svgBuffer).png().toBuffer()

	return pngBuffer
}
