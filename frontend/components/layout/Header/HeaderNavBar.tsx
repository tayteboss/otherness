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
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(5px);
	z-index: 1;
`;

const LinkTag = styled.a`
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(14)};
	letter-spacing: 0.96px;
	text-transform: uppercase;
	padding: ${pxToRem(8)} ${pxToRem(16)};
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(25px);
	position: relative;
	z-index: 2;
	white-space: pre;
	color: var(--colour-black);

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		background: rgba(255, 255, 255, 0.65);

		&::after {
			opacity: 1;
		}
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--colour-black);
		opacity: 0;

		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		padding: ${pxToRem(8)};
	}
`;

const HeaderNavBar = () => {
	return (
		<HeaderNavBarWrapper>
			<Inner>
				<BackdropBar />
				<Link
					href="/what-to-expect"
					passHref
					legacyBehavior
					scroll={false}
				>
					<LinkTag>What to expect</LinkTag>
				</Link>
				{/* <Link href="/" passHref legacyBehavior scroll={false}>
					<LinkTag>Things We Understand</LinkTag>
				</Link> */}
				<Link href="/work" passHref legacyBehavior scroll={false}>
					<LinkTag>Work We Do</LinkTag>
				</Link>
				<Link
					href="/conversations"
					passHref
					legacyBehavior
					scroll={false}
				>
					<LinkTag>Conversations To Have</LinkTag>
				</Link>
			</Inner>
		</HeaderNavBarWrapper>
	);
};

export default HeaderNavBar;
