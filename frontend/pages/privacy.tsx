import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { privacyQueryString } from '../lib/sanityQueries';
import PageHeader from '../components/blocks/PageHeader';
import OthernessPageBuilder from '../components/common/OthernessPageBuilder';
import pxToRem from '../utils/pxToRem';

const PageWrapper = styled(motion.div)`
	min-height: 100vh;
	padding-top: var(--header-h);

	.page-builder {
		padding-top: ${pxToRem(40)};
		margin-bottom: ${pxToRem(40)};
	}
`;

type Props = {
	data: any;
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
			<PageHeader data={data?.heroTitle} />
			<OthernessPageBuilder data={data?.pageBuilder} useType />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	let data = await client.fetch(privacyQueryString);
	data = data[0];

	return {
		props: {
			data
		}
	};
}

export default Page;
