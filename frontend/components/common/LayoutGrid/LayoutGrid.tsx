import { ReactNode } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	children: ReactNode;
};

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(24, minmax(0, 1fr));
	grid-column-gap: ${pxToRem(24)};
	align-items: start;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-template-columns: repeat(8, minmax(0, 1fr));
		grid-column-gap: ${pxToRem(24)};
	}
`;

const LayoutGrid = (props: Props) => (
	<Grid className="layout-grid">{props.children}</Grid>
);

export default LayoutGrid;
