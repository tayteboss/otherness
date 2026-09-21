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
import HomeWhatToExpect from '../components/blocks/HomeWhatToExpect';
import OurServicesBanner from '../components/blocks/OurServicesBanner';
import OthernessPageBuilder from '../components/common/OthernessPageBuilder';
import FeaturedConversations from '../components/blocks/FeaturedConversations';
import NoticedList from '../components/blocks/NoticedList';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled(motion.div)`
	.page-builder {
		margin-bottom: ${pxToRem(40)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			margin-bottom: ${pxToRem(48)};
		}
	}
`;

type Props = {
	data: HomePageType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.seoTitle || 'Otherness'}
				description={data?.seoDescription || ''}
			/>
			<HomeHero
				title={data?.heroTitle}
				mobileTitle={data?.mobileHeroTitle}
				description={data?.heroDescription}
				mobileDescription={data?.mobileHeroDescription}
				media={data?.heroMedia}
				link={data?.heroLink}
			/>
			<HomeWhatToExpect
				title={data?.whatToExpectTitle}
				content={data?.whatToExpectContent}
				button={data?.whatToExpectButton}
			/>
			<OurServicesBanner services={data?.servicesList} />
			<OthernessPageBuilder data={data?.homeBlocks} useComponent />
			<FeaturedConversations data={data?.featuredConversations} />
			<NoticedList data={data?.noticedList} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	let data = await client.fetch(homePageQueryString);

	data = data[0];

	return {
		props: {
			...(await getRedesignShellProps()),
			data,
			siteSettings
		}
	};
}

export default Page;
