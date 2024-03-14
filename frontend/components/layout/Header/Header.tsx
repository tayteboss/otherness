import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LogoWordMarkSvg from '../../svgs/LogoWordMarkSvg';
import HeaderNavBar from './HeaderNavBar';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';
import MobileMenuTrigger from '../../elements/MobileMenuTrigger';
import Link from 'next/link';

type Props = {
	isActive?: boolean;
	isHomeVersion?: boolean;
	mobileMenuIsActive: boolean;
	setMobileMenuIsActive: (value: boolean) => void;
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

const HeaderWrapper = styled(motion.header)<{ $isHomeVersion: boolean }>`
	background: transparent;
	padding: ${pxToRem(32)} 0 ${pxToRem(16)};
	position: ${(props) => (props.$isHomeVersion ? 'sticky' : 'fixed')};
	top: -115px;
	left: 0;
	width: 100%;
	z-index: 1000;
	mix-blend-mode: difference;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(21)} 0;
		top: 0;
	}
`;

const Inner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(16)};

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
		setMobileMenuIsActive
	} = props;

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
				>
					<LayoutWrapper>
						<Inner>
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
