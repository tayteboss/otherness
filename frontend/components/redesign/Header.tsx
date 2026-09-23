import Link from 'next/link';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useIsPresent } from 'framer-motion';
import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';
import type { RedesignSettings } from '../../lib/redesign/types';
import { Navigation } from './Navigation';
import { HeaderGlassFilter, headerGlass } from './HeaderGlass';

const HeaderWrapper = styled.header`
	${redesignScope}
	position: fixed;
	inset: 0 0 auto;
	z-index: 1000;
	opacity: var(--footer-header-opacity, 1);
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
		position: relative;
	}
	.logo-row img {
		width: 100%;
		height: auto;
		transition: opacity 300ms ease;
	}
	.logo-row .wordmark-light {
		position: absolute;
		inset: 0;
		opacity: 0;
	}
	&[data-light-wordmark='true'] .wordmark-light {
		opacity: 1;
	}
	&[data-light-wordmark='true'] .wordmark-dark {
		opacity: 0;
	}
	nav {
		margin-top: 28px;
		pointer-events: auto;
	}
	.menu-trigger {
		display: none;
	}
	@media (max-width: 768px) {
		height: calc(60vw * 112 / 1160 + 42px);
		.logo-row {
			width: calc(100% - 48px);
			max-width: 400px;
			margin-top: calc(min(100vw - 48px, 400px) * -31 / 226 / 2);
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
	}
	@media (max-width: 550px) {
		height: calc(70vw * 112 / 1160 + 42px);
	}
	nav a,
	.menu-trigger {
		${headerGlass}
		transition: background-color 300ms ease, color 300ms ease;
	}
	--header-active-background: var(--redesign-ink);
	--header-active-color: #fff;
	&[data-light-navigation='true'] {
		--header-active-background: #fff;
		--header-active-color: var(--redesign-ink);
		nav a,
		.menu-trigger {
			color: #fff;

			@media (prefers-reduced-transparency: reduce) {
				--header-glass-idle: #242424;
				--header-glass-hover: #333;
				--header-glass-active: #444;
			}
			@media (forced-colors: active) {
				--header-glass-idle: ButtonFace;
				--header-glass-hover: ButtonFace;
				--header-glass-active: ButtonFace;
				color: ButtonText;
			}
		}
	}
	nav a[aria-current='page'] {
		background: var(--header-active-background);
		color: var(--header-active-color);
		text-decoration: none;
		box-shadow: none;
		-webkit-backdrop-filter: none;
		backdrop-filter: none;
	}
	@media (forced-colors: active) {
		nav a[aria-current='page'] {
			background: Highlight;
			color: HighlightText;
		}
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
	}
	@media (max-width: 768px) {
		&[data-home='true'] {
			.header-inner {
				top: 0;
				transform: translate3d(0, var(--home-top, calc(100svh - 108px)), 0);
			}
			.logo-row {
				width: var(--home-base-width, 174px);
				margin-top: 0;
				transform-origin: center top;
				transform: translate3d(0, var(--home-crop, 0px), 0)
					scale(var(--home-scale, 1));
				will-change: transform;
			}
			.landing-icon {
				width: 40px;
				height: 24px;
				left: calc(50% - 20px);
				top: -46px;
			}
			.menu-trigger {
				transform: translate3d(0, var(--home-nav-y, 0px), 0);
				margin-top: 12px;
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.header-inner,
		.logo-row img,
		nav a,
		.menu-trigger {
			transition: none;
		}
	}
`;

export default function Header({
	settings,
	open,
	onOpen,
	triggerRef,
	routePath
}: {
	settings: RedesignSettings | null;
	open: boolean;
	onOpen: () => void;
	triggerRef: RefObject<HTMLButtonElement>;
	routePath: string;
}) {
	const home = routePath === '/';
	const ourWay = routePath === '/our-way';
	const [lightWordmark, setLightWordmark] = useState(home || ourWay);
	const [lightNavigation, setLightNavigation] = useState(home || ourWay);
	const headerRef = useRef<HTMLElement>(null);
	const present = useIsPresent();
	useEffect(() => {
		// Keep the outgoing page's colour and geometry until its fade finishes.
		if (!present) return;
		let frame = 0;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => {
			frame = 0;
			// Body locking must not reset the visible header to its landing position.
			if (document.querySelector<HTMLDialogElement>('#site-menu')?.open)
				return;
			const header = headerRef.current;
			const footer = document.querySelector(
				'footer .footer-main:not(.contact-meta)'
			);
			const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
			const fade = Math.min(
				1,
				Math.max(
					0,
					(window.innerHeight * 0.7 - footerTop) /
						(window.innerHeight * 0.45)
				)
			);
			const opacity = reduced.matches
				? fade >= 1
					? 0
					: 1
				: 1 - fade * fade * (3 - 2 * fade);
			header?.style.setProperty(
				'--footer-header-opacity',
				String(opacity)
			);
			header?.toggleAttribute('inert', opacity === 0);
			if (!home) {
				// Later sections cover the parallax hero. Sample each header row
				// separately so the menu can cross a boundary before the wordmark.
				const sections = Array.from(
					document.querySelectorAll<HTMLElement>(
						'[data-header-theme], footer .footer-main'
					)
				).reverse();
				const overDarkSection = (selector: string) => {
					const row = header
						?.querySelector(selector)
						?.getBoundingClientRect();
					if (!ourWay || !row) return false;
					const midpoint = (Math.max(0, row.top) + row.bottom) / 2;
					const section = sections.find((element) => {
						const bounds = element.getBoundingClientRect();
						return (
							bounds.top <= midpoint && bounds.bottom > midpoint
						);
					});
					return (
						section?.dataset.headerTheme === 'dark' ||
						section?.classList.contains('footer-main') === true
					);
				};
				setLightWordmark(overDarkSection('.logo-row'));
				setLightNavigation(
					overDarkSection(
						window.innerWidth <= 768 ? '.menu-trigger' : 'nav'
					)
				);
				return;
			}
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
			const width = startWidth + (endWidth - startWidth) * progress;
			const endHeight = (endWidth * 31) / 226;
			const crop = (-endHeight / 2) * progress;
			// Mobile keeps expanded layout dimensions and transforms on scroll.
			header?.style.setProperty('--home-width', `${width}px`);
			header?.style.setProperty('--home-base-width', `${endWidth}px`);
			header?.style.setProperty('--home-scale', String(width / endWidth));
			header?.style.setProperty(
				'--home-top',
				`${(height - (mobile ? 108 : 132)) * (1 - progress)}px`
			);
			header?.style.setProperty(
				'--home-crop',
				`${crop}px`
			);
			header?.style.setProperty(
				'--home-nav-y',
				`${(width * 31) / 226 + crop - endHeight}px`
			);
			header?.style.setProperty(
				'--home-icon',
				String(Math.max(0, 1 - progress * 4))
			);
			const logoMidpoint = (endWidth * 31) / 226 / 4;
			const overDarkSection = Array.from(
				document.querySelectorAll(
					'#services, #results, footer .footer-main'
				)
			).some((section) => {
				const bounds = section.getBoundingClientRect();
				return (
					bounds.top <= logoMidpoint && bounds.bottom > logoMidpoint
				);
			});
			setLightWordmark(scroll < height - 100 || overDarkSection);
			setLightNavigation(scroll < height - 100 || overDarkSection);
		};
		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		reduced.addEventListener('change', schedule);
		const observer = new ResizeObserver(schedule);
		const landing = document.querySelector(
			'[data-home-landing], [data-our-way-hero]'
		);
		if (landing) observer.observe(landing);
		observer.observe(document.body);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			reduced.removeEventListener('change', schedule);
			observer.disconnect();
		};
	}, [present, home, ourWay]);
	return (
		<HeaderWrapper
			className="header"
			ref={headerRef}
			data-home={home}
			data-way-hero={ourWay && lightWordmark}
			data-light-wordmark={(home || ourWay) && lightWordmark}
			data-light-navigation={(home || ourWay) && lightNavigation}
			data-redesign-chrome
		>
			<HeaderGlassFilter />
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
					<Link href="/" scroll={home} aria-label="Otherness home">
						<img
							className="wordmark-dark"
							src="/redesign/brand/logo-word-dark.svg"
							width="226"
							height="31"
							alt="Otherness"
						/>
						<img
							className="wordmark-light"
							src="/redesign/brand/logo-word.svg"
							width="226"
							height="31"
							alt=""
							aria-hidden="true"
						/>
					</Link>
				</div>
				<Navigation
					settings={settings}
					label="Primary"
					routePath={routePath}
				/>
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
