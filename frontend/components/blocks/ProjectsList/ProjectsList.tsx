import styled from 'styled-components';
import {
	ButtonType,
	MediaType,
	ProjectType
} from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ProjectCard from '../ProjectCard';
import { AnimatePresence, motion } from 'framer-motion';
import CtaBanner from '../CtaBanner';
import LoadMore from '../../elements/LoadMore';

type Props = {
	data: ProjectType[];
	isLoading: boolean;
	ctaBannerTitle: string;
	ctaBannerMedia: MediaType;
	ctaBannerLink: ButtonType;
	cantLoadMore: boolean;
	handleNextProjects: () => void;
};

const ProjectsListWrapper = styled(motion.section)`
	min-height: 100vh;
`;

const Title = styled.h3`
	margin-bottom: 75vh;
`;

const FirstListWrapper = styled.div`
	.project-card {
		&:nth-child(6n + 1) {
			grid-column: 1 / 13;
		}

		&:nth-child(6n + 2) {
			grid-column: 13 / -1;
		}

		&:nth-child(6n + 3) {
			grid-column: 13 / -1;
		}

		&:nth-child(6n + 4) {
			grid-column: 1 / 13;
		}

		&:nth-child(6n + 5) {
			grid-column: 1 / 17;
		}

		&:nth-child(6n + 6) {
			grid-column: 15 / -1;
		}

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1 !important;
		}
	}
`;

const RestListWrapper = styled.div`
	.project-card {
		&:nth-child(6n + 1) {
			grid-column: 15 / -1;
		}

		&:nth-child(6n + 2) {
			grid-column: 1 / 13;
		}

		&:nth-child(6n + 3) {
			grid-column: 13 / -1;
		}

		&:nth-child(6n + 4) {
			grid-column: 13 / -1;
		}

		&:nth-child(6n + 5) {
			grid-column: 1 / 13;
		}

		&:nth-child(6n + 6) {
			grid-column: 1 / 17;
		}

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1 !important;
		}
	}
`;

const wrapperVariants = {
	hidden: {
		opacity: 0.33,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			staggerChildren: 0.1
		}
	}
};

const ProjectsList = (props: Props) => {
	const {
		data,
		isLoading,
		ctaBannerTitle,
		ctaBannerMedia,
		ctaBannerLink,
		cantLoadMore,
		handleNextProjects
	} = props ?? {};

	const first5Projects = data.slice(0, 5);
	const restOfProjects = data.slice(5);
	const hasFirst5Projects = first5Projects.length > 0;
	const hasRestOfProjects = restOfProjects.length > 0;

	return (
		<AnimatePresence>
			<ProjectsListWrapper
				variants={wrapperVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<FirstListWrapper>
					<LayoutWrapper useGalleryLayout>
						{!hasFirst5Projects && (
							<Title>No projects found...</Title>
						)}
						<LayoutGrid useGalleryGrid>
							{hasFirst5Projects &&
								first5Projects.map((item, i) => (
									<ProjectCard
										key={i}
										title={item?.title}
										tagline={item?.tagline}
										thumbnailMedia={item?.thumbnailMedia}
										slug={item?.slug}
										isLarge={i % 6 === 4}
										isPriority={i <= 1}
									/>
								))}
						</LayoutGrid>
					</LayoutWrapper>
				</FirstListWrapper>
				{!hasRestOfProjects && (
					<LoadMore
						title="Load more projects"
						handleLoadMore={handleNextProjects}
						isActive={!cantLoadMore}
					/>
				)}
				<CtaBanner
					title={ctaBannerTitle}
					media={ctaBannerMedia}
					link={ctaBannerLink}
				/>
				<RestListWrapper>
					<LayoutWrapper useGalleryLayout>
						<LayoutGrid useGalleryGrid>
							{hasRestOfProjects &&
								restOfProjects.map((item, i) => (
									<ProjectCard
										key={i}
										title={item?.title}
										tagline={item?.tagline}
										thumbnailMedia={item?.thumbnailMedia}
										slug={item?.slug}
										isLarge={i % 6 === 5}
									/>
								))}
						</LayoutGrid>
					</LayoutWrapper>
				</RestListWrapper>
				{hasRestOfProjects && (
					<LoadMore
						title={isLoading ? 'Loading' : 'Load more projects'}
						handleLoadMore={handleNextProjects}
						isActive={!cantLoadMore}
					/>
				)}
			</ProjectsListWrapper>
		</AnimatePresence>
	);
};

export default ProjectsList;
