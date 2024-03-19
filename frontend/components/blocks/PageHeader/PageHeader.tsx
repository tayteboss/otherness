import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	data: string;
};

const PageHeaderWrapper = styled.section``;

const Inner = styled.div<{ $inView: boolean }>`
	padding: 0 0 ${pxToRem(8)};
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(24)} 0 ${pxToRem(8)};
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: ${(props) => (props.$inView ? '100%' : '0')};
		height: 1px;
		background: var(--colour-beige-light);

		transition: all 2000ms var(--transition-ease);
	}
`;

const Title = styled.h1`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(46)};
		line-height: ${pxToRem(59)};
		letter-spacing: -0.69px;
	}
`;

const PageHeader = (props: Props) => {
	const { data } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<PageHeaderWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<Inner $inView={inView}>
					<Title>{data || ''}</Title>
				</Inner>
			</LayoutWrapper>
		</PageHeaderWrapper>
	);
};

export default PageHeader;
