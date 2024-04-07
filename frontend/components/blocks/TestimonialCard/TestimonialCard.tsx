import styled from 'styled-components';
import { TestimonialType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useEffect } from 'react';

type StyledProps = {
	$isLightTheme: boolean;
	$divWidth: number;
};

const TestimonialCardWrapper = styled.div`
	width: 100%;
`;

const Inner = styled.div<StyledProps>`
	padding: ${pxToRem(16)} ${pxToRem(24)} ${pxToRem(24)};
	min-height: ${(props) => props.$divWidth}px;
	width: 100%;
	background: ${(props) =>
		props.$isLightTheme
			? 'var(--colour-beige-light)'
			: 'var(--colour-black)'};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;

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

	const formattedCredit: string = credit
		? `<p>${credit.replace(/\n/g, '<br />')}</p>`
		: '';

	const [divWidth, setDivWidth] = useState(0);

	const ref2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleResize = () => {
			if (ref2.current) {
				setDivWidth(ref2.current.offsetWidth);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);
	}, []);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<TestimonialCardWrapper
			ref={ref2}
			className={`testimonial-card view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<Inner
				$isLightTheme={theme === 'light'}
				ref={ref}
				$divWidth={divWidth}
			>
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
		</TestimonialCardWrapper>
	);
};

export default TestimonialCard;
