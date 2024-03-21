import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { EditorialBlockType } from '../../../shared/types/types';
import EditorialCard from '../EditorialCard';

type StyledProps = {
	$gridColumn: string;
};

type Props = {
	imageComponentOneEditorial: {
		editorialBlock: EditorialBlockType;
		selectPosition: 'left' | 'middle' | 'right';
	};
};

const ImageComponentOneEditorialWrapper = styled.section<StyledProps>`
	.editorial-card {
		grid-column: ${(props) => props.$gridColumn};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}
`;

const ImageComponentOneEditorial = (props: Props) => {
	const { imageComponentOneEditorial } = props;
	const { editorialBlock, selectPosition } = imageComponentOneEditorial;

	let gridColumn = '';

	if (selectPosition === 'left') {
		gridColumn = '1 / span 8';
	} else if (selectPosition === 'middle') {
		gridColumn = '9 / -9';
	} else if (selectPosition === 'right') {
		gridColumn = '-9 / span 8';
	}

	return (
		<ImageComponentOneEditorialWrapper $gridColumn={gridColumn}>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<EditorialCard
						title={editorialBlock?.title}
						description={editorialBlock?.description}
						theme={editorialBlock?.theme}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneEditorialWrapper>
	);
};

export default ImageComponentOneEditorial;
