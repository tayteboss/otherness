import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import FilterTab from '../../elements/FilterTab';
import pxToRem from '../../../utils/pxToRem';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

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
	align-items: center;
	overflow: hidden;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(32)} 0 ${pxToRem(40)};
		position: relative;
	}
`;

const MobileDivider = styled.div`
	background: var(--colour-black);
	height: 1px;
	width: ${pxToRem(24)};
	display: none;
	position: relative;
	top: -2px;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const FiltersBar = (props: Props) => {
	const { setActiveMood, setActiveWork, activeWork, activeMood } = props;

	const window = useWindowDimensions();
	const windowWidth = window.width;
	const isTablet = windowWidth < 768;

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

	let workFilters = [
		'digital',
		'art-direction',
		'packaging',
		'branding',
		'strategy',
		'all'
	];

	if (isTablet) {
		workFilters = workFilters.reverse();
	}

	return (
		<FiltersBarWrapper>
			<LayoutWrapper>
				<Inner>
					<FilterTab
						title="mood"
						filters={moodFilters}
						setActiveMood={setActiveMood}
						activeMood={activeMood}
						initialActive
					/>
					<MobileDivider />
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
