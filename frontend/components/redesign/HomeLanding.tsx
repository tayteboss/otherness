import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { HomePageV2, Image } from '../../lib/redesign/types';
import { redesignScope } from '../../styles/redesign';
import { imageSource } from './Artwork';
import HomeIntro from './HomeIntro';

const Landing = styled.section`
	${redesignScope}
	position: relative;
	height: 100vh;
	height: 100svh;
	min-height: 480px;
	isolation: isolate;
	overflow: hidden;
	transform: translate3d(0, var(--landing-y, 0px), 0);
	background: var(--redesign-taupe);
	color: white;
	.landing-media {
		position: absolute;
		inset: -8px;
		background: var(--redesign-taupe);
		transform: scale(var(--landing-scale, 1));
		filter: blur(var(--landing-blur, 0px));
	}
	.landing-reveal,
	picture,
	.landing-artwork,
	.landing-shade {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.landing-artwork {
		object-fit: cover;
		object-position: var(--desktop-position, 50% 50%);
	}
	.landing-statement-reveal {
		display: block;
		font: inherit;
	}
	.landing-shade {
		background: black;
		opacity: var(--landing-shade, 0.16);
	}
	.development-note {
		position: absolute;
		top: 24px;
		left: 24px;
		right: 24px;
		text-align: center;
		font-size: 12px;
		line-height: 1.5;
	}
	h1 {
		position: absolute;
		top: 50%;
		left: 24px;
		right: 24px;
		transform: translateY(-50%);
		margin: 0;
		text-align: center;
		font-family: var(--redesign-serif);
		font-weight: 400;
		font-size: clamp(30px, 2.8vw, 54px);
		line-height: 1.2;
		opacity: var(--landing-title-opacity, 1);
		filter: blur(var(--landing-title-blur, 0px));
	}
	@media (max-width: 768px) {
		h1 {
			font-size: clamp(30px, 8.3vw, 48px);
			max-width: 550px;
			margin: auto;
		}
		.landing-artwork {
			object-position: var(
				--mobile-position,
				var(--desktop-position, 50% 50%)
			);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		transform: none;
		.landing-media {
			transform: none;
			filter: none;
		}
		.landing-shade {
			opacity: 0.16;
		}
		h1 {
			opacity: 1;
			filter: none;
		}
	}
`;

function position(image: Image | null) {
	const crop = image?.crop;
	const coordinate = (axis: 'x' | 'y', start: number, end: number) =>
		`${Math.max(
			0,
			Math.min(
				100,
				(100 * ((image?.hotspot?.[axis] ?? 0.5) - start)) /
					Math.max(0.01, 1 - start - end)
			)
		)}%`;
	return `${coordinate('x', crop?.left || 0, crop?.right || 0)} ${coordinate(
		'y',
		crop?.top || 0,
		crop?.bottom || 0
	)}`;
}
function sources(image: Image | null) {
	if (!image?.alt) return undefined;
	try {
		return [400, 800, 1200, 1920, 2560]
			.map((width) => `${imageSource(image, width)} ${width}w`)
			.join(', ');
	} catch {
		return undefined;
	}
}

export default function HomeLanding({ home }: { home: HomePageV2 | null }) {
	const [failed, setFailed] = useState(false);
	const landingRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const landing = landingRef.current;
		if (!landing) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const title = landing.querySelector('h1');
		const logo = document.querySelector(
			'header[data-home="true"] .logo-row'
		);
		let frame = 0;
		const update = () => {
			frame = 0;
			const height = landing.offsetHeight;
			const scroll = Math.max(0, Math.min(window.scrollY, height));
			const progress = reduced.matches ? 0 : scroll / Math.max(1, height);
			// The following sections cover this slower-moving layer in normal flow.
			landing.style.setProperty(
				'--landing-y',
				`${progress * height * 0.35}px`
			);
			landing.style.setProperty(
				'--landing-scale',
				String(1 + progress * 0.16)
			);
			landing.style.setProperty('--landing-blur', `${progress * 12}px`);
			landing.style.setProperty(
				'--landing-shade',
				String(0.16 + progress * 0.14)
			);
			if (title && logo) {
				// Use the actual clearance so wrapped mobile titles disappear
				// before the rising wordmark reaches them at every viewport size.
				const initialGap =
					height -
					(window.innerWidth <= 768 ? 108 : 132) -
					(height + title.offsetHeight) / 2;
				const clearance = Math.min(32, Math.max(0, initialGap * 0.15));
				const fadeDistance = Math.max(
					1,
					Math.min(160, initialGap * 0.65)
				);
				const gap =
					logo.getBoundingClientRect().top -
					title.getBoundingClientRect().bottom;
				const fade = reduced.matches
					? 0
					: progress >= 0.7
					? 1
					: Math.max(
							0,
							Math.min(1, 1 - (gap - clearance) / fadeDistance)
					  );
				const eased = fade * fade * (3 - 2 * fade);
				landing.style.setProperty(
					'--landing-title-opacity',
					String(1 - eased)
				);
				landing.style.setProperty(
					'--landing-title-blur',
					`${eased * 12}px`
				);
			}
		};
		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		reduced.addEventListener('change', schedule);
		const observer = new ResizeObserver(schedule);
		observer.observe(landing);
		if (title) observer.observe(title);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			reduced.removeEventListener('change', schedule);
			observer.disconnect();
		};
	}, []);
	const desktop = home?.landing?.desktopImage || null;
	const mobile = home?.landing?.mobileImage || desktop;
	const desktopSources = desktop?.asset ? sources(desktop) : undefined;
	const mobileSources = mobile?.asset ? sources(mobile) : undefined;
	return (
		<>
			<Landing
				ref={landingRef}
				data-home-landing
				aria-labelledby="landing-statement"
				style={
					{
						'--desktop-position': position(desktop),
						'--mobile-position': position(mobile)
					} as React.CSSProperties
				}
			>
				<div className="landing-media">
					<div className="landing-reveal">
						{desktopSources && !failed ? (
							<picture>
								{mobileSources && (
									<source
										media="(max-width: 768px)"
										srcSet={mobileSources}
										sizes="100vw"
									/>
								)}
								<img
									className="landing-artwork"
									src={imageSource(desktop, 1920)}
									srcSet={desktopSources}
									sizes="100vw"
									alt={desktop?.alt || ''}
									loading="eager"
									onError={() => setFailed(true)}
								/>
							</picture>
						) : null}
					</div>
				</div>
				<div className="landing-shade" aria-hidden="true" />
				{(!desktopSources || failed) && (
					<p className="development-note">
						Development placeholder — clean landing artwork pending
					</p>
				)}
				<h1 id="landing-statement" tabIndex={-1}>
					<span className="landing-statement-reveal">
						{home?.landing?.statement ||
							'Development placeholder — landing statement pending'}
					</span>
				</h1>
			</Landing>
			<HomeIntro pairs={home?.loadingPairs || null} />
		</>
	);
}
