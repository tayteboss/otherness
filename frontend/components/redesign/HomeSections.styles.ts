import styled from 'styled-components';
import { redesignScope } from '../../styles/redesign';

export const HomeSectionsWrapper = styled.div`
	${redesignScope}
	position: relative;
	z-index: 1;
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
		padding: 196px var(--redesign-gutter) 128px;
	}
	.introduction h2 {
		font-size: clamp(52px, 6vw, 96px);
		line-height: 1.1;
	}
	.introduction .statement {
		max-width: 448px;
		margin: 64px auto;
	}
	.services {
		padding: 96px var(--redesign-gutter);
		background: var(--redesign-ink);
		color: var(--redesign-paper);
	}
	.services > h2 {
		margin-bottom: 96px;
	}
	.service {
		position: relative;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: 24px;
		border-bottom: 1px solid var(--redesign-taupe);
	}
	.service[data-expanded='true'] {
		border-bottom-color: var(--redesign-paper);
	}
	/* Beige rule that sweeps in over the bottom stroke of inactive rows. */
	.service::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		height: 1px;
		background: var(--redesign-beige);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
		pointer-events: none;
	}
	.service:not([data-expanded='true']):hover::after,
	.service:not([data-expanded='true']):focus-within::after {
		transform: scaleX(1);
	}
	.service > h3,
	.service-panel {
		display: contents;
	}
	.service-toggle {
		grid-column: 1 / -1;
		grid-row: 1;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: 24px;
		align-items: start;
		width: 100%;
		min-height: 118px;
		padding: 32px 0;
		text-align: left;
	}
	.service-title {
		grid-column: 1 / 7;
	}
	.service-toggle .symbol {
		grid-column: 12;
		justify-self: end;
		margin-top: -5.4px;
		font-family: var(--redesign-serif);
		font-size: 48px;
		font-style: normal;
		font-weight: 400;
		line-height: 135%;
		letter-spacing: -0.96px;
	}
	/* Clip wrappers own the animated height; their inner bodies carry padding
	   so the panel can collapse to a true zero. Height is driven from JS.
	   Closing is delayed so the content can fade out first; opening leads. */
	.service-summary,
	.service-track {
		overflow: hidden;
		transition: height 0.55s cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: 0.5s;
	}
	.service[data-expanded='true'] .service-summary,
	.service[data-expanded='true'] .service-track {
		transition-delay: 0s;
	}
	.service-summary {
		grid-column: 7 / 12;
		grid-row: 1;
	}
	.service-summary-body {
		position: relative;
		padding: 32px 0 64px;
	}
	.service-summary-body p {
		margin-bottom: 32px;
		padding-top: 12px;
		white-space: pre-line;
	}
	/* Blur/opacity fade of the panel content. Fades out first when closing
	   (no delay); fades in last when opening (after the height settles). */
	.service-summary-body,
	.project-track {
		transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
			filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: 0s;
	}
	.service[data-expanded='true'] .service-summary-body,
	.service[data-expanded='true'] .project-track {
		transition-delay: 0.55s;
	}
	.service:not([data-expanded='true']) .service-summary-body,
	.service:not([data-expanded='true']) .project-track {
		opacity: 0;
		filter: blur(6px);
	}
	.services .button-primary {
		--button-background: #2c2825;
		--button-hover-background: #49423b;
	}
	/* Wrapper bleeds to both viewport edges and clips the vertical collapse;
	   the inner track keeps its horizontal scroll within that box, so cards
	   flow off to the screen edge instead of being masked at the gutter. */
	.service-track {
		grid-column: 1 / -1;
		grid-row: 2;
		margin: 0 calc(-1 * var(--redesign-gutter));
	}
	.project-track {
		display: grid;
		grid-auto-flow: column;
		/* Four columns of the section's twelve-column grid per card. The left
		   padding keeps the first card where it sits, matching the bleed. */
		grid-auto-columns: calc((100% - 48px) / 3);
		gap: 24px;
		overflow-x: auto;
		padding: 0 var(--redesign-gutter) 64px;
		scroll-snap-type: x mandatory;
		/* Snap the first/each card to the gutter, not the bled viewport edge. */
		scroll-padding-left: var(--redesign-gutter);
		overscroll-behavior-x: contain;
		scrollbar-width: none;
	}
	.project-track::-webkit-scrollbar {
		display: none;
	}
	.project-card {
		min-width: 0;
		scroll-snap-align: start;
	}
	.project-card a:focus-visible {
		outline-offset: -2px;
	}
	.project-card a {
		display: block;
	}
	.project-card .artwork {
		aspect-ratio: 0.68;
		margin-bottom: 10px;
	}
	.project-card .artwork img {
		transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.project-card a:hover .artwork img,
	.project-card a:focus-visible .artwork img {
		transform: scale(1.04);
	}
	.project-card:nth-child(3n + 2) .artwork {
		aspect-ratio: 1.35;
	}
	.project-card:nth-child(3n) .artwork {
		aspect-ratio: 0.8;
	}
	.project-caption {
		margin-top: 10px;
	}
	.project-title {
		position: relative;
		display: inline-block;
	}
	/* Underline sweeps in from left to right on hover/focus. */
	.project-title::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -0.1em;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.project-card a:hover .project-title::after,
	.project-card a:focus-visible .project-title::after {
		transform: scaleX(1);
	}
	.results {
		--result-duration: 5s;
		position: relative;
		isolation: isolate;
		color: var(--redesign-paper);
		background: var(--redesign-taupe);
		padding: 96px var(--redesign-gutter);
	}
	.results .section-label {
		position: relative;
		z-index: 2;
		margin-bottom: 320px;
	}
	.results .mobile-label {
		display: none;
	}
	.results .result-background.mobile-label {
		display: none;
	}
	.result-background {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		opacity: 0;
		visibility: hidden;
		overflow: hidden;
		transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
			visibility 0s linear 1s;
	}
	.result-background[data-active='true'] {
		z-index: 1;
		opacity: 1;
		visibility: visible;
		transition-delay: 0s;
	}
	.result-background[data-active='true'] .artwork img {
		animation: result-image-scale var(--result-duration) linear both,
			result-image-blur 1s ease-out both;
	}
	.results[data-inview='false'] .result-background .artwork img {
		animation-play-state: paused;
	}
	@keyframes result-image-scale {
		from {
			transform: scale(1.05);
		}
		to {
			transform: scale(1);
		}
	}
	@keyframes result-image-blur {
		from {
			filter: blur(4px);
		}
		to {
			filter: blur(0);
		}
	}
	.result-background .artwork,
	.result-background .artwork img,
	.result-background .artwork picture {
		height: 100%;
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
		height: 100%;
		padding-top: 160px;
	}
	.result-stage {
		position: relative;
		z-index: 2;
		display: grid;
	}
	.result-panel {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		opacity: 0;
		visibility: hidden;
		filter: blur(8px);
		pointer-events: none;
		transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
			filter 1s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 1s;
	}
	.result-panel[data-active='true'] {
		z-index: 1;
		opacity: 1;
		visibility: visible;
		filter: blur(0);
		pointer-events: auto;
		transition-delay: 0s;
	}
	.result-logo {
		display: block;
		width: 120px;
		height: auto;
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
		position: relative;
		z-index: 2;
		display: flex;
		gap: 20px;
		overflow-x: auto;
		padding: 6px 6px 12px;
		margin: -6px;
		scroll-snap-type: x mandatory;
	}
	.result-tabs button {
		position: relative;
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
		color: white;
	}
	.result-tab-progress,
	.result-tab-play {
		position: absolute;
		display: block;
		left: 0;
		right: 0;
		top: -1px;
		height: 1px;
		width: 100%;
		background: white;
		pointer-events: none;
		transform: scaleX(0);
		transform-origin: left center;
	}
	.result-tabs button[aria-selected='true'] .result-tab-progress {
		transform: scaleX(1);
	}
	.result-tabs
		button[aria-selected='true'][data-playing='true']
		.result-tab-progress {
		transform: scaleX(0);
	}
	.result-tab-play {
		animation: result-progress var(--result-duration) linear forwards;
	}
	.results[data-inview='false'] .result-tab-play {
		animation-play-state: paused;
	}
	@keyframes result-progress {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
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
		transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.noticed-row[data-active='true'],
	.noticed-row:hover,
	.noticed-row:focus-within {
		color: var(--redesign-ink);
	}
	/* Dark rule that sweeps in over the bottom stroke on hover/focus,
	   mirroring the services section. */
	.noticed-row::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -1px;
		height: 1px;
		background: var(--redesign-ink);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
		pointer-events: none;
	}
	.noticed-row[data-active='true']::after,
	.noticed-row:hover::after,
	.noticed-row:focus-within::after {
		transform: scaleX(1);
	}
	.noticed-mobile {
		display: none;
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
	@media (max-width: 768px) {
		.introduction {
			padding: 96px 24px;
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
			padding: 16px 0;
			min-height: 32px;
		}
		.service-toggle .symbol {
			line-height: 1;
			font-size: 38px;
		}
		.service-title {
			grid-column: 1 / 12;
			font-size: 24px;
		}
		.service-summary {
			grid-column: 1 / -1;
			grid-row: 2;
		}
		.service-summary-body {
			padding: 0 0 40px;
		}
		.service-summary-body p {
			font-size: 16px;
			padding-top: 0;
		}
		.service-track {
			grid-row: 3;
		}
		.project-track {
			grid-auto-columns: 76%;
		}
		.project-card .artwork {
			height: 290px;
			aspect-ratio: auto !important;
		}
		.results {
			padding: 40px 24px 56px;
			/* Clip at the viewport edge, never at the inset tab rail. */
			overflow-x: clip;
			touch-action: pan-y pinch-zoom;
		}
		.results .desktop-label {
			display: none;
		}
		.results .mobile-label {
			display: inline;
		}
		.results .result-background.desktop-label {
			display: none;
		}
		.results .result-background.mobile-label {
			display: block;
		}
		.result-stage {
			overflow: hidden;
		}
		.result-panel {
			/* Keep each logo with its quote, anchored above the shared tab rule. */
			justify-content: flex-end;
		}
		.result-quote {
			font-size: 32px;
			line-height: 1.17;
			margin-top: 0;
			margin-bottom: 0;
		}
		.result-tabs {
			gap: 12px;
			margin: 40px -24px 0;
			padding: 0 24px;
			overflow: visible;
			scroll-snap-type: none;
		}
		.result-tabs button {
			order: var(--result-order);
			flex: 0 0 100%;
			min-width: 0;
			font-size: 12px;
			touch-action: pan-y pinch-zoom;
		}
		.result-tabs button:focus-visible {
			outline-offset: -3px;
		}

		.noticed {
			padding: 44px 24px 40px;
		}
		.noticed > h2 {
			margin-bottom: 96px;
		}
		.noticed-row,
		.noticed-row:hover,
		.noticed-row:focus-within {
			color: #b1adaa;
		}
		.noticed-row::after {
			display: none;
		}
		.noticed-row[data-expanded='true'] {
			color: var(--redesign-ink);
			border-bottom-color: #67605a;
		}
		.noticed-link {
			display: none;
		}
		.noticed-mobile {
			display: grid;
			font-size: 14px;
			font-weight: 700;
			line-height: 20px;
			text-transform: uppercase;
		}
		.noticed-toggle,
		.noticed-panel {
			grid-area: 1 / 1;
		}
		.noticed-toggle {
			z-index: 1;
			align-self: start;
			width: 100%;
			min-height: 45px;
			padding: 12px 0;
			text-align: left;
			font: inherit;
			text-transform: inherit;
		}
		.noticed-row[data-expanded='true'] .noticed-toggle {
			width: calc((100% - 18px) / 2);
		}
		.noticed-panel {
			overflow: hidden;
			transition: height 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
		}
		.noticed-panel-body {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 18px;
			padding: 12px 0;
			opacity: 0;
			filter: blur(6px);
			transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
				filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
		}
		.noticed-row[data-expanded='true'] .noticed-panel {
			transition-delay: 0s;
		}
		.noticed-row[data-expanded='true'] .noticed-panel-body {
			opacity: 1;
			filter: blur(0);
			transition-delay: 0.55s;
		}
		.noticed-copy {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
		.noticed-copy span {
			font: inherit;
		}
		.noticed-title-space {
			visibility: hidden;
		}
		.noticed-arrow {
			display: flex;
			align-items: flex-start;
			width: 44px;
			min-height: 24px;
		}
		.noticed-thumbnail {
			position: relative;
			align-self: start;
			aspect-ratio: 168 / 114;
		}
		.noticed-thumbnail img {
			object-fit: cover;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.service::after,
		.service-summary,
		.service-track,
		.service-summary-body,
		.project-track,
		.project-card .artwork img,
		.project-title::after,
		.noticed-row,
		.noticed-row::after,
		.noticed-panel,
		.noticed-panel-body,
		.result-background,
		.result-panel {
			transition: none;
			filter: none;
		}
		.service:not([data-expanded='true']) .service-summary-body,
		.service:not([data-expanded='true']) .project-track {
			filter: none;
		}
		.result-tab-play {
			animation: none;
		}
		.result-background[data-active='true'] .artwork img {
			animation: none;
			transform: none;
			filter: none;
		}
		.result-tabs button[aria-selected='true'] .result-tab-progress {
			transform: scaleX(1);
		}
	}
`;
