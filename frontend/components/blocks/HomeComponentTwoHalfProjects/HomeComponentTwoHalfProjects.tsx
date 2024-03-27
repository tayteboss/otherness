import styled from 'styled-components';
import { ProjectCardType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ProjectCard from '../ProjectCard';

type Props = {
	homeComponentTwoHalfProjects: {
		projectOne: ProjectCardType;
		projectTwo: ProjectCardType;
	};
};

const HomeComponentTwoHalfProjectsWrapper = styled.section`
	.project-card {
		grid-column: span 12;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;

			.image-component-wrapper,
			.video-component-wrapper {
				padding-top: 125%;
			}
		}
	}
`;

const HomeComponentTwoHalfProjects = (props: Props) => {
	const { homeComponentTwoHalfProjects } = props;
	const { projectOne, projectTwo } = homeComponentTwoHalfProjects;

	return (
		<HomeComponentTwoHalfProjectsWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<ProjectCard
						title={projectOne?.title}
						tagline={projectOne?.tagline}
						thumbnailMedia={projectOne?.thumbnailMedia}
						slug={projectOne?.slug}
					/>
					<ProjectCard
						title={projectTwo?.title}
						tagline={projectTwo?.tagline}
						thumbnailMedia={projectTwo?.thumbnailMedia}
						slug={projectTwo?.slug}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</HomeComponentTwoHalfProjectsWrapper>
	);
};

export default HomeComponentTwoHalfProjects;
