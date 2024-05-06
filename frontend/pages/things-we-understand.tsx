import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { ThingsWeUnderstandType, TransitionsType } from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { thingsWeUnderstandQueryString } from '../lib/sanityQueries';
import pxToRem from '../utils/pxToRem';
import UnderstandBackground from '../components/blocks/UnderstandBackground';
import UnderstandStatements from '../components/blocks/UnderstandStatements';
import { useState } from 'react';
import Orb from '../components/elements/Orb';
import UnderstandVideoBackground from '../components/blocks/UnderstandVideoBackground';

const PageWrapper = styled(motion.div)`
	min-height: 100vh;
	padding: 120vh 0 50vh;
	background: #b0927a;

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

	const [appCursorRefresh, setAppCursorRefresh] = useState<number>(0);

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
			{/* <UnderstandVideoBackground data={data?.backgroundVideo} /> */}
			<UnderstandBackground />
			{/* <UnderstandStatements data={data?.statementsAndAuthors} /> */}
			<Orb cursorRefresh={appCursorRefresh} />
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
