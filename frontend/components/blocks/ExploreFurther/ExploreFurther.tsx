import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import ArrowSvg from '../../svgs/ArrowSvg';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import getPageReferenceHref from '../../../utils/getPageReferenceHref';
import { FurtherReadingType } from '../../../shared/types/types';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const ExploreFurtherWrapper = styled.a`
	background: var(--colour-beige-light);
	padding: ${pxToRem(24)} 0 ${pxToRem(32)};
	display: block;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(24)} 0 ${pxToRem(40)};
	}
`;

const SubTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: ${pxToRem(16)};
	padding: ${pxToRem(12)} 0;
`;

const SubTitle = styled.span`
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
`;

const ArrowWrapper = styled.div<{ $isActive: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	transform: ${(props) => props.$isActive && 'translateX(8px)'};

	transition: all var(--transition-speed-default) var(--transition-ease);

	svg {
		width: 20px;
		height: auto;
	}
`;

const Title = styled.h1`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(46)};
		line-height: ${pxToRem(59)};
		letter-spacing: -0.69px;
	}
`;

const ExploreFurther = (props: FurtherReadingType) => {
	const { pageReference, title } = props;

	const [isHovered, setIsHovered] = useState(false);

	const url = getPageReferenceHref(pageReference?._ref);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<Link href={url} passHref legacyBehavior scroll={false}>
			<ExploreFurtherWrapper
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
				ref={ref}
			>
				<LayoutWrapper>
					<SubTitleWrapper
						className={`view-element-fade-in ${
							inView ? 'view-element-fade-in--in-view' : ''
						}`}
					>
						<SubTitle>Explore Further</SubTitle>
						<ArrowWrapper $isActive={isHovered}>
							<ArrowSvg />
						</ArrowWrapper>
					</SubTitleWrapper>
					<Title>{title || ''}</Title>
				</LayoutWrapper>
			</ExploreFurtherWrapper>
		</Link>
	);
};

export default ExploreFurther;
