import { MouseEvent, RefObject, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLenis } from '@studio-freight/react-lenis';
import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';
import type { RedesignSettings } from '../../lib/redesign/types';
import { Navigation } from './Navigation';

const Panel = styled.dialog`
	${redesignScope}
	position: fixed;
	inset: 0;
	width: 100%;
	max-width: none;
	height: 100%;
	height: 100dvh;
	max-height: none;
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	color: #000;
	overflow-y: auto;
	overscroll-behavior: contain;
	touch-action: pinch-zoom;
	&::backdrop {
		background: transparent;
	}
	.menu-controls {
		position: absolute;
		top: var(--menu-top);
		left: 24px;
		right: 24px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	&[data-upward='true'] .menu-controls {
		top: auto;
		bottom: var(--menu-bottom);
		flex-direction: column-reverse;
	}
	button,
	nav a {
		width: 100%;
		min-height: 44px;
		padding: 12px;
		font-size: 14px;
		line-height: 20px;
		font-weight: 700;
		text-transform: uppercase;
	}
	button {
		background: #000;
		color: #fff;
	}
	nav > div {
		flex-direction: column;
		gap: 8px;
	}
	nav a {
		background: rgba(235, 232, 229, 0.8);
		color: #000;
	}
	&[open] nav {
		animation: menu-enter 250ms ease-out;
	}
	&[data-upward='true'] {
		--menu-enter-y: 8px;
	}
	@keyframes menu-enter {
		from {
			opacity: 0;
			transform: translateY(var(--menu-enter-y, -8px));
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (prefers-reduced-transparency: reduce) {
		nav a {
			background: #ebe8e5;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		&[open] nav {
			animation: none;
		}
	}
`;

export default function MobileMenu({
	settings,
	open,
	onClose,
	triggerRef
}: {
	settings: RedesignSettings | null;
	open: boolean;
	onClose: () => void;
	triggerRef: RefObject<HTMLButtonElement>;
}) {
	const panelRef = useRef<HTMLDialogElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const router = useRouter();
	const lenis = useLenis(() => undefined);
	const exitRef = useRef<Promise<boolean> | null>(null);
	const exitAnimation = useRef<Animation | null>(null);
	const closeMenu = useCallback(() => {
		if (exitRef.current) return exitRef.current;
		const panel = panelRef.current;
		const nav = panel?.querySelector('nav');
		if (
			!panel?.open ||
			!nav ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			onClose();
			return Promise.resolve(true);
		}
		const direction = panel.dataset.upward === 'true' ? 8 : -8;
		exitAnimation.current = nav.animate(
			[
				{
					opacity: getComputedStyle(nav).opacity,
					transform: getComputedStyle(nav).transform
				},
				{ opacity: 0, transform: `translateY(${direction}px)` }
			],
			{ duration: 200, easing: 'ease-in', fill: 'forwards' }
		);
		exitRef.current = exitAnimation.current.finished
			.then(() => {
				if (!panel.open) return false;
				onClose();
				return true;
			})
			.catch(() => false)
			.finally(() => {
				exitRef.current = null;
			});
		return exitRef.current;
	}, [onClose]);
	const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
		if (
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey ||
			event.button !== 0
		)
			return;
		event.preventDefault();
		if (exitRef.current) return;
		const href = event.currentTarget.getAttribute('href');
		void closeMenu().then((finished) => {
			if (finished && href)
				void router.push(href, undefined, {
					scroll: href === router.asPath.split(/[?#]/)[0]
				});
		});
	};
	useEffect(() => {
		router.events.on('routeChangeStart', onClose);
		router.events.on('hashChangeStart', onClose);
		const wide = window.matchMedia('(min-width: 769px)');
		const resize = () => {
			if (wide.matches) onClose();
		};
		wide.addEventListener('change', resize);
		return () => {
			router.events.off('routeChangeStart', onClose);
			router.events.off('hashChangeStart', onClose);
			wide.removeEventListener('change', resize);
		};
	}, [router.events, onClose]);
	useEffect(() => {
		const panel = panelRef.current;
		if (!open || !panel) return;
		const trigger = triggerRef.current;
		const root = document.documentElement;
		const previousOverflow = root.style.overflow;
		let scrollX = window.scrollX;
		let scrollY = window.scrollY;
		let frame = 0;
		let cancelled = false;
		const upward = router.pathname === '/' && scrollY <= 1;
		panel.dataset.upward = String(upward);
		const position = () => {
			const bounds = trigger?.getBoundingClientRect();
			if (!bounds) return;
			panel.style.setProperty('--menu-top', `${bounds.top}px`);
			panel.style.setProperty(
				'--menu-bottom',
				`${window.innerHeight - bounds.bottom}px`
			);
		};
		const show = () => {
			if (cancelled) return;
			position();
			scrollX = window.scrollX;
			scrollY = window.scrollY;
			lenis?.stop();
			// Avoid switching the whole page into/out of a fixed layer on iOS.
			root.style.overflow = 'hidden';
			panel.showModal(); // Keep the visible page inert beneath the controls.
			closeRef.current?.focus({ preventScroll: true });
		};
		const landing = document.querySelector<HTMLElement>(
			'[data-home-landing]'
		);
		const target = Math.max(landing?.offsetHeight || 0, window.innerHeight);
		if (router.pathname === '/' && !upward && scrollY < target) {
			// Let the header's scroll frame finish before measuring the Close bar.
			const afterScroll = () => {
				if (!cancelled) frame = window.requestAnimationFrame(show);
			};
			if (lenis) {
				lenis.scrollTo(target, {
					duration: 0.45,
					immediate: window.matchMedia(
						'(prefers-reduced-motion: reduce)'
					).matches,
					force: true,
					lock: true,
					onComplete: afterScroll
				});
			} else {
				window.scrollTo(scrollX, target);
				afterScroll();
			}
		} else {
			show();
		}
		const cancelPending = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && !panel.open) onClose();
		};
		window.addEventListener('keydown', cancelPending);
		window.addEventListener('resize', position);
		const trapFocus = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;
			const items = Array.from(
				panel.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled])'
				)
			);
			const first = items[0],
				last = items[items.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		};
		panel.addEventListener('keydown', trapFocus);
		return () => {
			cancelled = true;
			window.cancelAnimationFrame(frame);
			window.removeEventListener('keydown', cancelPending);
			window.removeEventListener('resize', position);
			panel.removeEventListener('keydown', trapFocus);
			if (!panel.open) {
				lenis?.scrollTo(window.scrollY, {
					immediate: true,
					force: true
				});
				return;
			}
			panel.close();
			exitAnimation.current?.cancel();
			exitAnimation.current = null;
			root.style.overflow = previousOverflow;
			lenis?.resize();
			lenis?.start();
			lenis?.scrollTo(scrollY, { immediate: true, force: true });
			trigger?.focus({ preventScroll: true });
		};
	}, [open, lenis, triggerRef, router.pathname, onClose]);
	return (
		<Panel
			ref={panelRef}
			id="site-menu"
			aria-label="Menu"
			data-redesign-chrome
			data-lenis-prevent
			onCancel={(event) => {
				event.preventDefault();
				void closeMenu();
			}}
		>
			<div className="menu-controls">
				<button ref={closeRef} type="button" onClick={closeMenu}>
					Close
				</button>
				<Navigation
					settings={settings}
					label="Mobile"
					onNavigate={navigate}
				/>
			</div>
		</Panel>
	);
}
