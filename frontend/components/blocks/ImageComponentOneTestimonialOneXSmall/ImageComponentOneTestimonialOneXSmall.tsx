import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import TestimonialCard from '../TestimonialCard';
import MediaStack from '../../common/MediaStack';

type StyledProps = {
	$isLHS: boolean;
	$gridColumn: string;
};

type Props = {
	imageComponentOneTestimonialOneXSmall: any;
};

const ImageComponentOneTestimonialOneXSmallWrapper = styled.section``;

const TestimonialWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$isLHS ? 1 : 2)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const SmallWrapper = styled.div<StyledProps>`
	grid-column: ${(props) => props.$gridColumn};
	order: ${(props) => (props.$isLHS ? 1 : 2)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const ImageComponentOneTestimonialOneXSmall = (props: Props) => {
	const { imageComponentOneTestimonialOneXSmall } = props;
	const { testimonialBlock, xSmall, selectPosition } =
		imageComponentOneTestimonialOneXSmall;

	let testimonialGridColumn = '';
	let smallGridColumn = '';

	if (selectPosition === 'left') {
		testimonialGridColumn = '1 / 13';
		smallGridColumn = '19 / -1';
	} else {
		testimonialGridColumn = '13 / -1';
		smallGridColumn = '1 / 7';
	}

	return (
		<ImageComponentOneTestimonialOneXSmallWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<TestimonialWrapper
						$isLHS={selectPosition === 'left'}
						$gridColumn={testimonialGridColumn}
					>
						<TestimonialCard
							credit={testimonialBlock?.credit}
							theme={testimonialBlock?.theme}
							testimonial={testimonialBlock?.testimonial}
						/>
					</TestimonialWrapper>
					<SmallWrapper
						$isLHS={selectPosition === 'right'}
						$gridColumn={smallGridColumn}
					>
						<MediaStack data={xSmall} />
					</SmallWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentOneTestimonialOneXSmallWrapper>
	);
};

export default ImageComponentOneTestimonialOneXSmall;
