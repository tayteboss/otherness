import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import BarLoader from 'react-spinners/BarLoader';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	data: string;
	isLoading: boolean;
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

const Title = styled.h1`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(46)};
		line-height: ${pxToRem(59)};
		letter-spacing: -0.69px;
	}
`;

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

const PageHeader = (props: Props) => {
	const { data, isLoading } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<PageHeaderWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<Inner $inView={inView}>
					<Title>{data || ''}</Title>
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
