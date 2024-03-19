import styled from 'styled-components';
import { PortableText } from '@portabletext/react';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	title: string;
	content: [];
	index: number;
};

const ProcessListCardWrapper = styled(motion.div)`
	display: flex;
`;

const Index = styled(motion.span)`
	min-width: ${pxToRem(155)};
	margin-right: ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		min-width: ${pxToRem(100)};
		margin-right: ${pxToRem(8)};

		&.type-h2 {
			font-size: ${pxToRem(55)};
			line-height: ${pxToRem(51)};
			letter-spacing: -0.4px;
			font-weight: 200;
		}
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		min-width: ${pxToRem(56)};
		margin-right: ${pxToRem(24)};

		&.type-h2 {
			font-size: ${pxToRem(46)};
			line-height: ${pxToRem(59)};
			letter-spacing: -0.69px;
		}
	}
`;

const ContentWrapper = styled(motion.div)`
	padding-top: ${pxToRem(21)};
	max-width: ${pxToRem(333)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		padding-top: 0;
		max-width: 100%;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: ${pxToRem(8)};
	}
`;

const Title = styled.h5`
	margin-bottom: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(8)};
	}
`;

const RichTextWrapper = styled.div`
	* {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(14)};
		line-height: ${pxToRem(21)};
		letter-spacing: 0.14px;
	}
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	}
};

const indexVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const contentVariants = {
	hidden: {
		opacity: 0,
		x: -10,
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

const ProcessListCard = (props: Props) => {
	const { title, content, index } = props;

	let formattedIndex: string | number = index + 1;

	if (formattedIndex < 10) {
		formattedIndex = `0${formattedIndex}`;
	}

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ProcessListCardWrapper
			ref={ref}
			variants={wrapperVariants}
			initial="hidden"
			animate={inView ? 'visible' : 'hidden'}
		>
			<Index variants={indexVariants} key={1} className="type-h2">
				{formattedIndex}
			</Index>
			<ContentWrapper variants={contentVariants} key={2}>
				{title && <Title className="type-h5">{title}</Title>}
				{content && (
					<RichTextWrapper>
						<PortableText value={content} />
					</RichTextWrapper>
				)}
			</ContentWrapper>
		</ProcessListCardWrapper>
	);
};

export default ProcessListCard;
