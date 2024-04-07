import styled from 'styled-components';
import { MediaType, StatisticType } from '../../../shared/types/types';
import MediaStack from '../../common/MediaStack';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

const StatisticCardWrapper = styled.div<{ $isSmall: boolean }>`
	width: 100%;
	grid-column: ${(props) => (props.$isSmall ? 'span 6' : 'span 8')};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 8;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 4;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		grid-column: 1 / -1;
	}
`;

const RatioWrapper = styled.div`
	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}

	position: relative;
`;

const Inner = styled.div``;

const MediaWrapper = styled.div``;

const ContentWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 ${pxToRem(24)};
	z-index: 1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: 0 ${pxToRem(16)};
	}
`;

const Title = styled.h1`
	color: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		font-size: ${pxToRem(86)};
		line-height: ${pxToRem(106)};
		letter-spacing: -1.72px;
		font-weight: 200;
	}
`;

const Description = styled.p`
	color: var(--colour-white);
	max-width: 70%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		max-width: 100%;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		max-width: 80%;
	}
`;

const StatisticCard = (props: StatisticType) => {
	const { statisticTitle, description, size, image, video, mediaType } =
		props;

	const mediaData: MediaType = {
		mediaType: mediaType,
		video: video,
		image: image
	};

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<StatisticCardWrapper
			$isSmall={size === 'small'}
			ref={ref}
			className={`statistic-card view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<RatioWrapper>
				<Inner>
					<MediaWrapper>
						<MediaStack data={mediaData} />
					</MediaWrapper>
					<ContentWrapper>
						{statisticTitle && <Title>{statisticTitle}</Title>}
						{description && (
							<Description className="type-secondary-heading-small">
								{description}
							</Description>
						)}
					</ContentWrapper>
				</Inner>
			</RatioWrapper>
		</StatisticCardWrapper>
	);
};

export default StatisticCard;
