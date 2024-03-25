import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';

type Props = {
	title: string;
	handleLoadMore: () => void;
	isActive: boolean;
};

const LoadMoreOuter = styled.div``;

const LoadMoreWrapper = styled.button`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${pxToRem(12)} ${pxToRem(32)};
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
	color: var(--colour-white);
	background: var(--colour-black);

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 0.85;
	}
`;

const Inner = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: ${pxToRem(32)};
`;

const LoadMore = (props: Props) => {
	const { title, handleLoadMore, isActive } = props;

	return (
		<LoadMoreOuter className="load-more">
			{isActive && (
				<LayoutWrapper>
					<Inner>
						<LoadMoreWrapper onClick={() => handleLoadMore()}>
							{title}
						</LoadMoreWrapper>
					</Inner>
				</LayoutWrapper>
			)}
		</LoadMoreOuter>
	);
};

export default LoadMore;
