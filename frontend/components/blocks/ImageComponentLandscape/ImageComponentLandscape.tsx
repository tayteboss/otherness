import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentLandscape: any;
};

const ImageComponentLandscapeWrapper = styled.section``;

const LandscapeWrapper = styled.div<{ $gridColumn: string }>`
	grid-column: ${(props) => props.$gridColumn};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 62.3%;
	}
`;

const ImageComponentLandscape = (props: Props) => {
	const { imageComponentLandscape } = props;
	const { image, selectPosition, video, mediaType } = imageComponentLandscape;

	const mediaData = {
		image,
		video,
		mediaType
	};

	let gridColumn = '';

	if (selectPosition === 'left') {
		gridColumn = '1 / 17';
	} else if (selectPosition === 'right') {
		gridColumn = '-17 / -1';
	}

	return (
		<ImageComponentLandscapeWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<LandscapeWrapper $gridColumn={gridColumn}>
						<MediaStack data={mediaData} />
					</LandscapeWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentLandscapeWrapper>
	);
};

export default ImageComponentLandscape;
