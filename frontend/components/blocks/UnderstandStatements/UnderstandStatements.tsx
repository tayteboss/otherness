import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import randomIntFromInterval from '../../../utils/randomIntFromInterval';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
	margin-left: auto;
	margin-right: auto;
`;

const StatementInnerWrapper = styled.div`
	filter: blur(3px);

	transition: all var(--transition-speed-slow) var(--transition-ease);

	&:hover {
		filter: blur(0);

		.author {
			filter: blur(0);
		}

		.blob {
			opacity: 0 !important;
		}
	}
`;

const Title = styled.p`
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
	font-size: ${pxToRem(60)};
	line-height: ${pxToRem(80)};
	letter-spacing: 1px;
	font-weight: 200;
	font-family: var(--font-baryton);

	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #ff8f5e;
		border-radius: 33%;
		filter: blur(10px);
		mix-blend-mode: soft-light;
		opacity: ${(props) => props.opacityAmount};
		pointer-events: none;
		height: 100%;
		width: 125%;

		transition: all var(--transition-speed-slow) var(--transition-ease);
	}
`;

const Letter = styled.span<StyledProps>`
	display: inline-block;
	opacity: ${(props) => props.opacityAmount};

	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const Statement = (props: StatementProps) => {
	const { statement, author, index } = props;

	const letterElements = statement.replace(/\s/g, '').length;

	const [fontSizeType, setFontSizeType] = useState('type-h2');
	const [alignment, setAlignment] = useState('center');
	const [marginBottom, setMarginBottom] = useState('60px');
	const [width, setWidth] = useState('100%');
	const [opacityLevels, setOpacityLevels] = useState<number[]>(
		Array(letterElements).fill(10)
	);

	const words = statement.split(' ');
	let letterIndex = -1;
	let wordIndex = -1;

	const wrapperRef = useRef<HTMLDivElement>(null);

	// const [windowHeight, setWindowHeight] = useState(0);
	// const [distanceToTop, setDistanceToTop] = useState(0);

	// const windowDimensions = useWindowDimensions();
	// const isTabletMobile = windowDimensions.width < 768;

	// const { scrollY } = useScroll();

	// const transform = useTransform(
	// 	scrollY,
	// 	[distanceToTop - windowHeight, distanceToTop + windowHeight],
	// 	[
	// 		`translateY(0) translateX(${randomIntFromInterval(
	// 			-50,
	// 			50
	// 		)}px) rotate(${randomIntFromInterval(-5, 5)}deg)`,
	// 		`translateY(${randomIntFromInterval(
	// 			-300,
	// 			300
	// 		)}px) translateX(${randomIntFromInterval(
	// 			-50,
	// 			50
	// 		)}px) rotate(${randomIntFromInterval(-5, 5)}deg)`
	// 	]
	// );

	// useEffect(() => {
	// 	if (wrapperRef?.current) {
	// 		setDistanceToTop(
	// 			window.pageYOffset +
	// 				wrapperRef.current.getBoundingClientRect().top
	// 		);
	// 	}

	// 	setWindowHeight(window.innerHeight);
	// }, [distanceToTop]);

	const handleWordHover = (index: number) => {
		const opacityDecayFactor = 0.1; // Controls how quickly the opacity decays
		const maxOpacity = 1; // Maximum opacity for the hovered letter
		const minOpacity = 0; // Minimum opacity any letter can have

		const newOpacityLevels = opacityLevels.map((_, idx) => {
			const distance = Math.abs(index - idx);
			// Corrected formula to ensure the hovered letter has the highest opacity
			return Math.min(
				maxOpacity,
				minOpacity -
					(maxOpacity - minOpacity) *
						Math.exp(-distance * opacityDecayFactor)
			);
		});
		setOpacityLevels(newOpacityLevels);
	};

	const handleLetterHover = (index: number) => {
		const opacityDecayFactor = 0.1; // Controls how quickly the opacity decays
		const maxOpacity = 1; // Maximum opacity for the hovered letter
		const minOpacity = 0; // Minimum opacity any letter can have

		const newOpacityLevels = opacityLevels.map((_, idx) => {
			const distance = Math.abs(index - idx);
			// Corrected formula to ensure the hovered letter has the highest opacity
			return Math.min(
				maxOpacity,
				minOpacity +
					(maxOpacity - minOpacity) *
						Math.exp(-distance * opacityDecayFactor)
			);
		});
		setOpacityLevels(newOpacityLevels);
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

		if (statement.length < 90) {
			setFontSizeType('type-h2');
		} else {
			setFontSizeType('type-h3');
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
			style={{ marginBottom, textAlign: alignment, width }}
			className="performance cursor-link"
			ref={wrapperRef}
			key={`${statement}-${index}`}
		>
			<StatementInnerWrapper>
				<Title className={fontSizeType}>
					{words.map((word, i) => {
						wordIndex++;
						const currentIndex = wordIndex;

						return (
							<React.Fragment key={i}>
								<Word
									opacityAmount={opacityLevels[currentIndex]}
									onMouseEnter={() =>
										handleWordHover(currentIndex)
									}
									onMouseLeave={() => {
										setOpacityLevels(
											Array(letterElements).fill(10)
										);
									}}
								>
									{word.split('').map((letter, j) => {
										letterIndex++;
										const currentIndex = letterIndex;
										return (
											<Letter
												key={j}
												opacityAmount={
													opacityLevels[currentIndex]
												}
												onMouseEnter={() =>
													handleLetterHover(
														currentIndex
													)
												}
											>
												{letter}
											</Letter>
										);
									})}
								</Word>{' '}
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
				{hasData &&
					data.map((item, i) => (
						<Statement
							statement={item?.statement}
							author={item?.author}
							key={i}
							index={i}
						/>
					))}
			</LayoutWrapper>
		</UnderstandStatementsWrapper>
	);
};

export default UnderstandStatements;