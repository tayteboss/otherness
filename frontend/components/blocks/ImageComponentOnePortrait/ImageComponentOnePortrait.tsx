import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import getThreePositionGridColumn from '../../../utils/getThreePositionGridColumn';

type Props = {
	imageComponentOnePortrait: any;
};

const ImageComponentOnePortraitWrapper = styled.section`
	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 134.7%;
	}
`;

const PortraitWrapper = styled.div<{ $gridColumn: string }>`
	grid-column: ${(props) => props.$gridColumn};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const ImageComponentOnePortrait = (props: Props) => {
	const { imageComponentOnePortrait } = props;
	const { selectSize, selectPosition, image, video, mediaType } =
		imageComponentOnePortrait;

	const mediaData = {
		image,
		video,
		mediaType
	};

	let gridColumn = '';
	const isSmall = selectSize === 'small';
	const spanSize = isSmall ? 6 : 8;

	if (selectPosition === 'left') {
		gridColumn = `1 / span ${spanSize}`;
	} else if (selectPosition === 'right') {
		gridColumn = `span ${spanSize} / -1`;
	} else if (selectPosition === 'middle') {
		if (isSmall) {
			gridColumn = `10 / span ${spanSize}`;
		} else {
			gridColumn = `9 / span ${spanSize}`;
		}
	}

	return (
		<ImageComponentOnePortraitWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<PortraitWrapper $gridColumn={gridColumn}>
						<MediaStack data={mediaData} />
					</PortraitWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOnePortraitWrapper>
	);
};

export default ImageComponentOnePortrait;
