import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ProjectCard from '../ProjectCard';
import { AnimatePresence, motion } from 'framer-motion';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: ProjectType[];
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

const ListWrapper = styled.div`
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

const ProjectsList = ({ data }: Props) => (
	<AnimatePresence>
		<ProjectsListWrapper
			variants={wrapperVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<ListWrapper>
				<LayoutWrapper useGalleryLayout>
					{data.length === 0 && <Title>No projects found...</Title>}
					<LayoutGrid useGalleryGrid>
						{data.map((item, i) => (
							<ProjectCard
								key={i}
								title={item?.title}
								tagline={item?.tagline}
								thumbnailMedia={item?.thumbnailMedia}
								slug={item?.slug}
								isLarge={i < 6 ? i % 6 === 4 : i % 6 === 5}
								isPriority={i <= 1}
							/>
						))}
					</LayoutGrid>
				</LayoutWrapper>
			</ListWrapper>
		</ProjectsListWrapper>
	</AnimatePresence>
);

export default ProjectsList;
