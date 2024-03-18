import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useMousePosition } from '../../../hooks/useMousePosition';

type Props = {
	isActive: boolean;
	children: React.ReactNode;
};

const MotionWrapper = styled(motion.div)`
	position: fixed;
	top: -10vw;
	left: -10vw;
	z-index: 1;
	pointer-events: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const NoticedCursorLayout = (props: Props) => {
	const { children, isActive } = props;

	const position = useMousePosition();

	let mouseXPosition = position.x;
	let mouseYPosition = position.y;

	const wrapperVariants = {
		hidden: {
			opacity: 0,
			x: mouseXPosition,
			y: mouseYPosition,
			transition: {
				type: 'spring',
				mass: 0.2,
				stiffness: 100,
				damping: 10,
				ease: 'easeInOut'
			}
		},
		visible: {
			opacity: 1,
			x: mouseXPosition,
			y: mouseYPosition,
			transition: {
				type: 'spring',
				mass: 0.2,
				stiffness: 100,
				damping: 10,
				ease: 'easeInOut'
			}
		}
	};

	return (
		<AnimatePresence>
			{isActive && (
				<MotionWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					{children}
				</MotionWrapper>
			)}
		</AnimatePresence>
	);
};

export default NoticedCursorLayout;
