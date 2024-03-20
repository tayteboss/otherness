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
	basicProjectsQueryDefault,
	basicProjectsQueryString,
	projectsQueryDefault,
	projectsQueryString,
	workPageQueryString
} from '../../lib/sanityQueries';
import PageHeader from '../../components/blocks/PageHeader';
import { useEffect, useState } from 'react';
import FiltersBar from '../../components/blocks/FiltersBar';
import ProjectsList from '../../components/blocks/ProjectsList';

const PageWrapper = styled(motion.div)`
	padding-top: var(--header-h);
	min-height: 150vh;
`;

type Props = {
	data: WorkPageType;
	projects: ProjectType[];
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, projects, pageTransitionVariants } = props;

	const [activeMood, setActiveMood] = useState('all');
	const [activeWork, setActiveWork] = useState('all');
	const [isLoading, setIsLoading] = useState(false);
	const [fetchedProjects, setfetchedProjects] =
		useState<ProjectType[]>(projects);
	const [firstRenderCheck, setFirstRenderCheck] = useState(0);
	const [projectCount, setProjectCount] = useState(0);
	const [cantLoadMore, setCantLoadMore] = useState(false);

	// TODO:
	// PAGINATION
	// MOBILE FILTERING FRONTEND

	const projectSkip = 10;

	const handleFiltering = async (activeMood: string, activeWork: string) => {
		setIsLoading(true);

		const moodQuery =
			activeMood === 'all' ? '' : ` && "${activeMood}" in mood[]`;
		const workQuery =
			activeWork === 'all' ? '' : ` && "${activeWork}" in type[]`;

		const query = `
			*[_type == 'project'${moodQuery}${workQuery}] | order(orderRank) [0...${projectSkip}] ${basicProjectsQueryDefault}
		`;

		try {
			const data = await client.fetch(query);

			setfetchedProjects(data);

			if (data?.length < projectSkip) {
				setCantLoadMore(true);
			}

			const timer = setTimeout(() => {
				setIsLoading(false);
			}, 1000);

			return () => clearTimeout(timer);
		} catch (error) {
			console.error('Error fetching site data:', error);
			setIsLoading(false);
			return [];
		}
	};

	const handleNextProjects = async () => {
		setIsLoading(true);

		const moodQuery =
			activeMood === 'all' ? '' : ` && "${activeMood}" in mood[]`;
		const workQuery =
			activeWork === 'all' ? '' : ` && "${activeWork}" in type[]`;

		const query = `
			*[_type == 'project'${moodQuery}${workQuery}] | order(orderRank) [${projectCount}...${
			projectCount + projectSkip
		}] ${basicProjectsQueryDefault}
		`;

		try {
			const data = await client.fetch(query);

			setfetchedProjects([...fetchedProjects, ...data]);
			setProjectCount(projectCount + projectSkip);

			if (data?.length < projectSkip) {
				setCantLoadMore(true);
			}

			setIsLoading(false);
		} catch (error) {
			console.error('Error fetching site data:', error);
			setIsLoading(false);
			return [];
		}
	};

	useEffect(() => {
		if (firstRenderCheck < 1) {
			setFirstRenderCheck(firstRenderCheck + 1);
			return;
		}
		setProjectCount(0);
		handleFiltering(activeMood, activeWork);
	}, [activeMood, activeWork]);

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
			<PageHeader data={data?.heroTitle} isLoading={isLoading} />
			<FiltersBar
				setActiveMood={setActiveMood}
				setActiveWork={setActiveWork}
				activeWork={activeWork}
				activeMood={activeMood}
			/>
			<ProjectsList
				data={fetchedProjects}
				isLoading={isLoading}
				ctaBannerTitle={data?.ctaBannerTitle}
				ctaBannerMedia={data?.ctaBannerMedia}
				ctaBannerLink={data?.ctaBannerLink}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	let data = await client.fetch(workPageQueryString);
	const projects = await client.fetch(basicProjectsQueryString);

	data = data[0];

	return {
		props: {
			data,
			projects
		}
	};
}

export default Page;
