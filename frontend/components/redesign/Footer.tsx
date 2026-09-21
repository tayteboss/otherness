import Link from 'next/link';
import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';
import type { RedesignSettings } from '../../lib/redesign/types';
import { Navigation } from './Navigation';

const FooterWrapper = styled.footer`
	${redesignScope}
	position: relative;
	z-index: 3;
	background: var(--redesign-ink);
	color: var(--redesign-white);
	.footer-main {
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
		padding: 10px 16px;
		min-height: 44px;
		display: flex;
		align-items: center;
		text-transform: uppercase;
	}
	.legal {
		display: flex;
		gap: 40px;
		align-items: center;
		flex-wrap: wrap;
	}
	.legal p,
	.legal a,
	.socials a {
		font-size: 12px;
		line-height: 18px;
		color: inherit;
	}
	.legal a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.footer-strip {
		background: white;
		color: var(--redesign-ink);
		padding: 32px 0 24px;
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
			padding: 64px 24px 40px;
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
			margin-bottom: 80px;
			font-size: 12px;
			padding: 16px 24px;
		}
		.footer-meta,
		.legal {
			flex-direction: column;
			text-align: center;
		}
		.footer-meta {
			gap: 72px;
		}
		.legal {
			gap: 12px;
		}
		.socials {
			justify-content: center;
		}
		.socials a {
			padding: 10px 14px;
		}
		.footer-strip {
			display: none;
		}
	}
`;

export default function Footer({
	settings
}: {
	settings: RedesignSettings | null;
}) {
	const footer = settings?.footer;
	return (
		<FooterWrapper data-redesign-chrome>
			<div className="footer-main">
				<img
					className="footer-icon"
					src="/redesign/brand/logo-icon.svg"
					width="49"
					height="27"
					alt=""
				/>
				<h2>{footer?.heading || 'Let’s work together.'}</h2>
				{settings?.consultationUrl && (
					<a className="booking" href={settings.consultationUrl}>
						{settings.consultationLabel || 'Book a consultation'}{' '}
						<span aria-hidden="true">→</span>
					</a>
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
						{footer?.copyright && <p>© {footer.copyright}</p>}
						{footer?.trademark && <p>{footer.trademark}</p>}
						{footer?.privacyLink?.href && (
							<Link href={footer.privacyLink.href}>
								{footer.privacyLink.label || 'Privacy'}
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="footer-strip">
				<Link href="/" aria-label="Otherness home">
					<img
						src="/redesign/brand/logo-word-dark.svg"
						width="226"
						height="31"
						alt="Otherness"
					/>
				</Link>
				<Navigation settings={settings} label="Footer" />
			</div>
		</FooterWrapper>
	);
}
