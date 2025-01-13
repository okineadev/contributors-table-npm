import { describe, it, expect } from 'bun:test'
import { generateContributorsTable } from '../src'

const sampleContributors = [
	{
		login: 'user1',
		avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
	},
	{
		login: 'user2',
		avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
	},
]

const sampleParams = {
	contributors: sampleContributors,
	ssr: false,
	width: 40,
}

describe('generateContributorsTable', () => {
	it('should generate SVG with correct dimensions and attributes', async () => {
		const result = await generateContributorsTable(
			sampleContributors,
			sampleParams,
		)
		expect(result).toMatchSnapshot()
	})

	it('should generate PNG buffer when type is png', async () => {
		const result = await generateContributorsTable(sampleContributors, {
			...sampleParams,
			format: 'png',
		})
		expect(result).toBeInstanceOf(Buffer)
	})

	it('should throw an error if there are no contributors', () => {
		expect(generateContributorsTable([])).rejects.toThrow(Error)
	})

	it('should apply full roundness when roundness is "yes"', async () => {
		const result = await generateContributorsTable(sampleContributors, {
			...sampleParams,
			roundness: 'yes',
		})
		expect(result).toContain(`rx="${sampleParams.width}"`)
	})
})
