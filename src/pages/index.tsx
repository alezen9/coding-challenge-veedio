import Head from 'next/head'
import HomeContainer from '@/modules/home'

const Home = () => {
	return (
		<>
			<Head>
				<title>Github trending repos</title>
				<meta
					name='description'
					content='Discover trending repositories on Github'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<HomeContainer />
		</>
	)
}

export default Home
