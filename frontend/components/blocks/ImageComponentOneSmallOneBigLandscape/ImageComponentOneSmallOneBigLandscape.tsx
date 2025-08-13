import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type StyledProps = {
	$isLHS: boolean;
	$gridColumn: string;
};

type Props = {
	imageComponentOneSmallOneBigLandscape: any;
};

const ImageComponentOneSmallOneBigLandscapeWrapper = styled.section``;

const SmallWrapper = styled.div<StyledProps>`
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

const LandscapeWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$isLHS ? 1 : 2)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 62.3%;
	}
`;

const ImageComponentOneSmallOneBigLandscape = (props: Props) => {
	const { imageComponentOneSmallOneBigLandscape } = props;
	const { landscape, small, selectPosition } =
		imageComponentOneSmallOneBigLandscape;

	let smallGridColumn = '';
	let landscapeGridColumn = '';

	if (selectPosition === 'left') {
		smallGridColumn = '1 / 7';
		landscapeGridColumn = '7 / -1';
	} else if (selectPosition === 'right') {
		smallGridColumn = '19 / -1';
		landscapeGridColumn = '1 / 19';
	}

	return (
		<ImageComponentOneSmallOneBigLandscapeWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<SmallWrapper
						$isLHS={selectPosition === 'left'}
						$gridColumn={smallGridColumn}
					>
						<MediaStack
							data={small}
							sizes="(max-width: 768px) 50vw, 25vw"
							lazyLoad={true}
						/>
					</SmallWrapper>
					<LandscapeWrapper
						$isLHS={selectPosition === 'right'}
						$gridColumn={landscapeGridColumn}
					>
						<MediaStack
							data={landscape}
							sizes="(max-width: 768px) 100vw, 75vw"
							lazyLoad={true}
						/>
					</LandscapeWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneSmallOneBigLandscapeWrapper>
	);
};

export default ImageComponentOneSmallOneBigLandscape;
