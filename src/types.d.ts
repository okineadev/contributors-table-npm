import type { Endpoints } from '@octokit/types'

export type Contributor = Omit<
	Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data'][number],
	'login' | 'url' | 'type' | 'contributions'
> & {
	login: string
	avatar_url: string
}

// // Question: https://stackoverflow.com/q/56006111/21165921
// // Answer: https://stackoverflow.com/a/56006703/21165921
// export type NonEmptyArray<T> = [T, ...T[]]
