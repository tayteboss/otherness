import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

type Props = {
	items: string[];
	inView: boolean;
};

const WorkServicesListWrapper = styled.div``;

const Inner = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: ${pxToRem(32)};
	background: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: column;
		gap: ${pxToRem(8)};
		align-items: flex-start;
	}
`;

const ListWrapper = styled(motion.ul)`
	display: flex;
	gap: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		columns: 2;
		-webkit-columns: 2;
		-moz-columns: 2;
		width: 100%;
	}
`;

const ListItem = styled(motion.li)`
	font-weight: 700;
	white-space: pre;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		min-width: 50%;
		padding-right: ${pxToRem(8)};
	}
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0,
			ease: 'easeInOut',
			when: 'beforeChildren',
			staggerChildren: 0.05,
			delayChildren: 0.3
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		x: -2,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const WorkServicesList = (props: Props) => {
	const { items, inView } = props;

	const hasItems = items && items.length > 0;

	const format = (item: string) => {
		return item
			.replace(/-/g, ' ')
			.replace(/\b\w/g, (char) => char.toUpperCase());
	};

	return (
		<WorkServicesListWrapper>
			<Inner>
				<ListWrapper
					aria-label="Project services"
					variants={wrapperVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
				>
					{hasItems &&
						items.map(
							(item, i) =>
								item && (
									<ListItem
										variants={childVariants}
										className="type-secondary-heading-small"
										key={i}
									>
										{format(item)}
									</ListItem>
								)
						)}
				</ListWrapper>
			</Inner>
		</WorkServicesListWrapper>
	);
};

export default WorkServicesList;
