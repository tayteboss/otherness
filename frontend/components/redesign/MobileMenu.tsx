import { RefObject, useEffect, useRef } from 'react';
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
	padding: 24px;
	background: var(--redesign-paper);
	color: var(--redesign-ink);
	overflow-y: auto;
	overscroll-behavior: contain;
	&::backdrop {
		background: var(--redesign-ink);
	}
	.menu-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}
	.menu-top img {
		width: min(55vw, 226px);
		height: auto;
	}
	button {
		min-width: 72px;
		min-height: 44px;
		font-weight: 700;
		text-transform: uppercase;
		background: #e7e2dc;
	}
	nav {
		margin: 72px 0;
	}
	nav > div {
		flex-direction: column;
		gap: 0;
	}
	nav a {
		justify-content: flex-start;
		padding: 24px 0;
		background: none;
		border-top: 1px solid #b9b2ab;
		font-size: clamp(28px, 8vw, 48px);
		line-height: 1.2;
	}
	nav a:last-child {
		border-bottom: 1px solid #b9b2ab;
	}
	.menu-socials {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
	.menu-socials a {
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		color: inherit;
		text-decoration: underline;
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
		const { scrollX, scrollY } = window;
		const trigger = triggerRef.current;
		const body = document.body;
		const previous = {
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			width: body.style.width,
			overflow: body.style.overflow
		};
		lenis?.stop();
		Object.assign(body.style, {
			position: 'fixed',
			top: `-${scrollY}px`,
			left: `-${scrollX}px`,
			width: '100%',
			overflow: 'hidden'
		});
		panel.showModal(); // Native modal makes the rest of the page inert.
		closeRef.current?.focus({ preventScroll: true });
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
			panel.removeEventListener('keydown', trapFocus);
			panel.close();
			Object.assign(body.style, previous);
			lenis?.resize();
			lenis?.start();
			window.scrollTo(scrollX, scrollY);
			lenis?.scrollTo(scrollY, { immediate: true, force: true });
			trigger?.focus({ preventScroll: true });
		};
	}, [open, lenis, triggerRef]);
	return (
		<Panel
			ref={panelRef}
			id="site-menu"
			aria-label="Menu"
			data-redesign-chrome
			data-lenis-prevent
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
		>
			<div className="menu-top">
				<img
					src="/redesign/brand/logo-word-dark.svg"
					width="226"
					height="31"
					alt="Otherness"
				/>
				<button ref={closeRef} type="button" onClick={onClose}>
					Close
				</button>
			</div>
			<Navigation
				settings={settings}
				label="Mobile"
				onNavigate={onClose}
			/>
			<div className="menu-socials">
				{(settings?.footer?.socials || []).map((link) =>
					link.href && link.label ? (
						<a key={link._key} href={link.href} onClick={onClose}>
							{link.label}
						</a>
					) : null
				)}
			</div>
		</Panel>
	);
}
