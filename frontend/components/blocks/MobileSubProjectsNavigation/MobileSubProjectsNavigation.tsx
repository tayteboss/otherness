import { useLenis } from '@studio-freight/react-lenis';
import throttle from 'lodash.throttle';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SubProjectType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	subProjects: SubProjectType[];
};

const SubProjectsNavigationWrapper = styled(motion.div)`
	position: sticky;
	top: var(--header-h);
	left: 0;
	width: 100%;
	z-index: 3;
	display: none;
	backdrop-filter: blur(5px);
	background: rgba(255, 255, 255, 0.5);

	&::after {
		content: '';
		width: ${pxToRem(52)};
		height: 100%;
		background: linear-gradient(
			270deg,
			#fff 0%,
			rgba(255, 255, 255, 0) 100%
		);
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const Inner = styled.div`
	display: flex;
	gap: ${pxToRem(16)};
	-ms-overflow-style: none;
	scrollbar-width: none;
	width: 100%;
	overflow: auto;
	padding: ${pxToRem(16)} ${pxToRem(40)} ${pxToRem(16)} ${pxToRem(16)};

	&::-webkit-scrollbar {
		display: none;
	}
`;

const LinkTrigger = styled.button<{ $isActive: boolean }>`
	color: var(--colour-black);
	opacity: 0.8;
	position: relative;
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(14)};
	letter-spacing: 0.96px;
	text-transform: uppercase;
	white-space: nowrap;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 1;
	}

	&.active {
		opacity: 1;

		&::after {
			opacity: 1;
		}
	}

	&::after {
		content: '';
		position: absolute;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);
		height: 4px;
		width: 4px;
		background: var(--colour-black);
		border-radius: 100px;
		opacity: 0;
		z-index: 2;

		transition: all var(--transition-speed-default) var(--transition-ease);
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
			ease: 'easeInOut'
		}
	}
};

const MobileSubProjectsNavigation = (props: Props) => {
	const { subProjects } = props;

	const [isHidden, setIsHidden] = useState(false);

	const prevScrollPosRef = useRef(0);

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;

		const windowHeight = window.innerHeight;
		const documentHeight = document.body.clientHeight;

		if (currentScrollPos > documentHeight - windowHeight * 2) {
			setIsHidden(true);
		} else {
			setIsHidden(false);
		}

		prevScrollPosRef.current = currentScrollPos;
	};

	useEffect(() => {
		const throttledHandleScroll = throttle(handleScroll, 100);
		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};
	}, []);

	const hasSubProjects = subProjects?.length > 0;

	const lenis = useLenis(({ scroll }) => {});

	const formatId = (label: string) => {
		if (!label) return;
		return label.replace(/\s+/g, '-').toLowerCase();
	};

	const handleScrollToAnchor = (id: string | undefined, offset = -100) => {
		if (!lenis) return;
		lenis.scrollTo(`#${id}`, { offset: offset });
	};

	return (
		<AnimatePresence>
			{hasSubProjects && !isHidden && (
				<SubProjectsNavigationWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<Inner>
						<LinkTrigger
							key={0}
							$isActive={true}
							onClick={() =>
								handleScrollToAnchor('project-intro', -150)
							}
							className="sub-project-link"
							data-id={'project-intro'}
						>
							Intro
						</LinkTrigger>
						{subProjects.map((item, i) => (
							<LinkTrigger
								key={i + 1}
								$isActive={false}
								onClick={() =>
									handleScrollToAnchor(
										formatId(item?.label ?? '')
									)
								}
								className="sub-project-link"
								data-id={formatId(item?.label ?? '')}
							>
								{item?.label || ''}
							</LinkTrigger>
						))}
					</Inner>
				</SubProjectsNavigationWrapper>
			)}
		</AnimatePresence>
	);
};

export default MobileSubProjectsNavigation;
