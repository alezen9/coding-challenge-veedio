import React from 'react'
import { GithubRepoItem } from './types'
import { Grid, IconButton, styled } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarIcon from '@mui/icons-material/Star'
import useLocalStorageFavouritesContext from './useLocalStorageFavouritesContext'

const Wrapper = styled(Grid, { name: 'RepoListItemWrapper' })({
	border: '1px solid hsla(0, 0%, 0%, .1)',
	padding: '.5em'
})

type Props = {
	item: GithubRepoItem
}

const RepoListItem: React.FC<Props> = ({ item }) => {
	const { favourites, setFavourite, removeFavourite } =
		useLocalStorageFavouritesContext()

	const isFavourite = favourites?.has(item.id)

	const onFavouriteClick = () => {
		if (isFavourite) removeFavourite?.(item.id)
		else setFavourite?.(item.id, item)
	}

	const count = item.stargazers_count + (isFavourite ? 1 : 0)

	return (
		<Wrapper container wrap='nowrap' data-test='repo-item'>
			<Grid
				container
				direction='column'
				justifyContent='space-between'
				gap={1}
				py={1}>
				<a href={item.html_url}>
					<h3 data-test='repo-item-name'>{item.name}</h3>
				</a>
				<p>{item.description || <i>No description</i>}</p>
				<p>{item.language || <i>Unknown language</i>}</p>
			</Grid>
			<Grid
				item
				container
				direction='column'
				alignItems='center'
				justifyContent='start'
				gap={1}
				xs='auto'>
				<IconButton
					onClick={onFavouriteClick}
					data-test='repo-item-star-button'>
					{isFavourite ? (
						<StarIcon color='warning' />
					) : (
						<StarBorderOutlinedIcon />
					)}
				</IconButton>
				<h3 data-test='repo-item-stars'>{count}</h3>
			</Grid>
		</Wrapper>
	)
}

export default RepoListItem
