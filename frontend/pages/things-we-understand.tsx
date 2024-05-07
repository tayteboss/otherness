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
import LogoIconSvg from '../components/svgs/LogoIconSvg';

const PageWrapper = styled(motion.div)`
	min-height: 100vh;
	padding: 75vh 0 30vh;
	background: #b0927a;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: 95vh 0 30vh;
	}

	.page-builder {
		padding-bottom: ${pxToRem(60)};
	}
`;

const LogoWrapper = styled.div`
	position: absolute;
	top: 25vh;
	height: 50vh;
	width: 100%;
	z-index: 2;
	pointer-events: none;
	mix-blend-mode: overlay;
	opacity: 0.5;

	svg {
		height: 100%;
		width: 100%;
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
			<UnderstandStatements data={data?.statementsAndAuthors} />
			<Orb cursorRefresh={appCursorRefresh} />
			{/* <LogoWrapper>
				<LogoIconSvg colour="white" />
			</LogoWrapper> */}
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
