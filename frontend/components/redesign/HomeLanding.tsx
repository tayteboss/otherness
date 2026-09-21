import { useState } from 'react';
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
	background: var(--redesign-taupe);
	color: white;
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
	.landing-shade {
		background: rgba(0, 0, 0, 0.16);
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
	const desktop = home?.landing?.desktopImage || null;
	const mobile = home?.landing?.mobileImage || desktop;
	const desktopSources = desktop?.asset ? sources(desktop) : undefined;
	const mobileSources = mobile?.asset ? sources(mobile) : undefined;
	return (
		<>
			<Landing
				data-home-landing
				aria-labelledby="landing-statement"
				style={
					{
						'--desktop-position': position(desktop),
						'--mobile-position': position(mobile)
					} as React.CSSProperties
				}
			>
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
				) : (
					<p className="development-note">
						Development placeholder — clean landing artwork pending
					</p>
				)}
				<div className="landing-shade" aria-hidden="true" />
				<h1 id="landing-statement" tabIndex={-1}>
					{home?.landing?.statement ||
						'Development placeholder — landing statement pending'}
				</h1>
			</Landing>
			<HomeIntro pairs={home?.loadingPairs || null} />
		</>
	);
}
