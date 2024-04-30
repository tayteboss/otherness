import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

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
`;

const Title = styled.p`
	color: #ff8f5e;
	margin-bottom: ${pxToRem(32)};
`;

const Author = styled.p`
	color: #ff8f5e;
`;

const Word = styled.span``;

const Letter = styled.span`
	display: inline-block;
	filter: blur(10px);
	transform: scale(1.1);

	transition: all var(--transition-speed-slow) var(--transition-ease);

	&:hover {
		filter: blur(0);
		transform: scale(1);
	}
`;

const Statement = (props: StatementProps) => {
	const { statement, author } = props;

	const words = statement.split(' ');

	return (
		<StatementWrapper>
			<Title className="type-h2">
				{words.map((word, i) => (
					<>
						<Word key={i}>
							{word.split('').map((letter, j) => (
								<Letter key={j}>{letter}</Letter>
							))}
						</Word>{' '}
					</>
				))}
			</Title>
			<Author className="type-secondary-heading-medium">{author}</Author>
		</StatementWrapper>
	);
};

const UnderstandStatements = (props: Props) => {
	const { data } = props;

	const hasData = data && data.length > 0;

	return (
		<UnderstandStatementsWrapper>
			{hasData &&
				data.map((item, i) => (
					<Statement
						statement={item?.statement}
						author={item?.author}
						key={i}
					/>
				))}
		</UnderstandStatementsWrapper>
	);
};

export default UnderstandStatements;
