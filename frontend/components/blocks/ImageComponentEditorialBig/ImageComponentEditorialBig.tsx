import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import EditorialCard from '../EditorialCard';
import MediaStack from '../../common/MediaStack';

type StyledProps = {
	$gridColumn: string;
	$editorialIsLHS?: boolean;
};

type Props = {
	imageComponentEditorialBig: any;
};

const ImageComponentEditorialBigWrapper = styled.section<StyledProps>`
	.editorial-card {
		grid-column: ${(props) => props.$gridColumn};
		order: ${(props) => (props.$editorialIsLHS ? 1 : 2)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}
`;

const HalfWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$editorialIsLHS ? 2 : 1)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const ImageComponentEditorialBig = (props: Props) => {
	const { imageComponentEditorialBig } = props;
	const { editorialBlock, media, selectPosition } =
		imageComponentEditorialBig;

	let editorialGridColumn = '';
	let mediaGridColumn = '';

	if (selectPosition === 'left') {
		editorialGridColumn = '1 / span 8';
		mediaGridColumn = 'span 12 / -1';
	} else {
		editorialGridColumn = 'span 8 / -1';
		mediaGridColumn = '1 / span 12';
	}

	return (
		<ImageComponentEditorialBigWrapper
			$gridColumn={editorialGridColumn}
			$editorialIsLHS={selectPosition === 'left'}
		>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<EditorialCard
						title={editorialBlock?.title}
						description={editorialBlock?.description}
						theme={editorialBlock?.theme}
					/>
					<HalfWrapper
						$gridColumn={mediaGridColumn}
						$editorialIsLHS={selectPosition === 'left'}
					>
						<MediaStack data={media} />
					</HalfWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentEditorialBigWrapper>
	);
};

export default ImageComponentEditorialBig;
