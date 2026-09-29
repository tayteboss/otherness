import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	filters: string[];
	setActiveMood: (value: string) => void;
	activeMood: string;
};

const FilterTabWrapper = styled.div`
	padding: ${pxToRem(8)} 0 ${pxToRem(16)};
	display: flex;
	align-items: center;
	gap: ${pxToRem(12)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Title = styled.span`
	white-space: nowrap;
	padding-bottom: ${pxToRem(2)};
`;

const Divider = styled.div`
	background: var(--colour-black);
	height: 1px;
	flex: 0 0 ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const FiltersList = styled.div`
	display: flex;
	gap: ${pxToRem(10)};
	min-width: 0;
	max-width: 100%;
	overflow-x: auto;
	padding: ${pxToRem(4)};
	margin: -${pxToRem(4)};
`;

const Filter = styled.button<{ $isActive: boolean }>`
	font-size: ${pxToRem(13)};
	font-weight: 700;
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
	white-space: nowrap;
	color: ${(props) =>
		props.$isActive ? 'var(--colour-black)' : 'var(--colour-inactive)'};
	transition: color var(--transition-speed-default) var(--transition-ease);

	&:hover {
		color: var(--colour-black);
	}

	&:focus-visible {
		outline: 1px solid var(--colour-black);
		outline-offset: 2px;
	}
`;

const FilterTab = ({ filters, setActiveMood, activeMood }: Props) => (
	<FilterTabWrapper>
		<Title className="type-h5">Type of mood</Title>
		<Divider aria-hidden="true" />
		<FiltersList role="group" aria-label="Mood">
			{filters.map((filter) => (
				<Filter
					key={filter}
					type="button"
					onClick={() => setActiveMood(filter)}
					$isActive={activeMood === filter}
					aria-pressed={activeMood === filter}
				>
					{filter}
				</Filter>
			))}
		</FiltersList>
	</FilterTabWrapper>
);

export default FilterTab;
