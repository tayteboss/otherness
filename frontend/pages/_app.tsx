import '../styles/fonts.css';
import '../styles/redesign-fonts.css';
import { DefaultSeo } from 'next-seo';
import type { RedesignSettings } from '../lib/redesign/types';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import { GoogleTagManager } from '@next/third-parties/google';
import { ConsultationEmbed } from '../components/redesign/ConsultationLink';
import Layout from '../components/layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import use1vh from '../hooks/use1vh';
import { TransitionsType } from '../shared/types/types';
import useHeaderHeight from '../hooks/useHeaderHeight';
import Head from 'next/head';

const pageTransitionVariants: TransitionsType = {
	// Shared Layout owns the fade; keep legacy page bodies unchanged.
	hidden: { opacity: 1, transition: { duration: 0 } },
	visible: { opacity: 1, transition: { duration: 0 } }
};

type Props = {
	Component: any;
	pageProps: {
		redesignSettings?: RedesignSettings | null;
		redesignOrigin?: string;
	};
};

const App = (props: Props) => {
	const { Component, pageProps } = props;

	const router = useRouter();
	const routePath = router.asPath.split(/[?#]/)[0];

	const handleExitComplete = (): void => {
		window.scrollTo(0, 0);
	};

	use1vh();
	useHeaderHeight();

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
				description={
					pageProps.redesignSettings?.seo?.description || undefined
				}
				openGraph={{
					site_name: 'Otherness',
					images: [
						{
							url: `${
								pageProps.redesignOrigin ||
								process.env.NEXT_PUBLIC_REDESIGN_ORIGIN
							}/redesign/brand/og.jpg`,
							width: 1200,
							height: 630,
							alt: 'Otherness'
						}
					]
				}}
			/>
			<GlobalStyles />
			<GoogleTagManager gtmId="G-5TXD8TLXKY" />
			<ThemeProvider theme={theme}>
				<ReactLenis root>
					<AnimatePresence
						mode="wait"
						initial={false}
						onExitComplete={handleExitComplete}
					>
						<Layout
							key={routePath}
							routePath={routePath}
							settings={pageProps.redesignSettings || null}
						>
							<Component
								{...pageProps}
								pageTransitionVariants={pageTransitionVariants}
							/>
						</Layout>
					</AnimatePresence>
					<ConsultationEmbed />
				</ReactLenis>
			</ThemeProvider>
		</>
	);
};

export default App;
