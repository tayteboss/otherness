import styled from 'styled-components';
import { SubProjectType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useLenis } from '@studio-freight/react-lenis';
import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	subProjects: SubProjectType[];
};

const SubProjectsNavigationWrapper = styled(motion.div)`
	position: fixed;
	top: 50%;
	right: ${pxToRem(8)};
	transform: translateY(-50%);
	writing-mode: vertical-rl;
	text-orientation: mixed;
	z-index: 3;
	display: flex;
	gap: ${pxToRem(24)};
	mix-blend-mode: difference;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const LinkTrigger = styled.button<{ $isActive: boolean }>`
	color: var(--colour-white);
	opacity: 0.4;
	position: relative;
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(14)};
	letter-spacing: 0.96px;
	text-transform: uppercase;

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
		top: 50%;
		left: -5px;
		transform: translateY(-50%);
		height: 4px;
		width: 4px;
		background: var(--colour-white);
		border-radius: 100px;
		opacity: 0;

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

const SubProjectsNavigation = (props: Props) => {
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
				</SubProjectsNavigationWrapper>
			)}
		</AnimatePresence>
	);
};

export default SubProjectsNavigation;
