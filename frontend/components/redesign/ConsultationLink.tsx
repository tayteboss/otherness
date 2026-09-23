import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLenis } from '@studio-freight/react-lenis';
import Script from 'next/script';

// Supplied Cal.com element-click embed; shared once by the site layout.
export function ConsultationEmbed() {
	const lenis = useLenis(() => undefined);
	const { events } = useRouter();
	useEffect(() => {
		let modal: HTMLElement | null = null;
		let trigger: HTMLElement | null = null;
		let restoreOverflow = '';
		let resumeScroll = false;
		let active = false;
		const root = document.getElementById('__next');
		const close = () => {
			if (!active) return;
			active = false;
			root?.removeAttribute('inert');
			modal?.setAttribute('inert', '');
			document.body.style.overflow = restoreOverflow;
			if (resumeScroll) lenis?.start();
			trigger?.focus({ preventScroll: true });
		};
		const open = () => {
			if (active || !modal) return;
			active = true;
			trigger = document.activeElement as HTMLElement;
			resumeScroll = !!lenis && !lenis.isStopped;
			lenis?.stop();
			root?.setAttribute('inert', '');
			modal.removeAttribute('inert');
			document.body.style.overflow = 'hidden';
			modal.shadowRoot
				?.querySelector<HTMLButtonElement>('.close')
				?.focus();
		};
		const dismiss = () => {
			if (active) modal?.setAttribute('state', 'closed');
		};
		const escape = (event: KeyboardEvent) => {
			if (active && event.key === 'Escape') dismiss();
		};
		const observer = new MutationObserver(() => {
			const candidates =
				document.querySelectorAll<HTMLElement>('cal-modal-box');
			const candidate = candidates[candidates.length - 1];
			if (!candidate || candidate === modal) return;
			close();
			modal?.removeEventListener('open', open);
			modal?.removeEventListener('close', close);
			modal = candidate;
			modal.setAttribute('role', 'dialog');
			modal.setAttribute('aria-modal', 'true');
			modal.setAttribute('aria-label', 'Book a consultation');
			// The vendor modal is outside React/Lenis and needs explicit focus/scroll handling.
			modal.addEventListener('open', open);
			modal.addEventListener('close', close);
			const fallback = document.createElement('a');
			fallback.href = 'https://cal.com/otherness/discovery';
			fallback.textContent = 'Open booking page →';
			fallback.setAttribute('aria-label', 'Open booking page');
			Object.assign(fallback.style, {
				position: 'fixed',
				top: '16px',
				left: '16px',
				padding: '12px 16px',
				background: '#fff',
				color: '#1a1715',
				zIndex: '10000000',
				font: '500 14px/20px "Neue Montreal", sans-serif'
			});
			modal.shadowRoot?.appendChild(fallback);
			open();
		});
		const rememberOverflow = (event: MouseEvent) => {
			if (
				(event.target as Element).closest?.('[data-cal-link]') &&
				!active
			)
				restoreOverflow = document.body.style.overflow;
		};
		observer.observe(document.body, { childList: true });
		document.addEventListener('click', rememberOverflow, true);
		document.addEventListener('keydown', escape, true);
		events.on('routeChangeStart', dismiss);
		return () => {
			dismiss();
			observer.disconnect();
			modal?.removeEventListener('open', open);
			modal?.removeEventListener('close', close);
			document.removeEventListener('click', rememberOverflow, true);
			document.removeEventListener('keydown', escape, true);
			events.off('routeChangeStart', dismiss);
		};
	}, [events, lenis]);
	return (
		<Script id="cal-discovery" strategy="afterInteractive">{`
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "discovery", {origin:"https://app.cal.com"});
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;
      Cal.ns.discovery("ui", {hideEventTypeDetails:false, layout:"month_view"});
    `}</Script>
	);
}

export default function ConsultationLink({
	className,
	children
}: {
	className?: string;
	children: ReactNode;
}) {
	return (
		<a
			className={className}
			href="https://cal.com/otherness/discovery"
			aria-haspopup="dialog"
			data-cal-link="otherness/discovery"
			data-cal-namespace="discovery"
			data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
			onClick={(event) => {
				if (
					event.metaKey ||
					event.ctrlKey ||
					event.shiftKey ||
					event.altKey
				) {
					event.stopPropagation();
					return;
				}
				// Keep a working direct booking link if the external script is blocked.
				if (
					(window as Window & { Cal?: { version?: string } }).Cal
						?.version
				)
					event.preventDefault();
			}}
		>
			{children}
		</a>
	);
}
