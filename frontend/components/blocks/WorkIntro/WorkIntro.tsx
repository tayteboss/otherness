import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { useInView } from 'react-intersection-observer';
import WorkServicesList from '../WorkServicesList';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

type Props = {
	excerpt: string;
	tagline: string;
	types: string[];
};

const WorkIntroWrapper = styled.section`
	margin-bottom: ${pxToRem(72)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(48)};
	}
`;

const Inner = styled.div`
	grid-column: 4 / -4;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / -1;
	}
`;

const Tagline = styled(motion.h3)`
	margin-bottom: ${pxToRem(24)};
`;

const Excerpt = styled(motion.h5)`
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
		<WorkIntroWrapper ref={ref}>
			<LayoutWrapper>
				<LayoutGrid>
					<Inner>
						{tagline && (
							<Tagline
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: {
										duration: 0.3,
										ease: 'easeInOut'
									}
								}}
							>
								{tagline}
							</Tagline>
						)}
						{excerpt && (
							<Excerpt
								className="type-secondary-heading-medium"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: {
										duration: 0.3,
										ease: 'easeInOut',
										delay: 0.25
									}
								}}
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
