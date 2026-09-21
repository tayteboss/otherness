import Link from 'next/link';
import { RefObject, useEffect, useRef, useState } from 'react';
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
	&[data-way-hero='true'] nav a {
		background: transparent;
		color: white;
	}
	&[data-way-hero='true'] nav a[aria-current='page'],
	&[data-way-hero='true'] nav a:hover {
		background: white;
		color: var(--redesign-ink);
	}
	.landing-icon {
		display: none;
	}
	&[data-home='true'] {
		.header-inner {
			position: absolute;
			top: var(--home-top, calc(100svh - 132px));
			width: 100%;
			transition: none;
		}
		.logo-row {
			width: var(--home-width, 226px);
			max-width: none;
			margin-top: var(--home-crop, 0px);
		}
		.landing-icon {
			display: block;
			position: absolute;
			width: 48px;
			height: 28px;
			left: calc(50% - 24px);
			top: -58px;
			opacity: var(--home-icon, 1);
		}
		nav {
			margin-top: 28px;
		}
		&[data-compact='true'] .header-inner {
			top: 16px;
			transform: none;
		}
		&[data-compact='true'] .logo-row,
		&[data-compact='true'] .landing-icon {
			display: none;
		}
		&[data-compact='true'] nav {
			margin-top: 0;
		}
	}
	@media (max-width: 768px) {
		&[data-home='true'] {
			.header-inner {
				top: var(--home-top, calc(100svh - 108px));
			}
			.logo-row {
				width: var(--home-width, 174px);
			}
			.landing-icon {
				width: 40px;
				height: 24px;
				left: calc(50% - 20px);
				top: -46px;
			}
			.menu-trigger {
				margin-top: 24px;
			}
			&[data-compact='true'] .menu-trigger {
				margin-top: 0;
			}
		}
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
	const [overLanding, setOverLanding] = useState(true);
	const headerRef = useRef<HTMLElement>(null);
	const router = useRouter();
	const home = router.pathname === '/';
	const ourWay = router.pathname === '/our-way';
	useEffect(() => {
		let frame = 0;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => {
			frame = 0;
			if (!home) {
				setCompact(window.scrollY > 100);
				const hero = document.querySelector<HTMLElement>(
					'[data-our-way-hero]'
				);
				setOverLanding(
					ourWay &&
						window.scrollY <
							(hero?.offsetHeight || window.innerHeight) - 100
				);
				return;
			}
			const header = headerRef.current;
			const landing = document.querySelector<HTMLElement>(
				'[data-home-landing]'
			);
			const height = landing?.offsetHeight || window.innerHeight;
			const mobile = window.innerWidth <= 768;
			const scroll = Math.max(0, window.scrollY);
			const progress = reduced.matches
				? scroll > 40
					? 1
					: 0
				: Math.min(1, scroll / (height * 0.7));
			const startWidth = mobile ? 174 : 226;
			const endWidth = mobile
				? Math.min(window.innerWidth - 48, 400)
				: window.innerWidth * 0.75;
			header?.style.setProperty(
				'--home-width',
				`${startWidth + (endWidth - startWidth) * progress}px`
			);
			header?.style.setProperty(
				'--home-top',
				`${(height - (mobile ? 108 : 132)) * (1 - progress)}px`
			);
			header?.style.setProperty(
				'--home-crop',
				`${(mobile ? -10 : (-endWidth * 31) / 226 / 2) * progress}px`
			);
			header?.style.setProperty(
				'--home-icon',
				String(Math.max(0, 1 - progress * 4))
			);
			setCompact(scroll > height * 0.9);
			setOverLanding(scroll < height - 100);
		};
		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		reduced.addEventListener('change', schedule);
		const observer = new ResizeObserver(schedule);
		const landing = document.querySelector('[data-home-landing]');
		if (landing) observer.observe(landing);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			reduced.removeEventListener('change', schedule);
			observer.disconnect();
		};
	}, [router.asPath, home, ourWay]);
	return (
		<HeaderWrapper
			className="header"
			ref={headerRef}
			data-home={home}
			data-way-hero={ourWay && overLanding}
			data-redesign-chrome
			data-compact={compact}
		>
			<div className="header-inner">
				{home && (
					<img
						className="landing-icon"
						src="/redesign/brand/logo-icon.svg"
						width="48"
						height="28"
						alt=""
						aria-hidden="true"
					/>
				)}
				<div className="logo-row">
					<Link href="/" aria-label="Otherness home">
						<img
							src={
								(home || ourWay) && overLanding
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
