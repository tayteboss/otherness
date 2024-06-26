import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import BarLoader from 'react-spinners/BarLoader';
import { AnimatePresence, motion, Variants } from 'framer-motion';

type Props = {
	data: string;
	isLoading?: boolean;
};

const PageHeaderWrapper = styled.section``;

const Inner = styled.div<{ $inView: boolean }>`
	padding: 0 0 ${pxToRem(8)};
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(24)} 0 ${pxToRem(8)};
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: ${(props) => (props.$inView ? '100%' : '0')};
		height: 1px;
		background: var(--colour-beige-light);

		transition: all 2000ms var(--transition-ease);
	}
`;

const Title = styled.h1``;

const LoadingWrapper = styled(motion.div)`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 2;

	& > span {
		width: 100% !important;
	}
`;

const MotionWrapper = styled(motion.div)`
	overflow: hidden;
`;

const Word = styled(motion.div)`
	display: inline-block;
	white-space: pre;
	overflow: hidden;
	font-family: var(--font-baryton);
	font-size: ${pxToRem(130)};
	line-height: ${pxToRem(157)};
	letter-spacing: -2px;
	font-weight: 200;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		font-size: ${pxToRem(86)};
		line-height: ${pxToRem(106)};
		letter-spacing: -1.72px;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(46)};
		letter-spacing: -0.69px;
		line-height: ${pxToRem(56)};
	}
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 0.75,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const headingWrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			staggerChildren: 0.05,
			delayChildren: 0.3
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		y: 50,
		transition: {
			ease: 'easeInOut',
			duration: 0.3
		}
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			ease: 'easeInOut',
			duration: 0.3
		}
	}
};

const PageHeader = (props: Props) => {
	const { data, isLoading } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	const words = data.split(' ').map((word) => [...word, ' ']);

	return (
		<PageHeaderWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<Inner $inView={inView}>
					<Title>
						<MotionWrapper
							variants={headingWrapperVariants}
							initial="hidden"
							animate="visible"
						>
							{words.map((word, i) => {
								return (
									<Word key={i} variants={childVariants}>
										{word}
									</Word>
								);
							})}
						</MotionWrapper>
					</Title>
					<AnimatePresence>
						{isLoading && (
							<LoadingWrapper
								variants={wrapperVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
							>
								<BarLoader
									color={'var(--colour-beige-dark)'}
									loading={true}
									height={1}
									speedMultiplier={0.5}
								/>
							</LoadingWrapper>
						)}
					</AnimatePresence>
				</Inner>
			</LayoutWrapper>
		</PageHeaderWrapper>
	);
};

export default PageHeader;
