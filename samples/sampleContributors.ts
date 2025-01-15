import type { Contributor } from '../src/types'

const sampleContributors: Contributor[] = []

for (let i = 1; i <= 30; i++) {
	sampleContributors.push({
		login: `contributor${i}`,
		//           https://github.com/octocat.png
		avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
	})
}

export default sampleContributors
