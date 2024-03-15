import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

const HeaderNavBarWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const Inner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(8)};
	padding: ${pxToRem(16)};
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		gap: ${pxToRem(4)};
	}
`;

const BackdropBar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(42px);
	z-index: 1;
`;

const LinkTag = styled.a`
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(14)};
	letter-spacing: 0.96px;
	text-transform: uppercase;
	padding: ${pxToRem(8)} ${pxToRem(16)};
	backdrop-filter: blur(17px);
	position: relative;
	z-index: 2;
	white-space: pre;
	color: var(--colour-white);
	mix-blend-mode: difference;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		padding: ${pxToRem(8)};
	}
`;

const HeaderNavBar = () => {
	return (
		<HeaderNavBarWrapper>
			<Inner>
				<BackdropBar />
				<Link href="/what-to-expect" passHref legacyBehavior>
					<LinkTag>Things You Can Expect</LinkTag>
				</Link>
				<Link href="/" passHref legacyBehavior>
					<LinkTag>Things We Understand</LinkTag>
				</Link>
				<Link href="/work" passHref legacyBehavior>
					<LinkTag>Work We Do</LinkTag>
				</Link>
				<Link href="/conversations" passHref legacyBehavior>
					<LinkTag>Conversations We Need To Have</LinkTag>
				</Link>
			</Inner>
		</HeaderNavBarWrapper>
	);
};

export default HeaderNavBar;