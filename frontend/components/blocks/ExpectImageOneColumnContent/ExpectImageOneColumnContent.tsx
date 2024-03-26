import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import { PortableText } from '@portabletext/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useInView } from 'react-intersection-observer';

type Props = {
	content: [];
	media: MediaType;
};

const ExpectImageOneColumnContentWrapper = styled.section`
	padding: ${pxToRem(32)} 0 ${pxToRem(140)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(28)} 0;
	}
`;

const MediaWrapper = styled(motion.div)`
	grid-column: 1 / 13;
	width: calc(100% + 50px);
	margin-left: -50px;
	position: sticky;
	top: 100px;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		width: calc(100% + 64px);
		margin-left: -32px;
		position: relative;
		top: unset;
		margin-bottom: ${pxToRem(28)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			width: calc(100% + 32px);
			margin-left: -16px;
		}
	}

	.image-component-wrapper,
	.video-component-wrapper {
		padding-top: 100%;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			padding-top: 125%;
		}
	}
`;

const ContentWrapper = styled.div`
	grid-column: 14 / 23;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const ExpectImageOneColumnContent = (props: Props) => {
	const { content, media } = props;

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
			'translateY(-100px)',
			isTabletMobile ? 'translateY(0)' : 'translateY(100px)'
		]
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

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ExpectImageOneColumnContentWrapper
			ref={wrapperRef}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<LayoutGrid>
					<MediaWrapper ref={ref} style={{ transform }}>
						<MediaStack data={media} />
					</MediaWrapper>
					<ContentWrapper className="rich-text rich-text--large-p">
						{content && <PortableText value={content} />}
					</ContentWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ExpectImageOneColumnContentWrapper>
	);
};

export default ExpectImageOneColumnContent;
