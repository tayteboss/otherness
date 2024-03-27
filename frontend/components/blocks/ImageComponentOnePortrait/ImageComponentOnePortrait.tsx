import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type StyledProps = {
	$gridColumn: string;
	$mobileGridColumn: string;
};

type Props = {
	imageComponentOnePortrait: any;
};

const ImageComponentOnePortraitWrapper = styled.section`
	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 134.7%;
	}
`;

const PortraitWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: ${(props) => props.$mobileGridColumn};
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
	let mobileGridColumn = '';
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

	if (selectPosition === 'left') {
		gridColumn = `1 / span 4`;
	} else if (selectPosition === 'right') {
		gridColumn = `span 5 / -1`;
	} else if (selectPosition === 'middle') {
		if (isSmall) {
			gridColumn = `2 / -2`;
		} else {
			gridColumn = `1 / -1`;
		}
	}

	return (
		<ImageComponentOnePortraitWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<PortraitWrapper
						$gridColumn={gridColumn}
						$mobileGridColumn={mobileGridColumn}
					>
						<MediaStack data={mediaData} />
					</PortraitWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOnePortraitWrapper>
	);
};

export default ImageComponentOnePortrait;
