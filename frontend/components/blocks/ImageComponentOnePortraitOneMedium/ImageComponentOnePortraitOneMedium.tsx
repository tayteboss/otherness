import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';

type StyledProps = {
	$gridColumn: string;
	$isLHS?: boolean;
};

type Props = {
	imageComponentOnePortraitOneMedium: any;
};

const ImageComponentOnePortraitOneMediumWrapper = styled.section``;

const PortraitWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$isLHS ? 1 : 2)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 3;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 134.7%;
	}
`;

const MediumWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$isLHS ? 1 : 2)};
	width: 100%;
	height: 100%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 5;
	}

	* {
		height: 100%;
	}
`;

const ImageComponentOnePortraitOneMedium = (props: Props) => {
	const { imageComponentOnePortraitOneMedium } = props;
	const { portrait, medium, selectPosition } =
		imageComponentOnePortraitOneMedium;

	let portraitGridColumn = '';
	let mediumGridColumn = '';

	if (selectPosition === 'left') {
		portraitGridColumn = '7 / span 8';
		mediumGridColumn = '15 / span 10';
	} else {
		portraitGridColumn = '11 / span 8';
		mediumGridColumn = '1 / 11';
	}

	return (
		<ImageComponentOnePortraitOneMediumWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<PortraitWrapper
						$gridColumn={portraitGridColumn}
						$isLHS={selectPosition === 'left'}
					>
						<MediaStack data={portrait} />
					</PortraitWrapper>
					<MediumWrapper
						$gridColumn={mediumGridColumn}
						$isLHS={selectPosition === 'right'}
					>
						<MediaStack data={medium} />
					</MediumWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOnePortraitOneMediumWrapper>
	);
};

export default ImageComponentOnePortraitOneMedium;
