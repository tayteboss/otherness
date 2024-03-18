import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	children: ReactNode;
	useGalleryGrid?: boolean;
};

const Grid = styled.div<{ $useGalleryGrid: boolean }>`
	display: grid;
	grid-template-columns: repeat(24, minmax(0, 1fr));
	grid-column-gap: ${(props) => (props.$useGalleryGrid ? '8px' : '24px')};
	align-items: start;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-template-columns: repeat(8, minmax(0, 1fr));
		grid-column-gap: ${(props) => (props.$useGalleryGrid ? '8px' : '24px')};
	}
`;

const LayoutGrid = (props: Props) => {
	const { children, useGalleryGrid = false } = props;

	return (
		<Grid className="layout-grid" $useGalleryGrid={useGalleryGrid}>
			{children}
		</Grid>
	);
};

export default LayoutGrid;
