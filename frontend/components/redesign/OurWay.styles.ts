import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';

export const OurWayWrapper = styled.div`
	${redesignScope}
	background: var(--redesign-paper);
	h1,
	h2,
	h3 {
		letter-spacing: 0;
	}
	a,
	button {
		color: inherit;
	}
	h1,
	h2,
	h3,
	p {
		margin: 0;
	}
	ul,
	ol {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	section {
		scroll-margin-top: 90px;
	}
	.serif {
		font-family: var(--redesign-serif);
		font-weight: 400;
		letter-spacing: -0.025em;
	}
	.label {
		font: 700 14px/1.4 var(--redesign-sans);
		text-transform: uppercase;
	}
	.development-note {
		font: 400 13px/1.5 var(--redesign-sans);
		text-transform: none;
		letter-spacing: 0;
	}
	.action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 14px 24px;
		background: white;
		color: var(--redesign-ink);
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
	}
	.artwork {
		background: #393430;
		overflow: hidden;
	}
	.artwork img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.artwork-placeholder {
		height: 100%;
		min-height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		color: white;
		text-align: center;
	}
	.way-hero {
		height: 100vh;
		height: 100svh;
		min-height: 480px;
		position: relative;
		background: var(--redesign-taupe);
		color: white;
		isolation: isolate;
	}
	.way-hero picture,
	.hero-image,
	.hero-shade {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.hero-image {
		object-fit: cover;
		object-position: var(--desktop-position, 50% 50%);
	}
	.hero-shade {
		background: rgba(0, 0, 0, 0.22);
		z-index: 1;
	}
	.way-hero > .development-note {
		position: absolute;
		top: 180px;
		left: 24px;
		right: 24px;
		text-align: center;
		z-index: 2;
	}
	.way-hero h1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(530px, calc(100% - 48px));
		font: 700 18px/1.4 var(--redesign-sans);
		text-transform: uppercase;
		text-align: center;
		z-index: 2;
	}
	.scroll-down {
		position: absolute;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		background: rgba(0, 0, 0, 0.35);
		color: white;
		font-size: 11px;
	}
	.way-introduction {
		padding: 64px var(--redesign-gutter) 128px;
	}
	.large-copy {
		font-size: clamp(30px, 3.15vw, 56px);
		line-height: 1.15;
		white-space: pre-line;
	}
	.partnership {
		padding: 0 var(--redesign-gutter) 64px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr;
		gap: 48px;
	}
	.partnership > h2 {
		max-width: 340px;
		font-size: 32px;
		line-height: 1.2;
	}
	.principles {
		grid-column: 2;
		grid-row: 1 / 3;
	}
	.principles li {
		border-top: 1px solid #aaa39c;
		padding: 18px 0 64px;
	}
	.principles li:last-child {
		padding-bottom: 16px;
	}
	.principles p {
		margin-top: 28px;
		font-size: 18px;
		line-height: 1.5;
		white-space: pre-line;
	}
	.founder-note {
		align-self: end;
		max-width: 260px;
		font-size: 13px;
		line-height: 1.4;
		white-space: pre-line;
	}
	.founder-note p {
		margin-top: 16px;
	}
	.process {
		padding: 128px var(--redesign-gutter);
		background: var(--redesign-ink);
		color: var(--redesign-paper);
	}
	.process > h2 {
		font-size: 32px;
		line-height: 1.2;
	}
	.process > p {
		margin-top: 24px;
		font-size: 16px;
	}
	.process-track {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 40px;
		margin-top: 112px;
	}
	.process-track > li {
		min-width: 0;
	}
	.process-track h3 {
		margin-bottom: 28px;
	}
	.process-track p {
		margin-bottom: 24px;
		font-size: 18px;
		line-height: 1.5;
	}
	.entry-list {
		font-size: 18px;
		line-height: 1.5;
	}
	.entry-list a {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.entry-list small {
		display: block;
		font-size: 0.85em;
	}
	.consultation {
		background: var(--redesign-taupe);
		color: white;
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: 8vw;
		padding: 64px var(--redesign-gutter);
		align-items: center;
	}
	.consultation-copy {
		text-align: center;
	}
	.consultation h2 {
		font: 700 32px/1.15 var(--redesign-sans);
		text-transform: uppercase;
	}
	.consultation p {
		margin: 30px 0 64px;
		font-size: 18px;
		line-height: 1.5;
	}
	.consultation .artwork {
		aspect-ratio: 1.34;
		height: auto;
	}
	.credentials {
		padding: 64px var(--redesign-gutter) 96px;
	}
	.credentials > h2 {
		margin-bottom: 32px;
	}
	.credential-columns {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 48px;
		margin-top: 100px;
	}
	.credential-columns > div {
		border-top: 1px solid #aaa39c;
		padding-top: 18px;
	}
	.credential-columns h3 {
		margin-bottom: 28px;
	}
	.credential-columns .entry-list {
		font-size: 14px;
	}
	.recognition {
		overflow: hidden;
		padding: 24px 0 64px;
	}
	.recognition > .development-note {
		text-align: center;
		padding: 24px;
	}
	.logo-controls {
		display: flex;
		justify-content: flex-end;
		padding: 0 var(--redesign-gutter) 24px;
	}
	.logo-controls button {
		min-height: 44px;
		padding: 12px;
		border: 1px solid currentColor;
		font-size: 12px;
	}
	.logo-belt {
		display: flex;
		width: max-content;
		animation: recognition-drift 45s linear infinite;
	}
	.logo-group {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-shrink: 0;
		min-width: 100vw;
	}
	.logo-group li {
		width: 240px;
		padding: 0 48px;
	}
	.logo-group .artwork {
		height: 80px;
		background: transparent;
	}
	.logo-group img {
		object-fit: contain;
	}
	.logo-group a {
		display: block;
	}
	.recognition:hover .logo-belt,
	.recognition:focus-within .logo-belt,
	.recognition[data-paused='true'] .logo-belt {
		animation-play-state: paused;
	}
	@keyframes recognition-drift {
		to {
			transform: translateX(-50%);
		}
	}
	@media (max-width: 768px) {
		.hero-image {
			object-position: var(--mobile-position, 50% 50%);
		}
		.way-hero > .development-note {
			top: 130px;
		}
		.way-hero h1 {
			font-size: 14px;
		}
		.way-introduction {
			padding: 48px var(--redesign-gutter) 128px;
		}
		.large-copy {
			font-size: 30px;
			line-height: 1.12;
		}
		.partnership {
			display: flex;
			flex-direction: column;
			gap: 48px;
			padding-bottom: 64px;
		}
		.partnership > h2 {
			font-size: 32px;
			max-width: 290px;
		}
		.principles p {
			font-size: 16px;
			margin-top: 28px;
		}
		.principles li {
			padding-bottom: 48px;
		}
		.founder-note {
			align-self: start;
		}
		.process {
			padding: 32px 0 64px;
		}
		.process > h2,
		.process > p {
			margin-left: var(--redesign-gutter);
			margin-right: var(--redesign-gutter);
		}
		.process-track {
			display: flex;
			gap: 24px;
			overflow-x: auto;
			overscroll-behavior-x: contain;
			scroll-snap-type: x mandatory;
			scroll-padding-left: var(--redesign-gutter);
			padding: 0 var(--redesign-gutter) 24px;
			margin-top: 112px;
		}
		.process-track > li {
			flex: 0 0 82%;
			scroll-snap-align: start;
			border-top: 1px solid #77716a;
			padding-top: 24px;
		}
		.process-track .entry-list {
			font-size: 16px;
		}
		.consultation {
			grid-template-columns: 1fr;
			gap: 64px;
			padding: 64px var(--redesign-gutter);
		}
		.consultation h2 {
			max-width: 320px;
			margin: auto;
		}
		.consultation .artwork {
			aspect-ratio: 1;
		}
		.credentials {
			padding: 48px var(--redesign-gutter) 96px;
		}
		.credential-columns {
			grid-template-columns: 1fr;
			gap: 64px;
		}
		.logo-group li {
			width: 160px;
			padding: 0 24px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.logo-belt {
			animation: none;
			width: 100%;
			transform: none;
		}
		.logo-group {
			min-width: 0;
			width: 100%;
			flex-wrap: wrap;
			gap: 32px 0;
		}
		.logo-group[aria-hidden='true'],
		.logo-controls {
			display: none;
		}
		.process-track {
			scroll-behavior: auto;
		}
	}
`;
