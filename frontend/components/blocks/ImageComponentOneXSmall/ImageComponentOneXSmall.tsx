import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import getThreePositionGridColumn from '../../../utils/getThreePositionGridColumn';

type Props = {
	imageComponentOneXSmall: any;
};

const ImageComponentOneXSmallWrapper = styled.section``;

const XSmallWrapper = styled.div<{ $gridColumn: string }>`
	grid-column: ${(props) => props.$gridColumn};

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

	return (
		<ImageComponentOneXSmallWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<XSmallWrapper $gridColumn={gridColumn}>
						<MediaStack data={mediaData} />
					</XSmallWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneXSmallWrapper>
	);
};

export default ImageComponentOneXSmall;
