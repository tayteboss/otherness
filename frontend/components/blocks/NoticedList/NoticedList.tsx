import styled from 'styled-components';
import { NoticedType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import NoticedCard from '../NoticedCard';
import { useInView } from 'react-intersection-observer';

type Props = {
	data: NoticedType[];
};

const NoticedListWrapper = styled.section`
	background: var(--colour-beige-light);
	padding: ${pxToRem(48)} 0 ${pxToRem(80)};
`;

const Title = styled.h3`
	margin-bottom: ${pxToRem(16)};
`;

const ListWrapper = styled.div<{ $inView: boolean }>`
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: ${(props) => (props.$inView ? '100%' : '0')};
		height: 1px;
		background: var(--colour-black);

		transition: all 2000ms var(--transition-ease);
	}
`;

const NoticedList = (props: Props) => {
	const { data } = props;

	const hasData = data.length > 0;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<NoticedListWrapper ref={ref}>
			<LayoutWrapper>
				<Title
					className={`type-secondary-heading-large view-element-fade-in ${
						inView ? 'view-element-fade-in--in-view' : ''
					}`}
				>
					Noticed
				</Title>
				<ListWrapper $inView={inView}>
					{hasData &&
						data.map((item, i) => (
							<NoticedCard
								year={item?.year}
								title={item?.title}
								thumbnailImage={item?.thumbnailImage}
								source={item?.source}
								url={item?.url}
								key={i}
							/>
						))}
				</ListWrapper>
			</LayoutWrapper>
		</NoticedListWrapper>
	);
};

export default NoticedList;
