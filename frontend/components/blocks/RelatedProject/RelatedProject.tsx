import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import ArrowSvg from '../../svgs/ArrowSvg';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import { MediaType } from '../../../shared/types/types';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import MediaStack from '../../common/MediaStack';

type Props = {
	data: {
		slug: {
			current: string;
		};
		tagline: string;
		title: string;
		thumbnailMedia: MediaType;
	};
	desktopMedia: MediaType;
};

const RelatedProjectWrapper = styled.a`
	background: var(--colour-beige-light);
	padding: ${pxToRem(24)} 0 ${pxToRem(80)};
	display: block;
	position: relative;
	z-index: 5;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(24)} 0 ${pxToRem(16)};
	}
`;

const SubTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: ${pxToRem(16)};
	padding: ${pxToRem(12)} 0;
	margin-bottom: ${pxToRem(20)};
`;

const SubTitle = styled.span<{ $isActive?: boolean }>`
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;

	transform: ${(props) => props.$isActive && 'translateX(8px)'};

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const DesktopTitle = styled.span<{ $isActive?: boolean }>`
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;

	transform: ${(props) => props.$isActive && 'translateX(8px)'};

	transition: all var(--transition-speed-default) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
		display: none;
	}
`;

const ArrowWrapper = styled.div<{ $isActive: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	transform: ${(props) => props.$isActive && 'translateX(8px)'};

	transition: all var(--transition-speed-default) var(--transition-ease);

	svg {
		width: 20px;
		height: auto;
	}
`;

const MediaWrapper = styled.div<{ $isHovered: boolean }>`
	width: 100%;

	img {
		transform: ${(props) => props.$isHovered && 'scale(1.05)'};
	}

	.image-component-wrapper,
	.video-component-wrapper {
		height: ${pxToRem(560)};

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			padding-top: 134.7%;
		}
	}
`;

const MobileDetails = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
		flex-direction: column;
		gap: ${pxToRem(8)};
		padding: ${pxToRem(16)} 0 ${pxToRem(24)};
	}
`;

const DesktopWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: none;
	}
`;

const MobileWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: block;
	}
`;

const MobileTitle = styled.h4``;

const MobileTagline = styled.p``;

const RelatedProject = (props: Props) => {
	const { data, desktopMedia } = props;

	const [isHovered, setIsHovered] = useState(false);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<Link
			href={`/work/${data?.slug?.current}`}
			passHref
			legacyBehavior
			scroll={false}
		>
			<RelatedProjectWrapper
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
				ref={ref}
			>
				<LayoutWrapper>
					<SubTitleWrapper
						className={`view-element-fade-in ${
							inView ? 'view-element-fade-in--in-view' : ''
						}`}
					>
						<SubTitle>Explore Further</SubTitle>
						<ArrowWrapper $isActive={isHovered}>
							<ArrowSvg />
						</ArrowWrapper>
						<DesktopTitle $isActive={isHovered}>
							{data?.title || ''}
						</DesktopTitle>
					</SubTitleWrapper>
					<MediaWrapper $isHovered={isHovered}>
						<DesktopWrapper>
							{desktopMedia && <MediaStack data={desktopMedia} />}
						</DesktopWrapper>
						<MobileWrapper>
							{data?.thumbnailMedia && (
								<MediaStack data={data?.thumbnailMedia} />
							)}
						</MobileWrapper>
					</MediaWrapper>
					<MobileDetails>
						<MobileTitle className="type-secondary-heading-small">
							{data?.title || ''}
						</MobileTitle>
						<MobileTagline className="type-h5">
							{data?.tagline || ''}
						</MobileTagline>
					</MobileDetails>
				</LayoutWrapper>
			</RelatedProjectWrapper>
		</Link>
	);
};

export default RelatedProject;
