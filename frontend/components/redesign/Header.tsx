import Link from 'next/link';
import { RefObject, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';
import type { RedesignSettings } from '../../lib/redesign/types';
import { Navigation } from './Navigation';

const HeaderWrapper = styled.header`
	${redesignScope}
	position: fixed;
	inset: 0 0 auto;
	z-index: 1000;
	pointer-events: none;
	/* Retain the legacy header footprint consumed by Work's --header-h. */
	height: calc(85vw * 112 / 1160 + 78px);
	.logo-row {
		width: 75%;
		margin: calc(-75vw * 31 / 226 / 2) auto 0;
		pointer-events: auto;
	}
	.logo-row a {
		display: block;
	}
	.logo-row img {
		width: 100%;
		height: auto;
	}
	.header-inner {
		transition: transform 250ms ease;
	}
	nav {
		margin-top: 28px;
		pointer-events: auto;
	}
	&[data-compact='true'] .header-inner {
		transform: translateY(calc(-75vw * 31 / 226 / 2 - 16px));
	}
	&[data-compact='true'] .logo-row {
		visibility: hidden;
	}
	.menu-trigger {
		display: none;
	}
	@media (max-width: 768px) {
		height: calc(60vw * 112 / 1160 + 42px);
		.logo-row {
			width: calc(100% - 48px);
			max-width: 400px;
			margin-top: -10px;
		}
		nav {
			display: none;
		}
		.menu-trigger {
			display: block;
			pointer-events: auto;
			width: calc(100% - 48px);
			margin: 12px auto 0;
			min-height: 44px;
			font-size: 14px;
			line-height: 20px;
			font-weight: 700;
			text-transform: uppercase;
			background: #efedeb;
		}
		&[data-compact='true'] .header-inner {
			transform: translateY(
				calc(-1 * min(100vw - 48px, 400px) * 31 / 226 + 10px)
			);
		}
	}
	@media (max-width: 550px) {
		height: calc(70vw * 112 / 1160 + 42px);
	}
	@media (prefers-reduced-motion: reduce) {
		.header-inner {
			transition: none;
		}
	}
`;

export default function Header({
	settings,
	open,
	onOpen,
	triggerRef
}: {
	settings: RedesignSettings | null;
	open: boolean;
	onOpen: () => void;
	triggerRef: RefObject<HTMLButtonElement>;
}) {
	const [compact, setCompact] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const update = () => setCompact(window.scrollY > 100);
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	}, [router.asPath]);
	return (
		<HeaderWrapper
			className="header"
			data-redesign-chrome
			data-compact={compact}
		>
			<div className="header-inner">
				<div className="logo-row">
					<Link href="/" aria-label="Otherness home">
						<img
							src={
								router.pathname === '/'
									? '/redesign/brand/logo-word.svg'
									: '/redesign/brand/logo-word-dark.svg'
							}
							width="226"
							height="31"
							alt="Otherness"
						/>
					</Link>
				</div>
				<Navigation settings={settings} label="Primary" />
				<button
					className="menu-trigger"
					type="button"
					ref={triggerRef}
					aria-expanded={open}
					aria-controls="site-menu"
					aria-haspopup="dialog"
					onClick={onOpen}
				>
					Menu
				</button>
			</div>
		</HeaderWrapper>
	);
}
