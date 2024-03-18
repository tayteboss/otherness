import styled from 'styled-components';
import { ProjectCardType } from '../../../shared/types/types';
import MediaStack from '../../common/MediaStack';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const ProjectCardWrapper = styled.a`
	width: 100%;

	&:hover {
		img,
		mux-player {
			transform: scale(1.05);
		}
	}
`;

const MediaWrapper = styled.div`
	.video-component-wrapper,
	.image-component-wrapper {
		padding-top: 87%;
	}
`;

const ContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: ${pxToRem(16)} 0 ${pxToRem(24)};
`;

const Title = styled.h4`
	width: 30%;
	padding-right: ${pxToRem(8)};
`;

const Tagline = styled.h5`
	width: 70%;
`;

const ProjectCard = (props: ProjectCardType) => {
	const { title, tagline, thumbnailMedia, slug } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<Link
			href={`/work/${slug?.current}`}
			passHref
			legacyBehavior
			scroll={false}
		>
			<ProjectCardWrapper
				className={`project-card view-element-fade-in ${
					inView ? 'view-element-fade-in--in-view' : ''
				}`}
				ref={ref}
			>
				<MediaWrapper>
					<MediaStack data={thumbnailMedia} />
				</MediaWrapper>
				<ContentWrapper>
					<Title className="type-secondary-heading-small">
						{title || ''}
					</Title>
					<Tagline>{tagline || ''}</Tagline>
				</ContentWrapper>
			</ProjectCardWrapper>
		</Link>
	);
};

export default ProjectCard;
