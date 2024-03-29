import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LogoWordMarkSvg from '../../svgs/LogoWordMarkSvg';
import HeaderNavBar from './HeaderNavBar';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';
import MobileMenuTrigger from '../../elements/MobileMenuTrigger';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import { useRouter } from 'next/router';

type StyledProps = {
	$isHomeVersion?: boolean;
	$isFooterVersion?: boolean;
};

type Props = {
	isActive?: boolean;
	isHomeVersion?: boolean;
	mobileMenuIsActive: boolean;
	setMobileMenuIsActive: (value: boolean) => void;
	isFooterVersion?: boolean;
};

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

const HeaderWrapper = styled(motion.header)<StyledProps>`
	background: transparent;
	padding: ${(props) =>
		props.$isHomeVersion || props.$isFooterVersion
			? `${pxToRem(32)} 0 ${pxToRem(16)}`
			: '0'};
	position: ${(props) => (props.$isHomeVersion ? 'sticky' : 'fixed')};
	top: ${(props) =>
		props.$isHomeVersion
			? '-115px'
			: props.$isFooterVersion
			? 'unset'
			: '2%'};
	bottom: ${(props) => (props.$isFooterVersion ? '0' : 'unset')};
	transform: ${(props) =>
		props.$isHomeVersion || props.$isFooterVersion
			? 'unset'
			: 'translateY(-50%)'};
	left: 0;
	width: 100%;
	z-index: ${(props) => (props.$isFooterVersion ? 1 : 1000)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletLandscape} {
		top: ${(props) =>
			props.$isHomeVersion
				? '-115px'
				: props.$isFooterVersion
				? 'unset'
				: '3%'};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		top: ${(props) =>
			props.$isHomeVersion
				? '-115px'
				: props.$isFooterVersion
				? 'unset'
				: '3.5%'};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(21)} 0;
		top: 0;
		transform: unset;
		backdrop-filter: blur(5px);
		background: rgba(255, 255, 255, 0.8);
	}
`;

const Inner = styled.div<{ $isHidden: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(16)};
	transform: ${(props) => props.$isHidden && 'translateY(-100%)'};

	transition: all 500ms var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: row;
		justify-content: space-between;
		transform: ${(props) => props.$isHidden && 'translateY(0)'};
	}
`;

const LogoWrapper = styled.a`
	display: flex;
	align-items: center;

	.logo {
		width: 85vw;
		height: auto;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			width: 60vw;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			width: 70vw;
		}
	}
`;

const Header = (props: Props) => {
	const {
		isActive = true,
		isHomeVersion = false,
		mobileMenuIsActive,
		setMobileMenuIsActive,
		isFooterVersion = false
	} = props;

	const [isHidden, setIsHidden] = useState(false);

	const prevScrollPosRef = useRef(0);
	const router = useRouter();

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;

		const windowHeight = window.innerHeight;
		const documentHeight = document.body.clientHeight;

		if (currentScrollPos > documentHeight - windowHeight) {
			setIsHidden(true);
		} else {
			setIsHidden(false);
		}

		prevScrollPosRef.current = currentScrollPos;
	};

	useEffect(() => {
		setIsHidden(false);
	}, [router]);

	useEffect(() => {
		const throttledHandleScroll = throttle(handleScroll, 100);
		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};
	}, []);

	return (
		<AnimatePresence>
			{isActive && (
				<HeaderWrapper
					className={isFooterVersion ? 'footer-header' : 'header'}
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					$isHomeVersion={isHomeVersion}
					$isFooterVersion={isFooterVersion}
				>
					<LayoutWrapper>
						<Inner $isHidden={isHidden && !isFooterVersion}>
							<Link
								href="/"
								passHref
								legacyBehavior
								scroll={false}
							>
								<LogoWrapper>
									<LogoWordMarkSvg colour="var(--colour-black)" />
								</LogoWrapper>
							</Link>
							<HeaderNavBar />
							<MobileMenuTrigger
								mobileMenuIsActive={mobileMenuIsActive}
								setMobileMenuIsActive={setMobileMenuIsActive}
							/>
						</Inner>
					</LayoutWrapper>
				</HeaderWrapper>
			)}
		</AnimatePresence>
	);
};

export default Header;
