import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentTwoHalf: any;
};

const ImageComponentTwoHalfWrapper = styled.section``;

const HalfWrapper = styled.div`
	grid-column: span 12;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const ImageComponentTwoHalf = (props: Props) => {
	const { imageComponentTwoHalf } = props;
	const { lhs, rhs } = imageComponentTwoHalf;

	return (
		<ImageComponentTwoHalfWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<HalfWrapper>
						<MediaStack
							data={lhs}
							sizes="(max-width: 768px) 100vw, 50vw"
							lazyLoad={true}
						/>
					</HalfWrapper>
					<HalfWrapper>
						<MediaStack
							data={rhs}
							sizes="(max-width: 768px) 100vw, 50vw"
							lazyLoad={true}
						/>
					</HalfWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentTwoHalfWrapper>
	);
};

export default ImageComponentTwoHalf;
