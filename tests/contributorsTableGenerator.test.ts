import { describe, it, expect } from 'bun:test'
import { generateContributorsTable } from '../src'
import sampleContributor from '../samples/sampleContributor'

// Only one contributor
const contributors = [sampleContributor]

const sampleParams = {
	ssr: false,
	width: 40,
}

describe('generateContributorsTable', () => {
	it('should generate SVG with correct dimensions and attributes', async () => {
		const result = await generateContributorsTable(contributors, sampleParams)
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
			Array(5).fill(contributors[0]),
			sampleParams,
		)) as string
		expect(result.match(/<title>contributor<\/title>/g)?.length).toBe(5)
	})

	it('should throw an error if there are no contributors', () => {
		expect(generateContributorsTable([])).rejects.toThrow(Error)
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
