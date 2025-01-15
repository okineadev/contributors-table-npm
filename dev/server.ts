import sampleContributor from '../samples/sampleContributor'
import { generateContributorsTable } from '../src'

const sampleContributors = Array(100).fill(sampleContributor)

const devServer = Bun.serve({
	async fetch(req: Request): Promise<Response> {
		const url = new URL(req.url)
		const params = Object.fromEntries(url.searchParams.entries())

		const image = await generateContributorsTable(sampleContributors, {
			ssr: false,
			...params,
		})

		return new Response(image, {
			headers: {
				'Content-Type': `image/${params.format === 'svg' || params.format === undefined ? 'svg+xml' : 'png'}`,
			},
		})
	},
})

console.log(`😺 Development server running at ${devServer.url}`)
