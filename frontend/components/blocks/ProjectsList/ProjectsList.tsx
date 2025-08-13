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
import pxToRem from '../../../utils/pxToRem';

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

	.layout-grid {
		grid-row-gap: ${pxToRem(64)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-row-gap: ${pxToRem(32)};
		}
	}
`;

const Title = styled.h3`
	margin-bottom: 75vh;
`;

const FirstListWrapper = styled.div`
	.project-card {
		grid-column: span 12;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1 !important;
		}
	}
`;

const RestListWrapper = styled.div`
	.project-card {
		grid-column: span 12;

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

	const first6Projects = data.slice(0, 6);
	const restOfProjects = data.slice(6);
	const hasFirst6Projects = first6Projects.length > 0;
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
						{!hasFirst6Projects && (
							<Title>No projects found...</Title>
						)}
						<LayoutGrid useGalleryGrid>
							{hasFirst6Projects &&
								first6Projects.map((item, i) => (
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
				{/* {!hasRestOfProjects && (
					<LoadMore
						title="Load more projects"
						handleLoadMore={handleNextProjects}
						isActive={!cantLoadMore}
					/>
				)} */}
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
				{/* {hasRestOfProjects && (
					<LoadMore
						title={isLoading ? 'Loading' : 'Load more projects'}
						handleLoadMore={handleNextProjects}
						isActive={!cantLoadMore}
					/>
				)} */}
			</ProjectsListWrapper>
		</AnimatePresence>
	);
};

export default ProjectsList;
