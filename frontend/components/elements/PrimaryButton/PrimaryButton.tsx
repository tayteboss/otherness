import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { useState } from 'react';
import { ButtonType } from '../../../shared/types/types';
import ArrowSvg from '../../svgs/ArrowSvg';
import { AnimatePresence, motion } from 'framer-motion';
import getPageReferenceHref from '../../../utils/getPageReferenceHref';

type StyledProps = {
	$isWhite: boolean;
	$isHovered: boolean;
};

type Props = {
	children: React.ReactNode;
	data?: ButtonType;
	url?: string;
	isBlack?: boolean;
};

const LinkTag = styled.a`
	display: inline-block;
`;

const Inner = styled(motion.div)<StyledProps>`
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
	color: ${(props) =>
		props.$isWhite ? 'var(--colour-black)' : 'var(--colour-white)'};
	background: ${(props) =>
		props.$isWhite ? 'var(--colour-white)' : 'var(--colour-black)'};

	transition: all var(--transition-speed-default) var(--transition-ease);
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

const PrimaryButton = (props: Props) => {
	const { children, data, url, isBlack = false } = props;

	const [isHovered, setIsHovered] = useState(false);

	let href = '';
	let target = '_self';

	if (data?.pageReference) {
		href = getPageReferenceHref(data?.pageReference?._ref);
	}
	if (data?.url.includes('@')) {
		href = `mailto:${data?.url}`;
		target = '_blank';
	} else if (data?.url) {
		href = data?.url;
		target = '_blank';
	} else if (url) {
		href = url;
		target = '_blank';
	} else {
		href = '/';
	}

	return (
		<>
			<Link href={href} passHref legacyBehavior scroll={false}>
				<LinkTag
					className="primary-button"
					target={target}
					onMouseOver={() => setIsHovered(true)}
					onMouseOut={() => setIsHovered(false)}
				>
					<Inner $isWhite={!isBlack} layout $isHovered={isHovered}>
						<AnimatePresence>
							{isHovered && (
								<ArrowWrapper
									variants={wrapperVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
								>
									<MotionWrapper variants={arrowVariants}>
										<ArrowSvg
											colour={
												isBlack
													? 'var(--colour-white)'
													: 'var(--colour-black)'
											}
										/>
									</MotionWrapper>
								</ArrowWrapper>
							)}
						</AnimatePresence>
						{children}
					</Inner>
				</LinkTag>
			</Link>
		</>
	);
};

export default PrimaryButton;
