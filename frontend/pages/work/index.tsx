import { getRedesignShellProps } from '../../lib/redesign/shell';
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
	overflowProjectsQueryString,
	workPageQueryString
} from '../../lib/sanityQueries';
import PageHeader from '../../components/blocks/PageHeader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FiltersBar from '../../components/blocks/FiltersBar';
import ProjectsList from '../../components/blocks/ProjectsList';
import LoadMore from '../../components/elements/LoadMore';
import pxToRem from '../../utils/pxToRem';

const PageWrapper = styled(motion.div)`
	padding-top: var(--header-h);
	min-height: 150vh;
	padding-bottom: ${pxToRem(80)};
	background: var(--colour-white);
`;

type Props = {
	data: WorkPageType;
	projects: ProjectType[];
	pageTransitionVariants: TransitionsType;
	hasMoreProject: boolean;
};

const Page = (props: Props) => {
	const { data, projects, pageTransitionVariants, hasMoreProject } = props;

	const projectSkip = 20;

	const router = useRouter();

	const [activeMood, setActiveMood] = useState('all');
	const [isLoading, setIsLoading] = useState(false);
	const [fetchedProjects, setfetchedProjects] =
		useState<ProjectType[]>(projects);
	const [hasReadInitialQuery, setHasReadInitialQuery] = useState(false);
	const [projectCount, setProjectCount] = useState(projectSkip);
	const [cantLoadMore, setCantLoadMore] = useState(!hasMoreProject);

	const handleFiltering = async (activeMood: string) => {
		setIsLoading(true);

		const moodQuery =
			activeMood === 'all' ? '' : ' && $mood in mood[]';

		const query = `
			*[_type == 'project' && archiveProject != true${moodQuery}] | order(orderRank) [0...${projectSkip}] {
				${basicProjectsQueryDefault}
			}
		`;

		const moreProjectsQuery = `
			*[_type == 'project' && archiveProject != true${moodQuery}] | order(orderRank) [${projectSkip}...${
			projectSkip + 1
		}] {
				${basicProjectsQueryDefault}
			}
		`;

		try {
			const data = await client.fetch(query, { mood: activeMood });
			const moreData = await client.fetch(moreProjectsQuery, {
				mood: activeMood
			});

			console.log('data', data);

			setfetchedProjects(data);
			setProjectCount(projectCount + projectSkip);

			if (moreData.length === 0) {
				setCantLoadMore(true);
			} else {
				setCantLoadMore(false);
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
			activeMood === 'all' ? '' : ' && $mood in mood[]';

		const query = `
			*[_type == 'project' && archiveProject != true${moodQuery}] | order(orderRank) [${projectCount}...${
			projectCount + projectSkip
		}] {
				${basicProjectsQueryDefault}
			}
		`;
		const moreProjectsQuery = `
			*[_type == 'project' && archiveProject != true${moodQuery}] | order(orderRank) [${
			projectCount + projectSkip
		}...${projectCount + projectSkip + 1}] {
				${basicProjectsQueryDefault}
			}
		`;

		try {
			const data = await client.fetch(query, { mood: activeMood });
			const moreData = await client.fetch(moreProjectsQuery, {
				mood: activeMood
			});

			setfetchedProjects([...fetchedProjects, ...data]);
			setProjectCount(projectCount + projectSkip);

			if (moreData.length === 0) {
				setCantLoadMore(true);
			} else {
				setCantLoadMore(false);
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

	// Read query params on initial load and set filters accordingly
	useEffect(() => {
		if (!router.isReady) return;

		const { mood } = router.query;
		const moodParam = typeof mood === 'string' ? mood : undefined;

		if (moodParam && moodParam !== activeMood) {
			setActiveMood(moodParam);
		}

		setHasReadInitialQuery(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady]);

	useEffect(() => {
		if (!hasReadInitialQuery) return;

		const currentMood =
			typeof router.query.mood === 'string'
				? router.query.mood
				: undefined;
		const currentType =
			typeof router.query.type === 'string'
				? router.query.type
				: undefined;

		const nextQuery: Record<string, string> = {};
		if (activeMood !== 'all') nextQuery.mood = activeMood;

		const currentQueryFiltered: Record<string, string> = {};
		if (currentMood) currentQueryFiltered.mood = currentMood;
		if (currentType) currentQueryFiltered.type = currentType;

		const queriesDiffer =
			JSON.stringify(currentQueryFiltered) !== JSON.stringify(nextQuery);

		if (queriesDiffer) {
			router.replace(
				{ pathname: router.pathname, query: nextQuery },
				undefined,
				{ shallow: true }
			);
		}

		const hasFilters = activeMood !== 'all';
		const hasQueryParams = Boolean(currentMood || currentType);

		// Avoid redundant fetch on initial load when there are no filters
		if (!hasFilters && !hasQueryParams) {
			return;
		}

		setProjectCount(0);
		handleFiltering(activeMood);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMood, hasReadInitialQuery]);

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
				activeMood={activeMood}
			/>
			<ProjectsList data={fetchedProjects} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	let data = await client.fetch(workPageQueryString);
	const projects = await client.fetch(basicProjectsQueryString);
	const overflowProjects = await client.fetch(overflowProjectsQueryString);
	const hasMoreProject = overflowProjects.length > 0;

	data = data[0];

	return {
		props: {
			...(await getRedesignShellProps()),
			data,
			projects,
			hasMoreProject
		}
	};
}

export default Page;
