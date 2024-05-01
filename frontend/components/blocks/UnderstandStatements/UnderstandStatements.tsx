import React, { useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';

type StatementProps = {
	statement: string;
	author: string;
};

type Props = {
	data: StatementProps[];
};

const UnderstandStatementsWrapper = styled.div`
	position: relative;
	z-index: 2;
	mix-blend-mode: hard-light;
`;

const StatementWrapper = styled.div`
	margin-bottom: ${pxToRem(60)};
	cursor: default;

	&:hover {
		.author {
			filter: blur(0);
		}
	}
`;

const Title = styled.p`
	color: #ff8f5e;
	margin-bottom: ${pxToRem(32)};
`;

const Author = styled.p`
	color: #ff8f5e;
	filter: blur(10px);

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Word = styled.span`
	display: inline-block;
	white-space: nowrap;
`;

const Letter = styled.span<{ blurAmount: number }>`
	display: inline-block;
	filter: blur(${(props) => props.blurAmount}px);
	transform: scale(1.1);
	transition: filter 0.3s ease-out, transform 0.3s ease-out;
`;

const Statement = (props: StatementProps) => {
	const { statement, author } = props;
	const words = statement.split(' ');
	const letterElements = statement.replace(/\s/g, '').length;

	const [blurLevels, setBlurLevels] = useState<number[]>(
		Array(letterElements).fill(10)
	);

	const handleHover = (index: number) => {
		const blurDecayFactor = 100;
		const maxBlur = 15;

		const newBlurLevels = blurLevels.map((_, idx) => {
			const distance = Math.abs(index - idx);
			return Math.max(
				0,
				maxBlur -
					Math.floor(maxBlur * Math.exp(-distance / blurDecayFactor))
			);
		});
		setBlurLevels(newBlurLevels);
	};

	let letterIndex = -1;

	return (
		<StatementWrapper>
			<Title className="type-h2">
				{words.map((word, i) => (
					<React.Fragment key={i}>
						<Word>
							{word.split('').map((letter, j) => {
								letterIndex++;
								const currentIndex = letterIndex;
								return (
									<Letter
										key={j}
										blurAmount={blurLevels[currentIndex]}
										onMouseEnter={() =>
											handleHover(currentIndex)
										}
									>
										{letter}
									</Letter>
								);
							})}
						</Word>{' '}
					</React.Fragment>
				))}
			</Title>
			<Author className="type-secondary-heading-medium author">
				{author}
			</Author>
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
						/>
					))}
			</LayoutWrapper>
		</UnderstandStatementsWrapper>
	);
};

export default UnderstandStatements;
