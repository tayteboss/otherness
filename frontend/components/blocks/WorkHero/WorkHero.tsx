import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import { MediaType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

type Props = {
	heroLayoutType: string;
	fullWidthHero: MediaType;
	twoColumnHero: {
		leftBlock: MediaType;
		rightBlock: MediaType;
	};
};

const WorkHeroWrapper = styled.section`
	margin-bottom: ${pxToRem(104)};
	background: var(--colour-white);
	position: relative;
	z-index: 5;
`;

const FullWidthWrapper = styled.div`
	grid-column: 1 / -1;
	width: 100%;
	overflow: hidden;

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 56.25%;

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			padding-top: 177.7%;
		}
	}

	mux-player {
		--controls: block !important;
	}
`;

const MotionWrapper = styled(motion.div)``;

const TwoColWrapper = styled.div`
	grid-column: span 12;
	width: 100%;

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;
	}
`;

const WorkHero = (props: Props) => {
	const { heroLayoutType, fullWidthHero, twoColumnHero } = props;

	const useFullWidth = heroLayoutType === 'fullWidth';

	const [windowHeight, setWindowHeight] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const wrapperRef = useRef<HTMLAnchorElement>(null);

	const { scrollY } = useScroll();

	const transform = useTransform(
		scrollY,
		[0, distanceToTop + windowHeight],
		['scale(1)', 'scale(1.1)']
	);

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
		<WorkHeroWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					{useFullWidth && (
						<FullWidthWrapper>
							<MotionWrapper style={{ transform }}>
								<MediaStack
									data={fullWidthHero}
									isPriority
									sizes="100vw"
								/>
							</MotionWrapper>
						</FullWidthWrapper>
					)}
					{!useFullWidth && (
						<>
							<TwoColWrapper>
								<MediaStack
									data={twoColumnHero?.leftBlock}
									isPriority
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</TwoColWrapper>
							<TwoColWrapper>
								<MediaStack
									data={twoColumnHero?.rightBlock}
									isPriority
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</TwoColWrapper>
						</>
					)}
				</LayoutGrid>
			</LayoutWrapper>
		</WorkHeroWrapper>
	);
};

export default WorkHero;
