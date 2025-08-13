import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type Props = {
	imageComponentTwoXSmall: any;
};

const ImageComponentTwoXSmallWrapper = styled.section`
	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const SmallOneWrapper = styled.div<{ $gridColumn: string }>`
	grid-column: ${(props) => props.$gridColumn};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 4;
	}
`;

const SmallTwoWrapper = styled.div<{ $gridColumn: string }>`
	grid-column: ${(props) => props.$gridColumn};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 4;
	}
`;

const ImageComponentTwoXSmall = (props: Props) => {
	const { imageComponentTwoXSmall } = props;
	const { selectPosition, lhs, rhs } = imageComponentTwoXSmall;

	let lhsGridColumn = '';
	let rhsGridColumn = '';

	if (selectPosition === 'left') {
		lhsGridColumn = 'span 8';
		rhsGridColumn = 'span 8';
	} else {
		lhsGridColumn = '9 / span 8';
		rhsGridColumn = 'span 8';
	}

	return (
		<ImageComponentTwoXSmallWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<SmallOneWrapper $gridColumn={lhsGridColumn}>
						<MediaStack
							data={lhs}
							sizes="(max-width: 768px) 50vw, 33vw"
						/>
					</SmallOneWrapper>
					<SmallTwoWrapper $gridColumn={rhsGridColumn}>
						<MediaStack
							data={rhs}
							sizes="(max-width: 768px) 50vw, 33vw"
						/>
					</SmallTwoWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentTwoXSmallWrapper>
	);
};

export default ImageComponentTwoXSmall;
