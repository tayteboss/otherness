import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import FilterTab from '../../elements/FilterTab';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	setActiveMood: (value: string) => void;
	activeMood: string;
};

const Inner = styled.div`
	padding: ${pxToRem(48)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(32)} 0 ${pxToRem(40)};
	}
`;

const moodFilters = [
	'all',
	'artsy',
	'bookish',
	'cheeky',
	'luxxy',
	'technical',
	'professh',
	'vivacious'
];

const FiltersBar = ({ setActiveMood, activeMood }: Props) => (
	<section aria-label="Filter projects by mood">
		<LayoutWrapper>
			<Inner>
				<FilterTab
					filters={moodFilters}
					setActiveMood={setActiveMood}
					activeMood={activeMood}
				/>
			</Inner>
		</LayoutWrapper>
	</section>
);

export default FiltersBar;
