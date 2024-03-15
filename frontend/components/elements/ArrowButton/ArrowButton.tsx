import styled from 'styled-components';
import { ButtonType } from '../../../shared/types/types';
import React, { useState } from 'react';
import Link from 'next/link';
import pxToRem from '../../../utils/pxToRem';
import ArrowSvg from '../../svgs/ArrowSvg';
import { motion } from 'framer-motion';

type Props = {
	data?: ButtonType;
	url?: string;
	children: React.ReactNode;
	isBlack?: boolean;
};

const LinkTag = styled.a`
	display: inline-block;
`;

const Inner = styled.div<{ $isWhite: boolean }>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: ${pxToRem(16)};
	padding: ${pxToRem(12)} 0;
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
	color: ${(props) =>
		props.$isWhite ? 'var(--colour-white)' : 'var(--colour-black)'};
`;

const ArrowWrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: ${pxToRem(1)};

	svg {
		width: ${pxToRem(22)};
		height: auto;
	}
`;

const ArrowButton = (props: Props) => {
	const { data, url, isBlack = false, children } = props;

	const [isHovered, setIsHovered] = useState(false);

	let href = '';
	let target = '_self';

	const setPageReferenceHref = () => {
		if (data?.pageReference._ref === 'whatToExpectPage') {
			return '/what-to-expect';
		} else if (data?.pageReference._ref === 'contactPage') {
			return '/contact';
		} else if (data?.pageReference._ref === 'conversationsPage') {
			return '/conversations';
		} else if (data?.pageReference._ref === 'workPage') {
			return '/work';
		} else {
			return '/';
		}
	};

	if (data?.pageReference) {
		href = setPageReferenceHref();
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
		<Link href={href} passHref legacyBehavior>
			<LinkTag
				className="primary-button"
				target={target}
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
			>
				<Inner $isWhite={!isBlack}>
					{children}{' '}
					<ArrowWrapper
						animate={{
							x: isHovered ? pxToRem(6) : 0
						}}
					>
						<ArrowSvg
							colour={
								isBlack
									? 'var(--colour-black)'
									: 'var(--colour-white)'
							}
						/>
					</ArrowWrapper>
				</Inner>
			</LinkTag>
		</Link>
	);
};

export default ArrowButton;
