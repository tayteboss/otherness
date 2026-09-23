import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';
import type { RedesignSettings } from '../../lib/redesign/types';
import { Navigation } from './Navigation';
import ConsultationLink from './ConsultationLink';

const FooterWrapper = styled.footer`
	${redesignScope}
	position: relative;
	color: var(--redesign-white);
	.footer-main {
		position: relative;
		z-index: 3;
		background: var(--redesign-ink);
		padding: 64px var(--redesign-gutter) 24px;
	}
	.footer-icon {
		width: 49px;
		height: 27px;
		margin: 0 auto 104px;
	}
	h2 {
		font-family: var(--redesign-serif);
		font-size: clamp(80px, 8.6vw, 140px);
		line-height: 1.14;
		font-weight: 400;
		letter-spacing: -0.03em;
		max-width: 6.5em;
		margin: 0 auto 72px;
		text-align: center;
		text-wrap: balance;
	}
	.booking {
		display: table;
		margin: 0 auto 88px;
		background: white;
		color: var(--redesign-ink);
		font-size: 14px;
		line-height: 20px;
		font-weight: 700;
		text-transform: uppercase;
		padding: 16px 32px;
		min-height: 48px;
	}
	.booking:hover {
		background: #e7e2dc;
	}
	.footer-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		flex-wrap: wrap;
	}
	.socials {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.socials a {
		background: #262320;
		padding: 8px 16px;
		display: flex;
		align-items: center;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 120%;
		letter-spacing: 0.96px;
		text-transform: uppercase;
		color: inherit;
	}
	.legal {
		display: flex;
		gap: 40px;
		align-items: center;
		flex-wrap: wrap;
	}
	.legal p,
	.legal a {
		font-size: 12px;
		font-weight: 400;
		line-height: 120%;
		color: inherit;
	}
	.legal a {
		display: inline-flex;
		align-items: center;
		text-decoration: none;
	}
	.legal a:hover {
		text-decoration: underline;
	}
	.footer-reveal {
		height: var(--footer-strip-height, calc(75vw * 31 / 226 + 148px));
	}
	.footer-strip {
		position: fixed;
		inset: auto 0 0;
		z-index: 1;
		max-height: 100svh;
		overflow-y: auto;
		visibility: hidden;
		background: white;
		color: var(--redesign-ink);
		padding: 32px 0 24px;
	}
	.footer-strip[data-revealed='true'] {
		visibility: visible;
	}
	.footer-strip > a {
		display: block;
		width: 75%;
		margin: 0 auto 48px;
	}
	.footer-strip img {
		width: 100%;
		height: auto;
	}
	@media (max-width: 768px) {
		.footer-main {
			padding: 64px 24px 24px;
		}
		.footer-icon {
			margin-bottom: 96px;
		}
		h2 {
			font-size: clamp(48px, 12vw, 80px);
			line-height: 1.15;
			margin-bottom: 64px;
			max-width: 7em;
		}
		.booking {
			margin-bottom: 96px;
			font-size: 12px;
			padding: 16px 24px;
		}
		.footer-meta,
		.legal {
			flex-direction: column;
			text-align: center;
		}
		.footer-meta {
			gap: 64px;
		}
		.legal {
			gap: 16px;
		}
		.socials {
			justify-content: center;
		}
	}
	&[data-compact='true'] {
		color: var(--redesign-ink);
		.footer-main {
			background: white;
			padding: 30px var(--redesign-gutter);
		}
		.socials a {
			background: #f2f2f2;
			min-height: 40px;
			transition: background-color 0.3s ease, color 0.3s ease;
		}
		.socials a:hover,
		.socials a:focus-visible {
			background: #000;
			color: #fff;
		}
		@media (prefers-reduced-motion: reduce) {
			.socials a {
				transition: none;
			}
		}
		.legal a {
			min-height: 40px;
		}
		@media (max-width: 768px) {
			.footer-meta {
				gap: 32px;
			}
			.footer-main {
				padding: 24px;
			}
		}
	}
`;

export default function Footer({
	settings,
	compact = false,
	routePath
}: {
	settings: RedesignSettings | null;
	compact?: boolean;
	routePath?: string;
}) {
	const footer = settings?.footer;
	const revealRef = useRef<HTMLDivElement>(null);
	const stripRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const reveal = revealRef.current;
		const strip = stripRef.current;
		if (!reveal || !strip) return;
		const resize = new ResizeObserver(() => {
			reveal.style.setProperty(
				'--footer-strip-height',
				`${strip.getBoundingClientRect().height}px`
			);
		});
		resize.observe(strip);
		// Covered links must not receive focus before the strip is exposed.
		const visibility = new IntersectionObserver(([entry]) => {
			const visible =
				entry.isIntersecting && entry.intersectionRect.height > 0;
			strip.dataset.revealed = String(visible);
			strip.toggleAttribute('inert', !visible);
		});
		strip.setAttribute('inert', '');
		visibility.observe(reveal);
		return () => {
			resize.disconnect();
			visibility.disconnect();
		};
	}, [compact]);
	return (
		<FooterWrapper data-redesign-chrome data-compact={compact}>
			<div
				className={compact ? 'footer-main contact-meta' : 'footer-main'}
			>
				{!compact && (
					<>
						<img
							className="footer-icon"
							src="/redesign/brand/logo-icon.svg"
							width="49"
							height="27"
							alt=""
						/>
						<h2>{footer?.heading || 'Let’s work together.'}</h2>
						<ConsultationLink className="booking">
							{settings?.consultationLabel ||
								'Book a consultation'}{' '}
							<span aria-hidden="true">→</span>
						</ConsultationLink>
					</>
				)}
				<div className="footer-meta">
					<div className="socials" aria-label="Social links">
						{(footer?.socials || []).map((link) =>
							link.href && link.label ? (
								<a key={link._key} href={link.href}>
									{link.label}
								</a>
							) : null
						)}
					</div>
					<div className="legal">
						<p>© Studio Otherness BV</p>
						<p>Otherness™ is a trademark of Otherness Holding BV</p>
						{footer?.privacyLink?.href && (
							<Link href={footer.privacyLink.href}>
								{footer.privacyLink.label || 'Privacy'}
							</Link>
						)}
					</div>
				</div>
			</div>
			{!compact && (
				<div className="footer-reveal" ref={revealRef}>
					<div
						className="footer-strip"
						ref={stripRef}
						onFocus={() =>
							revealRef.current?.scrollIntoView({ block: 'end' })
						}
					>
						<Link
							href="/"
							scroll={routePath === '/'}
							aria-label="Otherness home"
						>
							<img
								src="/redesign/brand/logo-word-dark.svg"
								width="226"
								height="31"
								alt="Otherness"
							/>
						</Link>
						<Navigation
							settings={settings}
							label="Footer"
							routePath={routePath}
						/>
					</div>
				</div>
			)}
		</FooterWrapper>
	);
}
