import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentOneHalf: any;
};

const ImageComponentOneHalfWrapper = styled.section`
	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const HalfWrapper = styled.div<{ $gridColumn: string }>`
	grid-column: ${(props) => props.$gridColumn};
`;

const ImageComponentOneHalf = (props: Props) => {
	const { imageComponentOneHalf } = props;
	const { selectPosition, image, video, mediaType } = imageComponentOneHalf;
	const mediaData = {
		mediaType,
		image,
		video
	};
	let gridColumn = '';

	if (selectPosition === 'left') {
		gridColumn = '1 / span 12';
	} else {
		gridColumn = 'span 12 / -1';
	}

	console.log('imageComponentOneHalf', imageComponentOneHalf);

	return (
		<ImageComponentOneHalfWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<HalfWrapper $gridColumn={gridColumn}>
						<MediaStack data={mediaData} />
					</HalfWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneHalfWrapper>
	);
};

export default ImageComponentOneHalf;
