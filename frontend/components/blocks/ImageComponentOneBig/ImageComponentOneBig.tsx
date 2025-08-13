import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentOneBig: any;
};

const ImageComponentOneBigWrapper = styled.section``;

const BigWrapper = styled.div<{ $gridColumn: string }>`
	grid-column: ${(props) => props.$gridColumn};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const ImageComponentOneBig = (props: Props) => {
	const { imageComponentOneBig } = props;
	const { selectPosition, image, video, mediaType } = imageComponentOneBig;

	const mediaData = {
		image,
		video,
		mediaType
	};

	let gridColumn = '';

	if (selectPosition === 'left') {
		gridColumn = '1 / span 13';
	} else if (selectPosition === 'middle') {
		gridColumn = '7 / 18';
	} else if (selectPosition === 'right') {
		gridColumn = 'span 13 / -1';
	}

	return (
		<ImageComponentOneBigWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<BigWrapper $gridColumn={gridColumn}>
						<MediaStack
							data={mediaData}
							sizes="(max-width: 768px) 100vw, 54vw"
							lazyLoad={true}
						/>
					</BigWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneBigWrapper>
	);
};

export default ImageComponentOneBig;
