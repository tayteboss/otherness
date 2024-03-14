import styled from 'styled-components';
import client from '../../client';
import { motion } from 'framer-motion';
import {
	ProjectType,
	TransitionsType,
	WorkPageType
} from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import {
	projectsQueryString,
	workPageQueryString
} from '../../lib/sanityQueries';

const PageWrapper = styled(motion.div)``;

type Props = {
	data: WorkPageType;
	projects: ProjectType[];
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, projects, pageTransitionVariants } = props;

	console.log('data', data);
	console.log('projects', projects);

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
			Work
		</PageWrapper>
	);
};

export async function getStaticProps() {
	let data = await client.fetch(workPageQueryString);
	const projects = await client.fetch(projectsQueryString);

	data = data[0];

	return {
		props: {
			data,
			projects
		}
	};
}

export default Page;
