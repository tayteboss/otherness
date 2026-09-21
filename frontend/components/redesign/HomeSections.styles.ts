import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';

export const HomeSectionsWrapper = styled.div`
	${redesignScope}
	background: var(--redesign-paper);
	a,
	button {
		color: inherit;
	}
	button {
		touch-action: manipulation;
	}
	[hidden] {
		display: none !important;
	}
	section {
		scroll-margin-top: 90px;
	}
	.serif {
		font-family: var(--redesign-serif);
		font-weight: 400;
		letter-spacing: -0.025em;
	}
	.section-label {
		font: 700 14px/1.4 var(--redesign-sans);
		letter-spacing: 0;
		text-transform: uppercase;
	}
	.action {
		display: inline-flex;
		align-items: center;
		gap: 16px;
		min-height: 44px;
		padding: 12px 16px;
		background: #eae6e2;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
	}
	.action:hover {
		background: #d9d4ce;
	}
	.development-note {
		font: 400 13px/1.5 var(--redesign-sans);
		letter-spacing: 0;
		text-transform: none;
	}
	.artwork {
		position: relative;
		overflow: hidden;
		background: #393430;
	}
	.artwork img,
	.artwork picture {
		width: 100%;
		height: 100%;
	}
	.artwork img {
		object-fit: cover;
	}
	.artwork-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		min-height: 100px;
		padding: 24px;
		text-align: center;
		color: #f7f4f0;
		background: #393430;
	}
	.introduction {
		text-align: center;
		padding: 190px var(--redesign-gutter) 104px;
	}
	.introduction h2 {
		font-size: clamp(52px, 6vw, 96px);
		line-height: 1.1;
	}
	.introduction .statement {
		max-width: 430px;
		margin: 72px auto 64px;
		font-size: 14px;
		line-height: 1.5;
		font-weight: 700;
		text-transform: uppercase;
	}
	.services {
		padding: 96px var(--redesign-gutter);
		background: var(--redesign-ink);
		color: var(--redesign-paper);
	}
	.services > h2 {
		margin-bottom: 112px;
	}
	.service {
		position: relative;
		border-bottom: 1px solid #68615b;
	}
	.service-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		min-height: 96px;
		text-align: left;
		font-size: 44px;
		line-height: 1.2;
	}
	.service-toggle .symbol {
		font: 300 36px/1 var(--redesign-sans);
	}
	.service-summary {
		margin: -78px 56px 64px 50%;
		position: relative;
	}
	.service-summary p {
		font-size: 18px;
		line-height: 1.5;
		margin-bottom: 28px;
		white-space: pre-line;
	}
	.services .action {
		background: #2c2825;
	}
	.services .action:hover {
		background: #49423b;
	}
	.project-track {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		padding: 0 0 64px;
	}
	.project-card {
		min-width: 0;
	}
	.project-card a {
		display: block;
	}
	.project-card .artwork {
		aspect-ratio: 0.68;
		margin-bottom: 16px;
	}
	.project-card:nth-child(3n + 2) .artwork {
		aspect-ratio: 1.35;
	}
	.project-card:nth-child(3n) .artwork {
		aspect-ratio: 0.8;
	}
	.project-title {
		font-size: 14px;
		line-height: 1.4;
		font-weight: 700;
		text-transform: uppercase;
	}
	.project-caption {
		font-size: 23px;
		line-height: 1.35;
		margin-top: 10px;
	}
	.project-card a:hover .project-title {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.results {
		position: relative;
		isolation: isolate;
		color: var(--redesign-paper);
		background: var(--redesign-taupe);
		padding: 96px var(--redesign-gutter);
	}
	.results .section-label {
		position: relative;
		z-index: 2;
	}
	.results .mobile-label {
		display: none;
	}
	.result-panel {
		min-height: 530px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-top: 190px;
	}
	.result-background {
		position: absolute;
		inset: 0;
		z-index: -2;
	}
	.result-background::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
	}
	.result-background .artwork-placeholder {
		position: relative;
		z-index: 1;
		align-items: flex-start;
		padding-top: 160px;
	}
	.result-logo {
		max-width: 150px;
		max-height: 80px;
		object-fit: contain;
		object-position: left center;
		margin-bottom: 40px;
	}
	.result-client {
		margin-bottom: 40px;
		font-size: 20px;
	}
	.result-quote {
		max-width: 1100px;
		font-size: clamp(32px, 3vw, 48px);
		line-height: 1.22;
		margin: 0 0 40px;
	}
	.result-tabs {
		display: flex;
		gap: 20px;
		overflow-x: auto;
		padding: 6px 6px 12px;
		margin: -6px;
		scroll-snap-type: x mandatory;
	}
	.result-tabs button {
		flex: 1 0 32%;
		min-width: 200px;
		min-height: 52px;
		padding-top: 16px;
		border-top: 1px solid #a8a19a;
		color: #e0dad4;
		text-align: left;
		white-space: pre-line;
		text-transform: uppercase;
		scroll-snap-align: start;
	}
	.result-tabs button[aria-selected='true'] {
		border-color: white;
		color: white;
	}
	.noticed {
		padding: 128px var(--redesign-gutter);
	}
	.noticed > h2 {
		margin-bottom: 96px;
	}
	.noticed-list {
		position: relative;
	}
	.noticed-row {
		position: relative;
		border-bottom: 1px solid #c6bfb9;
		color: #67605a;
	}
	.noticed-row[data-active='true'],
	.noticed-row:hover,
	.noticed-row:focus-within {
		color: var(--redesign-ink);
		border-color: var(--redesign-ink);
	}
	.noticed-link {
		display: grid;
		grid-template-columns: 1fr 1fr 0.85fr 24px;
		align-items: center;
		gap: 24px;
		min-height: 52px;
		padding: 12px 0;
		font-weight: 700;
		text-transform: uppercase;
	}
	.noticed-link span {
		font-weight: inherit;
	}
	.noticed-image {
		position: absolute;
		width: 260px;
		aspect-ratio: 1.5;
		left: 19%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		pointer-events: none;
	}
	.noticed-image > .artwork {
		height: 100%;
	}
	.noticed-toggle {
		display: none;
	}
	.noticed-row:not([data-active='true']) .noticed-image {
		display: none;
	}
	@media (max-width: 768px) {
		.introduction {
			padding: 96px 24px 64px;
		}
		.introduction h2 {
			max-width: 330px;
			margin: auto;
			font-size: 42px;
			line-height: 1.06;
		}
		.introduction .statement {
			margin: 64px auto;
			max-width: 350px;
		}
		.services {
			padding: 40px 24px 32px;
		}
		.services > h2 {
			margin-bottom: 24px;
		}
		.service-toggle {
			min-height: 68px;
			font-size: 28px;
		}
		.service-toggle .symbol {
			font-size: 26px;
		}
		.service-summary {
			margin: 0 0 40px;
		}
		.service-summary p {
			font-size: 16px;
			line-height: 1.45;
			margin: 12px 0 32px;
		}
		.project-track {
			display: flex;
			gap: 16px;
			overflow-x: auto;
			margin-right: -24px;
			padding: 6px 24px 48px 6px;
			margin-left: -6px;
			scroll-snap-type: x mandatory;
			scroll-padding-left: 6px;
		}
		.project-card {
			flex: 0 0 76%;
			scroll-snap-align: start;
		}
		.project-card .artwork {
			height: 290px;
			aspect-ratio: auto !important;
		}
		.project-caption {
			font-size: 20px;
		}
		.results {
			padding: 40px 24px 56px;
		}
		.results .desktop-label {
			display: none;
		}
		.results .mobile-label {
			display: inline;
		}
		.result-panel {
			min-height: 760px;
			padding-top: 280px;
		}
		.result-quote {
			font-size: 36px;
			line-height: 1.17;
			margin-bottom: 40px;
		}
		.result-tabs {
			margin-right: -24px;
			padding-right: 24px;
		}
		.result-tabs button {
			flex-basis: 90%;
			font-size: 12px;
		}
		.noticed {
			padding: 48px 24px 64px;
		}
		.noticed > h2 {
			margin-bottom: 80px;
		}
		.noticed-row[data-expanded='true'] {
			color: var(--redesign-ink);
		}
		.noticed-row {
			min-height: 52px;
		}
		.noticed-link {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
			min-height: 52px;
			padding: 16px 52px 16px 0;
			font-size: 12px;
			line-height: 1.3;
		}
		.noticed-toggle {
			display: block;
			position: absolute;
			right: 0;
			top: 4px;
			width: 44px;
			height: 44px;
			font-size: 24px;
			z-index: 3;
		}
		.noticed-row:not([data-expanded='true']) .noticed-detail {
			display: none;
		}
		.noticed-row[data-expanded='true'] .noticed-link {
			width: 50%;
			padding-right: 12px;
			min-height: max(180px, calc(74px + (100vw - 72px) / 3));
		}
		.noticed-image {
			display: none !important;
			width: calc(50% - 12px);
			top: 58px;
			right: 0;
			left: auto;
			transform: none;
		}
		.noticed-row[data-expanded='true'] .noticed-image {
			display: block !important;
		}
		.noticed-image .artwork-placeholder {
			min-height: 0;
			padding: 12px;
			font-size: 11px;
		}
	}
`;
