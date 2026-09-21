import { getRedesignShellProps } from '../lib/redesign/shell';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	HomePageType,
	SiteSettingsType,
	TransitionsType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import {
	homePageQueryString,
	siteSettingsQueryString
} from '../lib/sanityQueries';
import HomeHero from '../components/blocks/HomeHero';
import HomeSections from '../components/redesign/HomeSections';
import { getRedesignData } from '../lib/redesign/server';
import type { HomePageV2, RedesignSettings } from '../lib/redesign/types';

const PageWrapper = styled(motion.div)``;

type Props = {
	data: HomePageType;
	home: HomePageV2 | null;
	redesignSettings: RedesignSettings | null;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, home, redesignSettings, pageTransitionVariants } = props;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={home?.seo?.title || 'Otherness'}
				description={home?.seo?.description || ''}
			/>
			<HomeHero
				title={data?.heroTitle}
				mobileTitle={data?.mobileHeroTitle}
				description={data?.heroDescription}
				mobileDescription={data?.mobileHeroDescription}
				media={data?.heroMedia}
				link={data?.heroLink}
			/>
			<HomeSections home={home} settings={redesignSettings} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const redesign = await getRedesignData();
	const siteSettings = await client.fetch(siteSettingsQueryString);
	let data = await client.fetch(homePageQueryString);

	data = data[0];

	return {
		props: {
			...(await getRedesignShellProps()),
			home: redesign.home,
			data,
			siteSettings
		}
	};
}

export default Page;
