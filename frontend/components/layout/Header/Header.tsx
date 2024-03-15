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
	padding: ${pxToRem(32)} 0 ${pxToRem(16)};
	position: ${(props) => (props.$isHomeVersion ? 'sticky' : 'fixed')};
	top: ${(props) => (props.$isFooterVersion ? 'unset' : '-115px')};
	bottom: ${(props) => (props.$isFooterVersion ? '0' : 'unset')};
	left: 0;
	width: 100%;
	z-index: ${(props) => (props.$isFooterVersion ? 1 : 1000)};
	mix-blend-mode: difference;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(21)} 0;
		top: 0;
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
	}
`;

const LogoWrapper = styled.a`
	display: flex;
	align-items: center;

	.logo {
		width: 90vw;
		height: auto;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			width: 60vw;
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			width: 73vw;
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

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;

		const windowHeight = window.innerHeight;
		const documentHeight = document.body.clientHeight;

		if (
			currentScrollPos >
			documentHeight - windowHeight - windowHeight / 2
		) {
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

	return (
		<AnimatePresence>
			{isActive && (
				<HeaderWrapper
					className="header"
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					$isHomeVersion={isHomeVersion}
					$isFooterVersion={isFooterVersion}
				>
					<LayoutWrapper>
						<Inner $isHidden={isHidden && !isFooterVersion}>
							<Link href="/" passHref legacyBehavior>
								<LogoWrapper>
									<LogoWordMarkSvg colour="#FFFFFF" />
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
