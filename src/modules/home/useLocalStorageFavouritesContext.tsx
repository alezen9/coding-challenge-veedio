import { createContext, useContext, useEffect, useState } from 'react'
import { GithubRepoItem } from './types'

const KEY = 'github-discovery-favourites'

const isBrowser = () => typeof window !== 'undefined'

type UseLocalStorageFavouritesReturn = [
	Map<number, GithubRepoItem>,
	{
		setFavourite: (key: number, value: GithubRepoItem) => void
		removeFavourite: (key: number) => void
		clear: VoidFunction
	}
]

const useLocalStorageFavourites = (): UseLocalStorageFavouritesReturn => {
	const [state, setState] = useState<Map<number, GithubRepoItem>>(() => {
		try {
			if (!isBrowser()) return new Map()
			const item = window.localStorage.getItem(KEY)
			return item ? new Map(JSON.parse(item)) : new Map()
		} catch (error) {
			console.error(error)
			window?.localStorage.removeItem(KEY)
			return new Map()
		}
	})

	useEffect(() => {
		try {
			window.localStorage.setItem(
				KEY,
				JSON.stringify(Array.from(state.entries()))
			)
		} catch (error) {
			console.error(error)
		}
	}, [state])

	const setFavourite = (key: number, value: GithubRepoItem) => {
		setState(prevState => new Map([...prevState, [key, value]]))
	}

	const removeFavourite = (key: number) => {
		setState(prevState => {
			prevState.delete(key)
			return new Map(prevState)
		})
	}

	const clear = () => {
		setState(new Map())
	}

	return [state, { setFavourite, removeFavourite, clear }]
}

type LocalStorageFavouritesContextType = UseLocalStorageFavouritesReturn[1] & {
	favourites: UseLocalStorageFavouritesReturn[0]
}

const LocalStorageFavouritesContext = createContext<
	Partial<LocalStorageFavouritesContextType>
>({})

export const LocalStorageFavouritesProvider: React.FC<{
	children?: React.ReactNode
}> = ({ children }) => {
	const [favourites, helpers] = useLocalStorageFavourites()
	return (
		<LocalStorageFavouritesContext.Provider value={{ favourites, ...helpers }}>
			{children}
		</LocalStorageFavouritesContext.Provider>
	)
}

const useLocalStorageFavouritesContext = () =>
	useContext(LocalStorageFavouritesContext)

export default useLocalStorageFavouritesContext
