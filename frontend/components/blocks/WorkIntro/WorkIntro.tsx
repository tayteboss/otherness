import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { useInView } from 'react-intersection-observer';
import WorkServicesList from '../WorkServicesList';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

type Props = {
	excerpt: string;
	tagline: string;
	types: string[];
};

const WorkIntroWrapper = styled(motion.section)`
	background: var(--colour-white);
	position: relative;
	z-index: 5;
	padding-bottom: ${pxToRem(72)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-bottom: ${pxToRem(48)};
	}
`;

const Inner = styled(motion.div)`
	grid-column: 4 / -4;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / -1;
	}
`;

const Tagline = styled(motion.h3)`
	margin-bottom: ${pxToRem(24)};
`;

const Excerpt = styled(motion.h5)`
	margin-bottom: ${pxToRem(56)};
`;

const WorkIntro = (props: Props) => {
	const { excerpt, tagline, types } = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const windowDimensions = useWindowDimensions();
	const isTabletMobile = windowDimensions.width < 768;

	const wrapperRef = useRef<HTMLAnchorElement>(null);

	const { scrollY } = useScroll();

	const transform = useTransform(
		scrollY,
		[0, distanceToTop + windowHeight * 2],
		[
			'translateY(0)',
			isTabletMobile ? 'translateY(0)' : 'translateY(250px)'
		]
	);

	const opacity = useTransform(scrollY, [0, windowHeight / 2], [1, 0]);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	useEffect(() => {
		if (wrapperRef?.current) {
			setDistanceToTop(
				window.pageYOffset +
					wrapperRef.current.getBoundingClientRect().top
			);
		}

		setWindowHeight(window.innerHeight);

		const timer = setTimeout(() => {
			if (wrapperRef?.current) {
				setDistanceToTop(
					window.pageYOffset +
						wrapperRef.current.getBoundingClientRect().top
				);
			}

			setWindowHeight(window.innerHeight);
		}, 1000);

		return () => clearTimeout(timer);
	}, [distanceToTop]);

	return (
		<WorkIntroWrapper ref={ref} style={{ transform }}>
			<LayoutWrapper>
				<LayoutGrid>
					<Inner style={{ opacity }}>
						{tagline && (
							<Tagline
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: {
										duration: 0.3,
										ease: 'easeInOut'
									}
								}}
							>
								{tagline}
							</Tagline>
						)}
						{excerpt && (
							<Excerpt
								className="type-secondary-heading-medium"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: {
										duration: 0.3,
										ease: 'easeInOut',
										delay: 0.25
									}
								}}
							>
								{excerpt}
							</Excerpt>
						)}
						<WorkServicesList inView={inView} items={types} />
					</Inner>
				</LayoutGrid>
			</LayoutWrapper>
		</WorkIntroWrapper>
	);
};

export default WorkIntro;
