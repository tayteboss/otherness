import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import FilterTab from '../../elements/FilterTab';
import pxToRem from '../../../utils/pxToRem';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';

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

	const [moodIsHovered, setMoodIsHovered] = useState(true);
	const [workIsHovered, setWorkIsHovered] = useState(false);
	const [count, setCount] = useState(0);

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

	useEffect(() => {
		setCount(count + 1);

		if (count <= 1) {
			if (workIsHovered) {
				setMoodIsHovered(false);
			}
		}
	}, [moodIsHovered, workIsHovered]);

	const ref = useRef<HTMLDivElement>(null!);

	useClickOutside(ref, () => {
		setMoodIsHovered(false);
		setWorkIsHovered(false);
	});

	return (
		<FiltersBarWrapper ref={ref}>
			<LayoutWrapper>
				<Inner>
					<FilterTab
						title="mood"
						filters={moodFilters}
						setActiveMood={setActiveMood}
						activeMood={activeMood}
						initialActive
						setIsHovered={setMoodIsHovered}
						isHovered={moodIsHovered}
						key="mood"
					/>
					<MobileDivider />
					<FilterTab
						title="work"
						filters={workFilters}
						setActiveWork={setActiveWork}
						activeWork={activeWork}
						setIsHovered={setWorkIsHovered}
						isHovered={workIsHovered}
						key="work"
					/>
				</Inner>
			</LayoutWrapper>
		</FiltersBarWrapper>
	);
};

export default FiltersBar;
