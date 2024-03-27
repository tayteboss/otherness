import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	services: string[];
};

const OurServicesBannerWrapper = styled.section`
	padding: ${pxToRem(56)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(32)} 0;
	}
`;

const Inner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(48)};
	background: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
		gap: ${pxToRem(36)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Title = styled(motion.h3)`
	position: relative;
	top: ${pxToRem(4)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		margin-bottom: ${pxToRem(24)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(12)};
	}
`;

const DesktopListWrapper = styled(motion.ul)`
	display: flex;
	gap: ${pxToRem(48)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
		gap: ${pxToRem(36)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		display: none;
		gap: ${pxToRem(24)};
		width: 100%;
	}
`;

const MobileListWrapper = styled(motion.ul)`
	display: none;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		display: block;
	}

	&::after {
		content: '';
		width: ${pxToRem(52)};
		height: 100%;
		background: linear-gradient(
			270deg,
			#fff 0%,
			rgba(255, 255, 255, 0) 100%
		);
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}
`;

const MobileInner = styled.div`
	-ms-overflow-style: none;
	scrollbar-width: none;
	padding-right: ${pxToRem(40)};

	&::-webkit-scrollbar {
		display: none;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		display: flex;
		gap: ${pxToRem(24)};
		width: 100%;
		padding-left: ${pxToRem(24)};
		overflow: auto;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-left: ${pxToRem(16)};
		gap: ${pxToRem(16)};
	}
`;

const ListItem = styled(motion.li)`
	white-space: pre;
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0,
			ease: 'easeInOut',
			when: 'beforeChildren',
			staggerChildren: 0.1,
			delayChildren: 0.3
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		x: -2,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const OurServicesBanner = (props: Props) => {
	const { services } = props;

	const hasServices = services.length > 0;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<OurServicesBannerWrapper ref={ref}>
			<LayoutWrapper>
				<Inner>
					<Title
						className="type-secondary-heading-medium"
						animate={
							inView
								? { opacity: 1, x: 0 }
								: { opacity: 0, x: -5 }
						}
					>
						Our Services
					</Title>
					<DesktopListWrapper
						variants={wrapperVariants}
						initial="hidden"
						animate={inView ? 'visible' : 'hidden'}
					>
						{hasServices &&
							services.map((item, i) => (
								<ListItem
									variants={childVariants}
									className="type-h4"
									key={i}
								>
									{item}
								</ListItem>
							))}
					</DesktopListWrapper>
				</Inner>
			</LayoutWrapper>
			<MobileListWrapper
				variants={wrapperVariants}
				initial="hidden"
				animate={inView ? 'visible' : 'hidden'}
			>
				<MobileInner>
					{hasServices &&
						services.map((item, i) => (
							<ListItem
								variants={childVariants}
								className="type-h4"
								key={i}
							>
								{item}
							</ListItem>
						))}
				</MobileInner>
			</MobileListWrapper>
		</OurServicesBannerWrapper>
	);
};

export default OurServicesBanner;
