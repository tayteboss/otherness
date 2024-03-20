import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import FilterTab from '../../elements/FilterTab';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	setActiveMood: (value: string) => void;
	setActiveWork: (value: string) => void;
	activeWork: string;
	activeMood: string;
};

const FiltersBarWrapper = styled.section``;

const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${pxToRem(48)} 0 ${pxToRem(48)};
`;

const FiltersBar = (props: Props) => {
	const { setActiveMood, setActiveWork, activeWork, activeMood } = props;

	const moodFilters = [
		'all',
		'artsy',
		'bombastic',
		'bookish',
		'luxxy',
		'technical',
		'profesh',
		'vivacious'
	];

	const workFilters = [
		'digital',
		'art-direction',
		'packaging',
		'branding',
		'strategy',
		'all'
	];

	return (
		<FiltersBarWrapper>
			<LayoutWrapper>
				<Inner>
					<FilterTab
						title="mood"
						filters={moodFilters}
						setActiveMood={setActiveMood}
						activeMood={activeMood}
					/>
					<FilterTab
						title="work"
						filters={workFilters}
						setActiveWork={setActiveWork}
						activeWork={activeWork}
					/>
				</Inner>
			</LayoutWrapper>
		</FiltersBarWrapper>
	);
};

export default FiltersBar;
