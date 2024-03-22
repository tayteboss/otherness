import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type StyledProps = {
	$isLHS: boolean;
	$gridColumn: string;
};

type Props = {
	imageComponentOneBigOneXSmall: any;
};

const ImageComponentOneBigOneXSmallWrapper = styled.section`
	.layout-grid {
		align-items: end;
	}
`;

const BigWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$isLHS ? 1 : 2)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			padding-top: 134.7%;
		}
	}
`;

const XSmallWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$isLHS ? 1 : 2)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / 5;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const ImageComponentOneBigOneXSmall = (props: Props) => {
	const { imageComponentOneBigOneXSmall } = props;
	const { big, small, selectPosition } = imageComponentOneBigOneXSmall;

	let bigGridColumn = '';
	let smallGridColumn = '';

	if (selectPosition === 'left') {
		bigGridColumn = '1 / 13';
		smallGridColumn = '-7 / -1';
	} else if (selectPosition === 'right') {
		bigGridColumn = '-13 / -1';
		smallGridColumn = '1 / 7';
	}

	console.log('imageComponentOneBigOneXSmall', imageComponentOneBigOneXSmall);

	return (
		<ImageComponentOneBigOneXSmallWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<BigWrapper
						$gridColumn={bigGridColumn}
						$isLHS={selectPosition === 'left'}
					>
						<MediaStack data={big} />
					</BigWrapper>
					<XSmallWrapper
						$gridColumn={smallGridColumn}
						$isLHS={selectPosition === 'right'}
					>
						<MediaStack data={small} />
					</XSmallWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneBigOneXSmallWrapper>
	);
};

export default ImageComponentOneBigOneXSmall;
