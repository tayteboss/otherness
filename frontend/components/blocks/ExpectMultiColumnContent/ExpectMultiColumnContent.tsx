import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import MediaStack from '../../common/MediaStack';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

type CardProps = {
	title: string;
	description: string;
};

type Props = {
	columns: any[];
	media: MediaType;
};

const ExpectMultiColumnContentWrapper = styled.section`
	padding: ${pxToRem(56)} 0 ${pxToRem(140)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(28)} 0;
	}

	.layout-grid {
		grid-row-gap: ${pxToRem(30)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-row-gap: ${pxToRem(24)};
		}
	}
`;

const ColumnCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(16)};
`;

const Title = styled.h5`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(24)};
		line-height: ${pxToRem(31)};
		letter-spacing: -0.24px;
	}
`;

const Description = styled.p``;

const TopColumnOneLayout = styled.div`
	grid-column: 7 / span 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / span 12;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 12;
	}
`;

const TopColumnTwoLayout = styled.div`
	grid-column: span 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 12;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 12;
	}
`;

const BottomColumnLayout = styled.div`
	grid-column: span 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 12;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const MediaWrapper = styled(motion.div)`
	grid-column: 1 / 13;
	width: calc(100% + 50px);
	margin-left: -50px;
	position: sticky;
	top: 100px;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 12;
		width: calc(100% + 64px);
		margin-left: -32px;
		position: relative;
		top: unset;

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

const ColumnsWrapper = styled.div`
	grid-column: 13 / -1;
	grid-template-columns: subgrid;
	display: grid;
	grid-row-gap: ${pxToRem(30)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 12;
		grid-row-gap: ${pxToRem(24)};
	}
`;

const ColumnCard = (props: CardProps) => {
	const { title, description } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ColumnCardWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<Title>{title || ''}</Title>
			<Description>{description || ''}</Description>
		</ColumnCardWrapper>
	);
};

const ExpectMultiColumnContent = (props: Props) => {
	const { columns, media } = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const windowDimensions = useWindowDimensions();
	const isTabletMobile = windowDimensions.width < 768;
	const topColumns = columns.slice(0, 2);

	const wrapperRef = useRef<HTMLAnchorElement>(null);

	const { scrollY } = useScroll();

	const transform = useTransform(
		scrollY,
		[0, distanceToTop + windowHeight * 2],
		[
			'translateY(0)',
			isTabletMobile ? 'translateY(0)' : 'translateY(150px)'
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

	return (
		<ExpectMultiColumnContentWrapper ref={wrapperRef}>
			<LayoutWrapper>
				<LayoutGrid>
					{topColumns[0] && (
						<TopColumnOneLayout>
							<ColumnCard
								title={topColumns[0].title}
								description={topColumns[0].description}
							/>
						</TopColumnOneLayout>
					)}
					{topColumns[1] && (
						<TopColumnTwoLayout>
							<ColumnCard
								title={topColumns[1].title}
								description={topColumns[1].description}
							/>
						</TopColumnTwoLayout>
					)}
					<MediaWrapper style={{ transform }}>
						<MediaStack data={media} />
					</MediaWrapper>
					<ColumnsWrapper>
						{columns.slice(2).map((column, i) => (
							<BottomColumnLayout key={i}>
								<ColumnCard
									title={column?.title}
									description={column?.description}
								/>
							</BottomColumnLayout>
						))}
					</ColumnsWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ExpectMultiColumnContentWrapper>
	);
};

export default ExpectMultiColumnContent;
