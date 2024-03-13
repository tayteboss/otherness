import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { TransitionsType, WhatToExpectType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { whatToExpectQueryString } from '../lib/sanityQueries';

const PageWrapper = styled(motion.div)``;

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
			What to expect
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(whatToExpectQueryString);

	return {
		props: {
			data
		}
	};
}

export default Page;
