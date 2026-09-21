import { useEffect, useState } from 'react';
import '../styles/fonts.css';
import '../styles/redesign-fonts.css';
import { DefaultSeo } from 'next-seo';
import type { RedesignSettings } from '../lib/redesign/types';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import Layout from '../components/layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import use1vh from '../hooks/use1vh';
import { TransitionsType } from '../shared/types/types';
import useHeaderHeight from '../hooks/useHeaderHeight';
import Head from 'next/head';

const pageTransitionVariants: TransitionsType = {
	hidden: { opacity: 0, transition: { duration: 0.3 } },
	visible: { opacity: 1, transition: { duration: 0.3, delay: 0.25 } }
};

type Props = {
	Component: any;
	pageProps: { redesignSettings?: RedesignSettings | null; redesignOrigin?: string };
};

const App = (props: Props) => {
	const { Component, pageProps } = props;

	const [hasVisited, setHasVisited] = useState<boolean>(false);

	const router = useRouter();
	const routerEvents = router.events;

	const handleExitComplete = (): void => {
		window.scrollTo(0, 0);
	};

	use1vh();
	useHeaderHeight();

	useEffect(() => {
		const hasCookies = Cookies.get('visited');

		if (hasCookies) {
			setHasVisited(true);
		}

		const timer = setTimeout(() => {
			Cookies.set('visited', 'true', { expires: 1, path: '' });
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<DefaultSeo
				title={pageProps.redesignSettings?.seo?.title || 'Otherness'}
				description={pageProps.redesignSettings?.seo?.description || undefined}
				openGraph={{
					site_name: 'Otherness',
					images: [{ url: `${pageProps.redesignOrigin || process.env.NEXT_PUBLIC_REDESIGN_ORIGIN}/redesign/brand/og.jpg`, width: 1200, height: 630, alt: 'Otherness' }]
				}}
			/>
			<GlobalStyles />
			<ThemeProvider theme={theme}>
				<Layout settings={pageProps.redesignSettings || null}>
					<AnimatePresence
						mode="wait"
						onExitComplete={() => handleExitComplete()}
					>
						<Component
							{...pageProps}
							key={router.pathname}
							pageTransitionVariants={pageTransitionVariants}
						/>
					</AnimatePresence>
				</Layout>
			</ThemeProvider>
		</>
	);
};

export default App;
