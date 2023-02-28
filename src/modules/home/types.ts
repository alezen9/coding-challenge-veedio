export type GithubRepoItem = {
	id: number
	full_name: string
	name: string
	html_url: string
	stargazers_count: number
	description: string
	language?: string
	created_at: string
}

export type GetReposResponse = {
	total_count: number
	items: GithubRepoItem[]
}