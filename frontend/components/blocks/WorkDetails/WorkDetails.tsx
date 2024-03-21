import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	client: string;
	collaborators: {
		title: string;
		url?: string;
	}[];
	description: string;
};

const WorkDetailsWrapper = styled.section`
	margin-bottom: ${pxToRem(104)};
`;

const ClientTitle = styled.span`
	grid-column: 4 / 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / 5;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const ClientName = styled.h4`
	grid-column: 6 / -1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 5 / -1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		font-size: ${pxToRem(20)};
		line-height: ${pxToRem(26)};
		letter-spacing: -0.2px;
		font-weight: 200;
	}
`;

const CollabsTitle = styled.span`
	grid-column: 4 / 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / 5;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const CollabsList = styled.ul`
	grid-column: 6 / 11;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 5 / 11;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(16)};
	}
`;

const Collab = styled.li``;

const CollabLink = styled.a``;

const Description = styled.p`
	grid-column: 11 / 21;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 11 / -1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;

		&.type-p-large {
			font-size: ${pxToRem(14)};
			line-height: ${pxToRem(21)};
			letter-spacing: 0.14px;
		}
	}
`;

const TopGridWrapper = styled.div`
	margin-bottom: ${pxToRem(72)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(24)};
	}

	.layout-grid {
		align-items: end;
	}
`;

const WorkDetails = (props: Props) => {
	const { client, collaborators, description } = props;

	const hasCollaborators = collaborators?.length > 0;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<WorkDetailsWrapper
			id="project-intro"
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<TopGridWrapper>
					<LayoutGrid>
						<ClientTitle className="type-secondary-heading-small">
							Client
						</ClientTitle>
						<ClientName>{client || ''}</ClientName>
					</LayoutGrid>
				</TopGridWrapper>
				<LayoutGrid>
					<CollabsTitle className="type-secondary-heading-small">
						Collabs
					</CollabsTitle>
					<CollabsList>
						{hasCollaborators &&
							collaborators.map((collab, index) =>
								collab?.url ? (
									<CollabLink
										className="type-p"
										href={collab?.url}
										target="_blank"
										key={index}
									>
										{collab?.title}
									</CollabLink>
								) : (
									<Collab className="type-p" key={index}>
										{collab?.title}
									</Collab>
								)
							)}
					</CollabsList>
					{description && (
						<Description className="type-p-large">
							{description}
						</Description>
					)}
				</LayoutGrid>
			</LayoutWrapper>
		</WorkDetailsWrapper>
	);
};

export default WorkDetails;
