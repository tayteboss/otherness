import styled from 'styled-components';
import { NoticedType } from '../../../shared/types/types';
import ArrowSvg from '../../svgs/ArrowSvg';
import { useInView } from 'react-intersection-observer';
import pxToRem from '../../../utils/pxToRem';
import { useState } from 'react';
import NoticedCursorLayout from '../../layout/NoticedCursorLayout';
import Image from 'next/image';

type StyledProps = {
	$inView?: boolean;
	$isClickable?: boolean;
};

const NoticedCardWrapper = styled.div<StyledProps>`
	cursor: ${(props) => (props.$isClickable ? 'pointer' : 'default')};
	position: relative;
	z-index: 2;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: ${(props) => (props.$inView ? '100%' : '0')};
		height: 1px;
		background: var(--colour-black);

		transition: all 2000ms var(--transition-ease);
	}
`;

const DesktopWrapper = styled.div<StyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${pxToRem(18)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MobileWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
		flex-direction: column;
		padding: ${pxToRem(18)} 0;
		gap: ${pxToRem(8)};
	}
`;

const TopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const BottomWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(24)};
`;

const Title = styled.h5`
	flex: 3;
	padding-right: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex: unset;
	}
`;

const Source = styled.p`
	flex: 2;
	padding-right: 8%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex: unset;
		padding-right: 0;
	}
`;

const Year = styled.p`
	flex: 2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex: unset;
	}
`;

const ArrowWrapper = styled.div`
	flex: 1;
	text-align: right;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex: unset;
	}
`;

const ImageWrapper = styled.div`
	width: 20vw;
	padding-top: 100%;
	position: relative;
`;

const ImageInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

const NoticedCard = (props: NoticedType) => {
	const { year, title, thumbnailImage, source, url } = props;

	const [isHovered, setIsHovered] = useState(false);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	const handleClick = () => {
		if (url) {
			window.open(url, '_blank');
		}
	};

	return (
		<>
			<NoticedCardWrapper
				ref={ref}
				onClick={() => handleClick()}
				$inView={inView}
				$isClickable={!!url}
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
			>
				<DesktopWrapper>
					<Title>{title || ''}</Title>
					<Source className="type-secondary-heading-small">
						{source || ''}
					</Source>
					<Year className="type-secondary-heading-small">
						{year || ''}
					</Year>
					<ArrowWrapper>{url && <ArrowSvg />}</ArrowWrapper>
				</DesktopWrapper>
				<MobileWrapper>
					<TopWrapper>
						<Title>{title || ''}</Title>
						<ArrowWrapper>{url && <ArrowSvg />}</ArrowWrapper>
					</TopWrapper>
					<BottomWrapper>
						<Source className="type-secondary-heading-small">
							{source || ''}
						</Source>
						<Year className="type-secondary-heading-small">
							{year || ''}
						</Year>
					</BottomWrapper>
				</MobileWrapper>
			</NoticedCardWrapper>
			{thumbnailImage && (
				<NoticedCursorLayout isActive={isHovered}>
					<ImageWrapper>
						<ImageInner>
							<Image
								src={thumbnailImage}
								alt="Noticed thumbnail"
								fill
							/>
						</ImageInner>
					</ImageWrapper>
				</NoticedCursorLayout>
			)}
		</>
	);
};

export default NoticedCard;
