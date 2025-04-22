import { describe, expect, it } from 'bun:test'
import sampleContributor from '../samples/sampleContributor'
// @ts-ignore
import { generateContributorsTable } from '../src'

// Only one contributor
const contributors = [sampleContributor]

const sampleParams = {
	ssr: false,
	width: 40,
}

describe('generateContributorsTable', () => {
	it('should generate SVG with correct dimensions and attributes', async () => {
		const result = await generateContributorsTable(
			Array(2).fill(contributors[0]),
			sampleParams,
		)
		expect(result).toMatchSnapshot()
	})

	it('should generate PNG buffer when type is png', async () => {
		const result = await generateContributorsTable(contributors, {
			...sampleParams,
			format: 'png',
		})
		expect(result).toBeInstanceOf(Buffer)
	})

	it('should render the correct number of contributors', async () => {
		const result = (await generateContributorsTable(
			Array(2).fill(contributors[0]),
			sampleParams,
		)) as string
		expect(result.match(/<title>contributor<\/title>/g)?.length).toBe(2)
	})

	it('should throw an error when the list of contributors is empty', async () => {
		expect(generateContributorsTable([], sampleParams)).rejects.toThrow(Error)
	})

	it('should render avatars on server-side when ssr is true', async () => {
		const result = await generateContributorsTable(contributors, {
			...sampleParams,
			ssr: true,
		})
		expect(result).toContain('data:image/png;base64,')
	})

	it('should apply full roundness when roundness is "yes"', async () => {
		const result = await generateContributorsTable(contributors, {
			...sampleParams,
			roundness: 'yes',
		})
		expect(result).toContain(`rx="${sampleParams.width}"`)
	})
})
