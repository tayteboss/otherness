import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useMousePosition } from '../../../hooks/useMousePosition';

type Props = {
	isActive: boolean;
	children: React.ReactNode;
	isOdd: boolean;
};

const MotionWrapper = styled(motion.div)`
	position: absolute;
	top: -75%;
	left: -50%;
	z-index: 2;
	pointer-events: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const MediaCursorLayout = (props: Props) => {
	const { children, isActive, isOdd } = props;

	const position = useMousePosition();

	let mouseXPosition = isOdd ? position.x / 2.4 : position.x * 1.05;
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

export default MediaCursorLayout;
