import React from 'react'
import RepoListItem from './RepoListItem'
import { Grid } from '@mui/material'
import useLocalStorageFavouritesContext from './useLocalStorageFavouritesContext'

const LoadingState: React.FC = () => {
	return <p>Loading...</p>
}

const FavouritesTab = () => {
	const { favourites } = useLocalStorageFavouritesContext()

	return (
		<Grid container gap={2}>
			{!favourites ? (
				<LoadingState />
			) : favourites?.size === 0 ? (
				<p>You have no favourite repos at the moment</p>
			) : (
				[...favourites].map(([_, repo]) => (
					<RepoListItem key={repo.id} item={repo} />
				))
			)}
		</Grid>
	)
}

export default FavouritesTab
