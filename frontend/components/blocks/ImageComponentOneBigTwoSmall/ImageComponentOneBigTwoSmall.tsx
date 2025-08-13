import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentOneBigTwoSmall: {
		big: any;
		small1: any;
		small2: any;
	};
};

const ImageComponentOneBigTwoSmallWrapper = styled.section`
	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const BigWrapper = styled.div`
	grid-column: span 12;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const SmallOneWrapper = styled.div`
	grid-column: span 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 4;
	}
`;

const SmallTwoWrapper = styled.div`
	grid-column: span 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 4;
	}
`;

const ImageComponentOneBigTwoSmall = (props: Props) => {
	const { imageComponentOneBigTwoSmall } = props;
	const { big, small1, small2 } = imageComponentOneBigTwoSmall;

	return (
		<ImageComponentOneBigTwoSmallWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<BigWrapper>
						<MediaStack
							data={big}
							sizes="(max-width: 768px) 100vw, 50vw"
							lazyLoad={true}
						/>
					</BigWrapper>
					<SmallOneWrapper>
						<MediaStack
							data={small1}
							sizes="(max-width: 768px) 50vw, 25vw"
							lazyLoad={true}
						/>
					</SmallOneWrapper>
					<SmallTwoWrapper>
						<MediaStack
							data={small2}
							sizes="(max-width: 768px) 50vw, 25vw"
							lazyLoad={true}
						/>
					</SmallTwoWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneBigTwoSmallWrapper>
	);
};

export default ImageComponentOneBigTwoSmall;
