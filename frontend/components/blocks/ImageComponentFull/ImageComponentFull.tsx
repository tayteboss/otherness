import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentFull: any;
};

const ImageComponentFullWrapper = styled.section``;

const FullWrapper = styled.div`
	grid-column: 1 / -1;

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 56.25%;
	}
`;

const ImageComponentFull = (props: Props) => {
	const { imageComponentFull } = props;
	const { image, video, mediaType } = imageComponentFull;
	const mediaData = {
		image,
		video,
		mediaType
	};

	return (
		<ImageComponentFullWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<FullWrapper>
						<MediaStack data={mediaData} />
					</FullWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentFullWrapper>
	);
};

export default ImageComponentFull;
