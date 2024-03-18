import styled from 'styled-components';
import { TestimonialType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type StyledProps = {
	$isLightTheme: boolean;
};

const TestimonialCardWrapper = styled.div`
	width: 100%;
`;

const RatioWrapper = styled.div`
	padding-top: 87%;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		padding-top: 0;
	}
`;

const Inner = styled.div<StyledProps>`
	padding: ${pxToRem(16)} ${pxToRem(24)} ${pxToRem(24)};
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	background: ${(props) =>
		props.$isLightTheme
			? 'var(--colour-beige-light)'
			: 'var(--colour-black)'};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		position: relative;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(16)};
	}
`;

const Testimonial = styled.h4<StyledProps>`
	color: ${(props) =>
		props.$isLightTheme
			? 'var(--colour-beige-dark)'
			: 'var(--colour-white)'};
	margin-bottom: ${pxToRem(120)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(240)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		margin-bottom: ${pxToRem(88)};
	}
`;

const Credit = styled.div<StyledProps>`
	* {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(14)};
		line-height: ${pxToRem(21)};
		letter-spacing: 0.56px;
		text-transform: uppercase;
		color: ${(props) =>
			props.$isLightTheme
				? 'var(--colour-beige-dark)'
				: 'var(--colour-white)'};
	}
`;

const TestimonialCard = (props: TestimonialType) => {
	const { credit, testimonial, theme } = props;

	const formattedCredit: string = `<p>${credit.replace(/\n/g, '<br />')}</p>`;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<TestimonialCardWrapper
			ref={ref}
			className={`testimonial-card view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<RatioWrapper>
				<Inner $isLightTheme={theme === 'light'}>
					{testimonial && (
						<Testimonial $isLightTheme={theme === 'light'}>
							{testimonial}
						</Testimonial>
					)}
					{formattedCredit && (
						<Credit
							$isLightTheme={theme === 'light'}
							dangerouslySetInnerHTML={{
								__html: formattedCredit
							}}
						/>
					)}
				</Inner>
			</RatioWrapper>
		</TestimonialCardWrapper>
	);
};

export default TestimonialCard;
