import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import WorkServicesList from '../WorkServicesList';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Props = {
	excerpt: string;
	tagline: string;
	types: string[];
};

const WorkIntroWrapper = styled.section`
	background: var(--colour-white);
	position: relative;
	z-index: 5;
	padding-bottom: ${pxToRem(72)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-bottom: ${pxToRem(48)};
	}
`;

const Inner = styled.div`
	grid-column: 4 / -4;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / -1;
	}
`;

const Tagline = styled.h3`
	margin-bottom: ${pxToRem(24)};
`;

const Excerpt = styled.h5`
	margin-bottom: ${pxToRem(56)};
`;

const WorkIntro = (props: Props) => {
	const { excerpt, tagline, types } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<WorkIntroWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<Inner>
						{tagline && <Tagline>{tagline}</Tagline>}
						{excerpt && (
							<Excerpt
								className="type-secondary-heading-medium"
								ref={ref}
							>
								{excerpt}
							</Excerpt>
						)}
						<WorkServicesList inView={inView} items={types} />
					</Inner>
				</LayoutGrid>
			</LayoutWrapper>
		</WorkIntroWrapper>
	);
};

export default WorkIntro;
