import React, { useState } from 'react'
import { Grid, styled, Tab, Tabs } from '@mui/material'
import TrendingTab from './TrendingTab'
import FavouritesTab from './FavouritesTab'
import { LocalStorageFavouritesProvider } from './useLocalStorageFavouritesContext'

type TabPanelProps = {
	children?: React.ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			style={{ width: '100%' }}
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Grid container py={1} maxWidth={1500}>
					{children}
				</Grid>
			)}
		</div>
	)
}

const TabsWrapper = styled(Tabs, { name: 'HomeTabsWrapper' })({
	width: '100%',
	position: 'relative',
	'&:before': {
		position: 'absolute',
		content: '""',
		bottom: 0,
		width: '100%',
		height: 1,
		backgroundColor: 'hsla(0, 0%, 0%, 0.05)'
	}
})

const a11yProps = (index: number) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	}
}

const HomeContainer = () => {
	const [value, setValue] = useState(0)

	const onTabChange = (e: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Grid container gap={3} p={2}>
			<TabsWrapper
				value={value}
				onChange={onTabChange}
				aria-label='Tabs showing Trending and Favourite Github repositories'>
				<Tab label='Trending' {...a11yProps(0)} />
				<Tab label='Favourites' {...a11yProps(1)} />
			</TabsWrapper>
			<LocalStorageFavouritesProvider>
				<TabPanel value={value} index={0}>
					<TrendingTab />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<FavouritesTab />
				</TabPanel>
			</LocalStorageFavouritesProvider>
		</Grid>
	)
}

export default HomeContainer
