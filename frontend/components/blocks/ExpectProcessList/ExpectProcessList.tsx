import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import pxToRem from '../../../utils/pxToRem';
import ProcessListCard from './ProcessListCard';
import { useInView } from 'react-intersection-observer';

type Props = {
	columns: any[];
	description: string;
	title: string;
};

const ExpectProcessListWrapper = styled.section``;

const TitleWrapper = styled.div`
	grid-column: 2 / 13;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / 13;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(40)};
	}
`;

const Title = styled.h2`
	margin-bottom: ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(16)};
	}
`;

const Description = styled.p`
	max-width: ${pxToRem(470)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		&.type-secondary-heading-medium {
			font-size: ${pxToRem(22)};
			line-height: ${pxToRem(31)};
			letter-spacing: 1.32px;
		}
	}
`;

const ListWrapper = styled.div`
	grid-column: 14 / -1;
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(58)};
	padding-top: ${pxToRem(22)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 13 / -1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		gap: ${pxToRem(32)};
		padding-top: 0;
	}
`;

const ExpectProcessList = (props: Props) => {
	const { columns, description, title } = props;

	const hasColumns = columns && columns.length > 0;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ExpectProcessListWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<LayoutGrid>
					<TitleWrapper>
						{title && <Title>{title}</Title>}
						{description && (
							<Description className="type-secondary-heading-medium">
								{description}
							</Description>
						)}
					</TitleWrapper>
					<ListWrapper>
						{hasColumns &&
							columns.map((item, i) => (
								<ProcessListCard
									title={item?.title}
									content={item?.listContent}
									key={i}
									index={i}
								/>
							))}
					</ListWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ExpectProcessListWrapper>
	);
};

export default ExpectProcessList;
