import { getRedesignShellProps } from '../lib/redesign/shell';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { SiteSettingsType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { siteSettingsQueryString } from '../lib/sanityQueries';
import HomeLanding from '../components/redesign/HomeLanding';
import HomeSections from '../components/redesign/HomeSections';
import { getRedesignData } from '../lib/redesign/server';
import type { HomePageV2, RedesignSettings } from '../lib/redesign/types';

const PageWrapper = styled(motion.div)``;

type Props = {
	home: HomePageV2 | null;
	redesignSettings: RedesignSettings | null;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { home, redesignSettings, pageTransitionVariants } = props;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial={false}
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={home?.seo?.title || 'Otherness'}
				description={home?.seo?.description || ''}
			/>
			<HomeLanding home={home} />
			<HomeSections home={home} settings={redesignSettings} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const redesign = await getRedesignData();
	const siteSettings = await client.fetch(siteSettingsQueryString);

	return {
		props: {
			...(await getRedesignShellProps()),
			home: redesign.home,
			siteSettings
		}
	};
}

export default Page;
