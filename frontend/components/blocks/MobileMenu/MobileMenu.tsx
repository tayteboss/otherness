import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import PrimaryButton from '../../elements/PrimaryButton';

type Props = {
	isActive: boolean;
	setMobileMenuIsActive: (value: boolean) => void;
	cta: string;
	buttonUrl: string;
	buttonTitle: string;
};

const wrapperVariants = {
	hidden: {
		opacity: 0,
		height: 0,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			when: 'afterChildren'
		}
	},
	visible: {
		opacity: 1,
		height: 'auto',
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
			when: 'beforeChildren'
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	}
};

const MobileMenuWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: var(--colour-white);
	z-index: 900;
`;

const Inner = styled(motion.div)`
	padding-top: calc(var(--header-h) + 64px);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100dvh;
`;

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(8)};
	padding: 0 ${pxToRem(24)};
`;

const LinkTag = styled.a`
	padding: ${pxToRem(8)} 0;
	font-size: ${pxToRem(16)};
	line-height: ${pxToRem(19)};
	letter-spacing: 1.28px;
	text-transform: uppercase;
`;

const CtaWrapper = styled.div`
	background: var(--colour-black);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: ${pxToRem(48)} ${pxToRem(40)};
	gap: ${pxToRem(32)};

	.primary-button {
		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			width: 100%;
		}
	}
`;

const CtaTitle = styled.h4`
	color: var(--colour-white);
	text-align: center;
	max-width: ${pxToRem(320)};
	margin: 0 auto;
`;

const MobileMenu = (props: Props) => {
	const { isActive, setMobileMenuIsActive, cta, buttonUrl, buttonTitle } =
		props;

	return (
		<AnimatePresence>
			{isActive && (
				<MobileMenuWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<Inner variants={childVariants}>
						<ListWrapper>
							<Link
								href="/"
								passHref
								legacyBehavior
								scroll={false}
							>
								<LinkTag
									onClick={() => setMobileMenuIsActive(false)}
								>
									Home
								</LinkTag>
							</Link>
							<Link
								href="/what-to-expect"
								passHref
								legacyBehavior
								scroll={false}
							>
								<LinkTag
									onClick={() => setMobileMenuIsActive(false)}
								>
									Things You Can Expect
								</LinkTag>
							</Link>
							{/* <Link
								href="/"
								passHref
								legacyBehavior
								scroll={false}
							>
								<LinkTag
									onClick={() => setMobileMenuIsActive(false)}
								>
									Things We Understand
								</LinkTag>
							</Link> */}
							<Link
								href="/work"
								passHref
								legacyBehavior
								scroll={false}
							>
								<LinkTag
									onClick={() => setMobileMenuIsActive(false)}
								>
									Work We Do
								</LinkTag>
							</Link>
							<Link
								href="/conversations"
								passHref
								legacyBehavior
								scroll={false}
							>
								<LinkTag
									onClick={() => setMobileMenuIsActive(false)}
								>
									Conversations We Need To Have
								</LinkTag>
							</Link>
						</ListWrapper>
						<CtaWrapper>
							{cta && <CtaTitle>{cta}</CtaTitle>}
							{buttonUrl && buttonTitle && (
								<PrimaryButton url={buttonUrl}>
									{buttonTitle}
								</PrimaryButton>
							)}
						</CtaWrapper>
					</Inner>
				</MobileMenuWrapper>
			)}
		</AnimatePresence>
	);
};

export default MobileMenu;
