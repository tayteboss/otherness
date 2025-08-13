import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import getThreePositionGridColumn from '../../../utils/getThreePositionGridColumn';
import getMobileThreePositionGridColumn from '../../../utils/getMobileThreePositionGridColumn';

type StyledProps = {
	$gridColumn: string;
	$mobileGridColumn: string;
};

type Props = {
	imageComponentOneXSmall: any;
};

const ImageComponentOneXSmallWrapper = styled.section``;

const XSmallWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: ${(props) => props.$mobileGridColumn};
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const ImageComponentOneXSmall = (props: Props) => {
	const { imageComponentOneXSmall } = props;
	const { image, selectPosition, video, mediaType } = imageComponentOneXSmall;

	const mediaData = {
		image,
		video,
		mediaType
	};

	let gridColumn = getThreePositionGridColumn(selectPosition);
	let mobileGridColumn = getMobileThreePositionGridColumn(selectPosition);

	return (
		<ImageComponentOneXSmallWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<XSmallWrapper
						$gridColumn={gridColumn}
						$mobileGridColumn={mobileGridColumn}
					>
						<MediaStack
							data={mediaData}
							sizes="(max-width: 768px) 62vw, 33vw"
						/>
					</XSmallWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneXSmallWrapper>
	);
};

export default ImageComponentOneXSmall;
