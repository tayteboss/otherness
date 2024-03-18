import styled from 'styled-components';
import LayoutGrid from '../../common/LayoutGrid';
import LayoutWrapper from '../../common/LayoutWrapper';
import StatisticCard from '../StatisticCard';
import { StatisticType } from '../../../shared/types/types';

type Props = {
	homeComponentOneStatistic: {
		selectPosition: 'left' | 'middle' | 'right';
		statistic: StatisticType;
	};
};

const HomeComponentOneStatisticWrapper = styled.section<{
	$gridColumn: string;
}>`
	.statistic-card {
		grid-column: ${(props) => props.$gridColumn};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}
`;

const HomeComponentOneStatistic = (props: Props) => {
	const { homeComponentOneStatistic } = props;
	const { selectPosition, statistic } = homeComponentOneStatistic;

	const isSmall = statistic?.size === 'small';
	const spanSize = isSmall ? 8 : 12;
	let gridColumn = '';

	if (selectPosition === 'left') {
		gridColumn = `1 / span ${spanSize}`;
	} else if (selectPosition === 'middle') {
		if (isSmall) {
			gridColumn = '10 / 16';
		} else {
			gridColumn = '9 / 17';
		}
	} else if (selectPosition === 'right') {
		if (isSmall) {
			gridColumn = '19 / -1';
		} else {
			gridColumn = '17 / -1';
		}
	}

	return (
		<HomeComponentOneStatisticWrapper $gridColumn={gridColumn}>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<StatisticCard
						statisticTitle={statistic?.statisticTitle}
						description={statistic?.description}
						size={statistic?.size}
						image={statistic?.image}
						video={statistic?.video}
						mediaType={statistic?.mediaType}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</HomeComponentOneStatisticWrapper>
	);
};

export default HomeComponentOneStatistic;
