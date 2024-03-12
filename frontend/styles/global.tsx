import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import pxToRem from '../utils/pxToRem';

export const GlobalStyles = createGlobalStyle`
	:root {
		--colour-white: ${theme.colours.white};
		--colour-black: ${theme.colours.black};
		--colour-beige-light: ${theme.colours.beigeLight};
		--colour-beige-dark: ${theme.colours.beigeDark};
		--colour-beige-medium: ${theme.colours.beigeMedium};
		--font-baryton: ${theme.fonts.baryton};
		--font-classic-grotesque-regular: ${theme.fonts.classicGrotesqueRegular};
		--font-classic-grotesque-book: ${theme.fonts.classicGrotesqueBook};
		--font-classic-grotesque-light: ${theme.fonts.classicGrotesqueLight};
		--transition-speed-default: ${theme.transitionSpeed.default};
		--transition-speed-fast: ${theme.transitionSpeed.fast};
		--transition-speed-extra-fast: ${theme.transitionSpeed.extraFast};
		--transition-speed-slow: ${theme.transitionSpeed.slow};
		--transition-speed-extra-slow: ${theme.transitionSpeed.extraSlow};
		--transition-ease: cubic-bezier(0.65, 0, 0.35, 1);
	}

	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: none;
		list-style: none;
		background: none;
		outline: none;
		border-radius: 0;
		box-shadow: none;
	}

	::selection {
		background-color: black;
		color: white;
	}

	html {
		scroll-behavior: smooth;
		background: var(--colour-white);
		font-size: 16px;

		&.no-scroll {
			overflow-y: hidden;
			
			body {
				overflow-y: hidden;
			}
		}
	}

	body {
		position: relative;
	}

	input,
	textarea,
	select,
	button,
	label,
	body {
		font-family: var(--font-classic-grotesque-regular);
		color: var(--colour-black);
		line-height: normal;
	}

	strong,
	b {
		font-weight: 900;
	}

	em {
		font-style: italic;
	}

	a {
		text-decoration: underline;
		color: var(--colour-black);
	}

	button {
		cursor: pointer;
	}

	h1,
	.type-h1 {
		font-family: var(--font-baryton);
		font-size: ${pxToRem(130)};
		line-height: ${pxToRem(156)};
		letter-spacing: -2.6px;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(76)};
			line-height: ${pxToRem(91)};
			letter-spacing: -1.52px;
		}
	}

	h2,
	.type-h2 {
		font-family: var(--font-baryton);
		font-size: ${pxToRem(86)};
		line-height: ${pxToRem(106)};
		letter-spacing: -1.72px;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(46)};
			line-height: ${pxToRem(59)};
			letter-spacing: -0.69px;
		}
	}

	h3,
	.type-h3 {
		font-family: var(--font-baryton);
		font-size: ${pxToRem(40)};
		line-height: ${pxToRem(51)};
		letter-spacing: -0.4px;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(30)};
			line-height: ${pxToRem(38)};
			letter-spacing: -0.3px;
		}
	}

	h4,
	.type-h4 {
		font-family: var(--font-baryton);
		font-size: ${pxToRem(30)};
		line-height: ${pxToRem(38)};
		letter-spacing: -0.3px;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(24)};
			line-height: ${pxToRem(31)};
			letter-spacing: -0.24px;
		}
	}

	h5,
	.type-h5 {
		font-family: var(--font-baryton);
		font-size: ${pxToRem(20)};
		line-height: ${pxToRem(26)};
		letter-spacing: -0.2px;
	}

	p,
	.type-p,
	a,
	button,
	div {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(10)};
		line-height: ${pxToRem(15)};
		letter-spacing: 0.12px;
	}

	.type-p-medium {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(14)};
		line-height: ${pxToRem(21)};
		letter-spacing: 0.14px;
	}

	.type-p-large {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(18)};
		line-height: ${pxToRem(27)};
		letter-spacing: 0.18px;
	}

	.type-secondary-heading-large {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(30)};
		line-height: ${pxToRem(42)};
		letter-spacing: 2.1px;
		text-transform: uppercase;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(22)};
			line-height: ${pxToRem(31)};
			letter-spacing: 1.32px;
		}
	}

	.type-secondary-heading-medium {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(18)};
		line-height: ${pxToRem(25)};
		letter-spacing: 0.9px;
		text-transform: uppercase;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(16)};
			line-height: ${pxToRem(22)};
			letter-spacing: 0.64px;
		}
	}

	.type-secondary-heading-small {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(14)};
		line-height: ${pxToRem(21)};
		letter-spacing: 0.56px;
		text-transform: uppercase;
	}

	mux-player {
		--media-object-fit: contain;
		--media-object-position: center;
		--controls: none;
		--media-object-fit: cover;
		--media-object-position: center;
	}

	.view-element-fade-in
	{
		opacity: 0;

		transition: opacity var(--transition-speed-default) ease;

		&--in-view
		{
			opacity: 1;
		}
	}

	.view-element-bottom-top
	{
		opacity: 0;
		transform: translateY(15px);

		transition: opacity var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1), transform var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1);

		&--in-view
		{
			opacity: 1;
			transform: translateY(0);
		}
	}

	.view-element-scale-up
	{
		transform: scale(0.95);
		opacity: 0;

		transition: opacity var(--transition-speed-default) ease, transform var(--transition-speed-default) ease;

		&--in-view
		{
			opacity: 1;
			transform: scale(1);
		}
	}

	.embla {
		overflow: hidden;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	.performance {
		-webkit-transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000;
		transform: translate3d(0,0,0);
		transform: translateZ(0);
	}

	::placeholder {
		color: currentcolor;
		opacity: 1;
	}

	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}

	input[type="hidden"] {
		display: none;
	}

	input,
	textarea,
	select {
		padding: 0.125rem 0;
		font-size: ${pxToRem(16)};
		width: 100%;
		appearance: none;
	}

	input::placeholder,
	textarea::placeholder {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	textarea {
		min-height: 5rem;
	}

	label {
		display: inline-block;
	}

	.overflow-hidden {
		overflow: hidden;
	}

	img,
	video {
		max-width: 100%;
		display: block;
		height: auto;
	}

	iframe {
		max-width: 100%;
		display: block;
	}

	html.lenis {
		height: auto;
	}

	.lenis.lenis-smooth {
		scroll-behavior: auto !important;
	}

	.lenis.lenis-smooth [data-lenis-prevent] {
		overscroll-behavior: contain;
	}

	.lenis.lenis-stopped {
		overflow: hidden;
	}

	.lenis.lenis-scrolling iframe {
		pointer-events: none;
	}
`;
