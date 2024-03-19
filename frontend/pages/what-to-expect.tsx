import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { TransitionsType, WhatToExpectType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { whatToExpectQueryString } from '../lib/sanityQueries';
import PageHeader from '../components/blocks/PageHeader';
import OthernessPageBuilder from '../components/common/OthernessPageBuilder';
import ExploreFurther from '../components/blocks/ExploreFurther';

const PageWrapper = styled(motion.div)`
	min-height: 100vh;
	padding-top: var(--header-h);
`;

type Props = {
	data: WhatToExpectType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	console.log('data', data);

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
			<ExploreFurther
				title={data?.furtherReading?.title}
				pageReference={data?.furtherReading.pageReference}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	let data = await client.fetch(whatToExpectQueryString);
	data = data[0];

	return {
		props: {
			data
		}
	};
}

export default Page;
