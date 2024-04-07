import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ArrowSvg from '../../svgs/ArrowSvg';

type Props = {
	title: string;
	handleLoadMore: () => void;
	isActive: boolean;
};

const LoadMoreOuter = styled.div``;

const LoadMoreWrapper = styled(motion.button)<{ $isHovered: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${(props) =>
		props.$isHovered ? '12px 32px 12px 52px' : '12px 32px'};
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
	color: var(--colour-white);
	background: var(--colour-black);

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 0.85;
	}
`;

const Inner = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: ${pxToRem(32)};
`;

const ArrowWrapper = styled(motion.div)`
	position: absolute;
	top: 49%;
	transform: translateY(-50%);
	left: ${pxToRem(16)};
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: ${pxToRem(22)};
		height: auto;
	}
`;

const MotionWrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
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
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			delay: 0.1
		}
	}
};

const arrowVariants = {
	hidden: {
		x: -5,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		x: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const LoadMore = (props: Props) => {
	const { title, handleLoadMore, isActive } = props;

	const [isHovered, setIsHovered] = useState(false);

	return (
		<LoadMoreOuter className="load-more">
			{isActive && (
				<LayoutWrapper>
					<Inner>
						<LoadMoreWrapper
							onClick={() => handleLoadMore()}
							onMouseOver={() => setIsHovered(true)}
							onMouseOut={() => setIsHovered(false)}
							layout
							$isHovered={isHovered}
						>
							<AnimatePresence>
								{isHovered && (
									<ArrowWrapper
										variants={wrapperVariants}
										initial="hidden"
										animate="visible"
										exit="hidden"
									>
										<MotionWrapper variants={arrowVariants}>
											<ArrowSvg colour="var(--colour-white)" />
										</MotionWrapper>
									</ArrowWrapper>
								)}
							</AnimatePresence>
							{title}
						</LoadMoreWrapper>
					</Inner>
				</LayoutWrapper>
			)}
		</LoadMoreOuter>
	);
};

export default LoadMore;
