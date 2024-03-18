import styled from 'styled-components';
import { StatisticType, TestimonialType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import TestimonialCard from '../TestimonialCard';
import StatisticCard from '../StatisticCard';

type Props = {
	homeComponentOneTestimonialOneStatistic: {
		statistic: StatisticType;
		testimonialBlock: TestimonialType;
	};
};

const HomeComponentOneTestimonialOneStatisticWrapper = styled.section`
	.testimonial-card {
		grid-column: span 12;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}
	}
`;

const HomeComponentOneTestimonialOneStatistic = (props: Props) => {
	const { homeComponentOneTestimonialOneStatistic } = props;
	const { statistic, testimonialBlock } =
		homeComponentOneTestimonialOneStatistic;

	return (
		<HomeComponentOneTestimonialOneStatisticWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<TestimonialCard
						credit={testimonialBlock?.credit}
						testimonial={testimonialBlock?.testimonial}
						theme={testimonialBlock?.theme}
					/>
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
		</HomeComponentOneTestimonialOneStatisticWrapper>
	);
};

export default HomeComponentOneTestimonialOneStatistic;
