import styled from 'styled-components';
import LayoutGrid from '../../common/LayoutGrid';
import LayoutWrapper from '../../common/LayoutWrapper';
import ProjectCard from '../ProjectCard';
import { ProjectCardType } from '../../../shared/types/types';

type Props = {
	homeComponentOneProject: {
		project: {
			selectSize: 'half' | 'large';
			selectPosition: 'left' | 'right';
			project: ProjectCardType;
		};
	};
};

const HomeComponentOneProjectWrapper = styled.section<{ $gridColumn: string }>`
	.project-card {
		grid-column: ${(props) => props.$gridColumn};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;

			.image-component-wrapper,
			.video-component-wrapper {
				padding-top: 142%;
			}
		}
	}
`;

const HomeComponentOneProject = (props: Props) => {
	const { homeComponentOneProject } = props;
	const { project } = homeComponentOneProject;
	const { selectSize, selectPosition } = project;
	const { title, tagline, slug, thumbnailMedia } = project.project;

	const isLarge = selectSize === 'large';
	const isRHS = selectPosition === 'right';
	let gridColumn = '';

	if (isLarge && isRHS) {
		gridColumn = '10 / -1';
	} else if (isLarge && !isRHS) {
		gridColumn = '1 / 17';
	} else if (!isLarge && isRHS) {
		gridColumn = '13 / -1';
	} else if (!isLarge && !isRHS) {
		gridColumn = '1 / 13';
	} else {
		gridColumn = '1 / 13';
	}

	return (
		<HomeComponentOneProjectWrapper $gridColumn={gridColumn}>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<ProjectCard
						title={title}
						tagline={tagline}
						thumbnailMedia={thumbnailMedia}
						slug={slug}
						isLarge={isLarge}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</HomeComponentOneProjectWrapper>
	);
};

export default HomeComponentOneProject;
