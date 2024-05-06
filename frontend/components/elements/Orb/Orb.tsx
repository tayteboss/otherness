import styled from 'styled-components';
import { useMousePosition } from '../../../hooks/useMousePosition';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import throttle from 'lodash.throttle';

type StyledProps = {
	$largeOrb: boolean;
};

type Props = {
	cursorRefresh: number;
};

const OrbWrapper = styled.div<{ $isActive: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 3;
	pointer-events: none;
	mix-blend-mode: lighten;
	opacity: ${(props) => (props.$isActive ? 1 : 0)};

	transition: all var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		opacity: 0;
	}
`;

const CursorRing = styled(motion.div)<StyledProps>`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	top: ${(props) => (props.$largeOrb ? '-45px' : '-80px')};
	left: ${(props) => (props.$largeOrb ? '-45px' : '-80px')};
	height: ${(props) => (props.$largeOrb ? '90px' : '160px')};
	width: ${(props) => (props.$largeOrb ? '90px' : '160px')};
	background: #e7907f;
	border-radius: 50%;
	pointer-events: none;
	text-align: center;
	z-index: 2;
	opacity: ${(props) => (props.$largeOrb ? 0.2 : 0.5)};
	filter: ${(props) => props.$largeOrb && 'blur(5px)'};

	transition: height 500ms ease, width 500ms ease, top 500ms ease,
		left 500ms ease, filter 500ms ease;
`;

const TextWrapper = styled.div<{ $isActive: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 5;
	pointer-events: none;
	mix-blend-mode: overlay;
	opacity: ${(props) => (props.$isActive ? 0.75 : 0)};

	transition: all var(--transition-speed-default) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		opacity: 0;
	}
`;

const TextInner = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	left: -140px;
	top: -28px;
	width: 200px;
	height: 30px;
`;

const Text = styled.p`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	width: 100%;
	height: 100%;
	color: var(--colour-white);
	font-size: 1rem;
	text-decoration: uppercase;

	transition: all 1000ms var(--transition-ease);
`;

const Orb = ({ cursorRefresh }: Props) => {
	const [isOnDevice, setIsOnDevice] = useState(false);
	const [largeOrb, setLargeOrb] = useState(false);
	const [isActive, setIsActive] = useState(true);

	const router = useRouter();

	const position = useMousePosition();

	let mouseXPosition = position.x;
	let mouseYPosition = position.y;

	const variantsWrapper = {
		hidden: {
			opacity: 0,
			x: mouseXPosition,
			y: mouseYPosition
		},
		visible: {
			opacity: 1,
			x: mouseXPosition,
			y: mouseYPosition
		}
	};

	const orbVariants = {
		hidden: {
			opacity: 0,
			x: mouseXPosition,
			y: mouseYPosition
		},
		visible: {
			x: mouseXPosition,
			y: mouseYPosition,
			transition: {
				type: 'spring',
				mass: 0.1,
				stiffness: 800,
				damping: 20,
				ease: 'linear'
			}
		}
	};

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;

		if (currentScrollPos > 200) {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	};

	useEffect(() => {
		const html = document.querySelector('html');
		if (!isActive) {
			html?.classList.add('no-cursor');
		} else {
			html?.classList.remove('no-cursor');
		}
	}, [isActive]);

	useEffect(() => {
		const throttledHandleScroll = throttle(handleScroll, 100);
		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};
	}, []);

	useEffect(() => {
		const cursorLinks = document.querySelectorAll('.cursor-link');

		cursorLinks.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				setLargeOrb(true);
			});
			link.addEventListener('mouseleave', () => {
				setLargeOrb(false);
			});
		});

		// checking if on a device
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsOnDevice(true);
		} else if (
			/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
				ua
			)
		) {
			setIsOnDevice(true);
		}
	}, [cursorRefresh]);

	useEffect(() => {
		setLargeOrb(false);
	}, [router.asPath, cursorRefresh]);

	useEffect(() => {
		const html = document.querySelector('html');

		if (!isActive) {
			html?.classList.add('no-cursor');
		} else {
			html?.classList.remove('no-cursor');
		}
	}, [isActive]);

	return (
		<>
			<TextWrapper $isActive={isActive}>
				<TextInner
					variants={variantsWrapper}
					initial="hidden"
					animate="visible"
					transition={{
						type: 'spring',
						mass: 0.05,
						stiffness: 100,
						damping: 20,
						ease: 'linear'
					}}
				>
					<Text>Start scrolling</Text>
				</TextInner>
			</TextWrapper>
			<OrbWrapper $isActive={!isActive}>
				<CursorRing
					$largeOrb={largeOrb}
					variants={orbVariants}
					animate="visible"
				></CursorRing>
			</OrbWrapper>
			{/* <OrbWrapper>
				<OrbInner
					variants={variantsWrapper}
					initial="hidden"
					animate="visible"
					transition={{
						type: 'spring',
						mass: 0.05,
						stiffness: 100,
						damping: 20,
						ease: 'linear'
					}}
				>
					<Svg
						$largeOrb={largeOrb}
						width="780"
						height="780"
						viewBox="0 0 780 780"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="390"
							cy="390"
							r="390"
							fill="url(#paint0_radial_559_198)"
						/>
						<defs>
							<radialGradient
								id="paint0_radial_559_198"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(390 390) rotate(90) scale(390)"
							>
								<stop
									offset="0"
									stopColor="#FF8F5E"
									stopOpacity="1"
								/>
								<stop
									offset="1"
									stopColor="#FF8F5E"
									stopOpacity="0"
								/>
							</radialGradient>
						</defs>
					</Svg>
				</OrbInner>
			</OrbWrapper> */}
		</>
	);
};

export default Orb;
