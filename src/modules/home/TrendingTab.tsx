import { QueryFunction, useQuery } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'
import RepoListItem from './RepoListItem'
import { GetReposResponse } from './types'
import {
	Grid,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from '@mui/material'

const ErrorState: React.FC = () => {
	return <p>Something went wrong, please try reloading the page!</p>
}

const LoadingState: React.FC = () => {
	return <p>Loading...</p>
}

const sevenDaysMilliseconds = 7 * 24 * 60 * 60 * 1000
const sevenDaysAgo = new Date(Date.now() - sevenDaysMilliseconds)
	.toISOString()
	.slice(0, 10) // get YYYY-MM-DD first 10 elements

const URL = `https:/api.github.com/search/repositories?
q=created:>=${sevenDaysAgo}&sort=stars&order=desc`

const getRepos: QueryFunction<GetReposResponse> = async () => {
	const res = await fetch(URL)
	return res.json()
}

const TrendingTab = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['repos'],
		queryFn: getRepos
	})
	const [currentLanguage, setCurrentLanguage] = useState('All')

	const availableLanguages = useMemo(
		() => [
			...(data?.items.reduce((acc, repo) => {
				if (repo.language) acc.add(repo.language)
				return acc
			}, new Set<string>()) ?? [])
		],
		[data]
	)

	const onLanguageSelect = (e: SelectChangeEvent) => {
		setCurrentLanguage(e.target.value)
	}

	const filteredRepos =
		currentLanguage === 'All'
			? data?.items
			: data?.items.filter(repo => repo.language === currentLanguage)

	return error ? (
		<ErrorState />
	) : isLoading ? (
		<LoadingState />
	) : (
		<Grid container gap={2}>
			<FormControl fullWidth sx={{ maxWidth: 400 }}>
				<InputLabel id='trending-repo-language-filter'>Language</InputLabel>
				<Select
					labelId='trending-repo-language-filter'
					value={currentLanguage}
					label='Language'
					onChange={onLanguageSelect}>
					<MenuItem value='All'>All</MenuItem>
					{availableLanguages.map((language, i) => (
						<MenuItem key={i} value={language}>
							{language}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{filteredRepos?.map(repo => (
				<RepoListItem key={repo.id} item={repo} />
			))}
		</Grid>
	)
}

export default TrendingTab
