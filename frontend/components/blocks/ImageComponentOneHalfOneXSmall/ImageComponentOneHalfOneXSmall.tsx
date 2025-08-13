import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentOneHalfOneXSmall: any;
};

const ImageComponentOneHalfOneXSmallWrapper = styled.section`
	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const HalfWrapper = styled.div`
	grid-column: span 12;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const XSmallWrapper = styled.div`
	grid-column: span 6 / -1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / 6;
	}
`;

const ImageComponentOneHalfOneXSmall = (props: Props) => {
	const { imageComponentOneHalfOneXSmall } = props;
	const { half, xSmall } = imageComponentOneHalfOneXSmall;
	const halfMediaData = {
		mediaType: half.mediaType,
		image: half.image,
		video: half.video
	};
	const xSmallMediaData = {
		mediaType: xSmall.mediaType,
		image: xSmall.image,
		video: xSmall.video
	};

	return (
		<ImageComponentOneHalfOneXSmallWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<HalfWrapper>
						<MediaStack
							data={halfMediaData}
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</HalfWrapper>
					<XSmallWrapper>
						<MediaStack
							data={xSmallMediaData}
							sizes="(max-width: 768px) 50vw, 25vw"
						/>
					</XSmallWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneHalfOneXSmallWrapper>
	);
};

export default ImageComponentOneHalfOneXSmall;
