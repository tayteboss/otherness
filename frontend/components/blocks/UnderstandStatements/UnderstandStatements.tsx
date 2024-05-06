import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import randomIntFromInterval from '../../../utils/randomIntFromInterval';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LayoutGrid from '../../common/LayoutGrid';

type StyledProps = {
	opacityAmount?: number;
	$width?: number;
	$height?: number;
};

type StatementProps = {
	statement: string;
	author: string;
	index: number;
};

type Props = {
	data: StatementProps[];
};

const UnderstandStatementsWrapper = styled.div`
	position: relative;
	z-index: 10;
	mix-blend-mode: hard-light;
`;

const StatementWrapper = styled(motion.div)`
	cursor: default;

	&:nth-child(6n + 1) {
		grid-column: 1 / -1;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / span 4;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 2) {
		grid-column: 1 / 12;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / span 4;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 3) {
		grid-column: 4 / -5;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / span 4;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 4) {
		grid-column: 12 / -1;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / span 4;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 5) {
		grid-column: 1 / 10;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / span 4;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			grid-column: 1 / -1;
		}
	}

	&:nth-child(6n + 6) {
		grid-column: 14 / -1;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / span 4;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			grid-column: 1 / -1;
		}
	}
`;

const StatementInnerWrapper = styled.div``;

const Title = styled.div`
	color: #ff8f5e;
	margin-bottom: ${pxToRem(32)};
`;

const Author = styled.p`
	color: #ff8f5e;
`;

const Word = styled.div<StyledProps>`
	display: inline-block;
	white-space: nowrap;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #ff8f5e;
		border-radius: 33%;
		filter: blur(10px);
		mix-blend-mode: color;
		opacity: ${(props) => props.opacityAmount};
		pointer-events: none;
		height: ${(props) => props.$height};
		width: 115%;

		transition: all var(--transition-speed-slow) var(--transition-ease);
	}
`;

const Letter = styled.span<StyledProps>`
	display: inline-block;
	font-size: ${pxToRem(60)};
	line-height: 1.4;
	letter-spacing: 0.1px;
	font-weight: 200;
	font-family: var(--font-baryton);
	opacity: ${(props) => props.opacityAmount};

	transition: opacity 0.6s ease-out, transform 0.6s ease-out;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(40)};
		line-height: 1;
	}
`;

const Space = styled.span`
	display: inline-block;
	width: ${pxToRem(10)};
`;

const Statement = (props: StatementProps) => {
	const { statement, author, index } = props;

	const letterElements = statement.replace(/\s/g, '').length;
	const wordElements = statement.split(' ').length;

	const [alignment, setAlignment] = useState('center');
	const [marginBottom, setMarginBottom] = useState('60px');
	const [width, setWidth] = useState('100%');
	const [height, setHeight] = useState('100%');
	const [letterOpacityLevels, setLetterOpacityLevels] = useState<number[]>(
		Array(letterElements).fill(10)
	);
	const [wordOpacityLevels, setWordOpacityLevels] = useState<number[]>(
		Array(wordElements).fill(10)
	);
	const [clickedWordIndex, setClickedWordIndex] = useState<number | null>(
		null
	);

	const words = statement.split(' ');
	let letterIndex = -1;
	let wordIndex = -1;

	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleWordClick = (clickIndex: number) => {
		const opacityDecayFactor = 0.05; // Controls how quickly the opacity decays
		const maxOpacity = 1; // Maximum opacity for the hovered letter
		const minOpacity = 0; // Minimum opacity any letter can have

		const newOpacityLevels = wordOpacityLevels.map((_, idx) => {
			const distance = Math.abs(clickIndex - idx);
			return (
				minOpacity +
				(maxOpacity - minOpacity) *
					(1 - Math.exp(-distance * opacityDecayFactor))
			);
		});

		setWordOpacityLevels(newOpacityLevels);
	};

	const handleWordHover = (hoveredIndex: number) => {
		const opacityDecayFactor = 0.2; // Controls how quickly the opacity decays
		const maxOpacity = 1; // Maximum opacity for the hovered letter
		const minOpacity = 0; // Minimum opacity any letter can have

		const newOpacityLevels = wordOpacityLevels.map((_, idx) => {
			const distance = Math.abs(hoveredIndex - idx);
			return (
				minOpacity +
				(maxOpacity - minOpacity) *
					(1 - Math.exp(-distance * opacityDecayFactor))
			);
		});

		setWordOpacityLevels(newOpacityLevels);
	};

	const handleLetterHover = (index: number) => {
		const opacityDecayFactor = 0.1; // Controls how quickly the opacity decays
		const maxOpacity = 1;
		const minOpacity = 0;

		const newOpacityLevels = letterOpacityLevels.map((_, idx) => {
			const distance = Math.abs(index - idx);
			return Math.min(
				maxOpacity,
				minOpacity +
					(maxOpacity - minOpacity) *
						Math.exp(-distance * opacityDecayFactor)
			);
		});
		setLetterOpacityLevels(newOpacityLevels);
	};

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * 3);

		setMarginBottom(randomIntFromInterval(100, 300) + 'px');

		if (randomIndex === 0) {
			setAlignment('left');
		} else if (randomIndex === 1) {
			setAlignment('center');
		} else {
			setAlignment('right');
		}

		if (randomIndex === 0) {
			setWidth('60%');
		} else if (randomIndex === 1) {
			setWidth('50%');
		} else {
			setWidth('70%');
		}

		if (randomIndex === 0) {
			setHeight('100%');
		} else if (randomIndex === 1) {
			setHeight('150%');
		} else {
			setHeight('125%');
		}

		if (randomIndex === 0) {
			setAlignment('left');
		} else if (randomIndex === 1) {
			setAlignment('center');
		} else {
			setAlignment('right');
		}
	}, []);

	return (
		<StatementWrapper
			style={{ marginBottom, textAlign: alignment }}
			className="performance cursor-link statement-wrapper"
			ref={wrapperRef}
			key={`${statement}-${index}`}
		>
			<StatementInnerWrapper>
				<Title>
					{words.map((word, i) => {
						wordIndex++;
						const currentWordIndex = wordIndex;

						return (
							<React.Fragment key={i}>
								<Word
									opacityAmount={
										wordOpacityLevels[currentWordIndex]
									}
									onMouseEnter={() =>
										handleWordHover(currentWordIndex)
									}
									onMouseLeave={() => {
										setWordOpacityLevels(
											Array(letterElements).fill(10)
										);
									}}
									onClick={() => handleWordClick(i)}
									$height={height}
								>
									{word.split('').map((letter, j) => {
										letterIndex++;
										const currentLetterIndex = letterIndex;
										return (
											<Letter
												key={j}
												opacityAmount={
													letterOpacityLevels[
														currentLetterIndex
													]
												}
												onMouseEnter={() =>
													handleLetterHover(
														currentLetterIndex
													)
												}
											>
												{letter}
											</Letter>
										);
									})}
									<Space> </Space>
								</Word>
							</React.Fragment>
						);
					})}
				</Title>
				<Author className="type-secondary-heading-medium author">
					{author}
				</Author>
			</StatementInnerWrapper>
		</StatementWrapper>
	);
};

const UnderstandStatements = (props: Props) => {
	const { data } = props;

	const hasData = data && data.length > 0;

	return (
		<UnderstandStatementsWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					{hasData &&
						data.map((item, i) => (
							<Statement
								statement={item?.statement}
								author={item?.author}
								key={i}
								index={i}
							/>
						))}
				</LayoutGrid>
			</LayoutWrapper>
		</UnderstandStatementsWrapper>
	);
};

export default UnderstandStatements;
