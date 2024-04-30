import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { ThingsWeUnderstandType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { thingsWeUnderstandQueryString } from '../lib/sanityQueries';
import pxToRem from '../utils/pxToRem';
import UnderstandBackground from '../components/blocks/UnderstandBackground';
import UnderstandStatements from '../components/blocks/UnderstandStatements';

const PageWrapper = styled(motion.div)`
	min-height: 100vh;
	padding-top: var(--header-h);

	.page-builder {
		padding-bottom: ${pxToRem(60)};
	}
`;

type Props = {
	data: ThingsWeUnderstandType;
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
			<UnderstandBackground />
			<UnderstandStatements data={data?.statementsAndAuthors} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	let data = await client.fetch(thingsWeUnderstandQueryString);
	data = data[0];

	return {
		props: {
			data
		}
	};
}

export default Page;
