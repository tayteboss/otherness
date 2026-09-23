import { css } from 'styled-components';

// Opt-in only: do not merge these into GlobalStyles or the legacy Work theme.
export const redesignTokens = {
	colours: {
		ink: '#1A1715',
		paper: '#F7F4F0',
		white: '#FFFFFF',
		taupe: '#67605A',
		// Placeholder beige for the inactive service hover rule — adjust hex.
		beige: '#C4B7A6'
	},
	fonts: {
		serif: "'Baryton Regular', Georgia, serif",
		// Supplied Neue Montreal web fonts are declared in redesign-fonts.css.
		sans: "'Neue Montreal', 'Classic Grotesque Pro Regular', Arial, sans-serif"
	},
	spacing: {
		gutterDesktop: '64px',
		gutterMobile: '24px',
		sectionDesktop: '128px',
		sectionMobile: '64px'
	},
	breakpoints: { mobile: '768px' },
	motion: {
		short: '250ms',
		reveal: '600ms',
		ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
	}
} as const;

// Apply to redesign page/chrome wrappers, never to the Work content wrapper.
export const redesignScope = css`
	--redesign-ink: ${redesignTokens.colours.ink};
	--redesign-paper: ${redesignTokens.colours.paper};
	--redesign-white: ${redesignTokens.colours.white};
	--redesign-taupe: ${redesignTokens.colours.taupe};
	--redesign-beige: ${redesignTokens.colours.beige};
	--redesign-serif: ${redesignTokens.fonts.serif};
	--redesign-sans: ${redesignTokens.fonts.sans};
	--redesign-gutter: ${redesignTokens.spacing.gutterDesktop};
	font-family: var(--redesign-sans);
	color: var(--redesign-ink);

	@media (max-width: ${redesignTokens.breakpoints.mobile}) {
		--redesign-gutter: ${redesignTokens.spacing.gutterMobile};
	}

	&,
	p,
	a,
	button,
	div,
	span,
	small {
		font-family: var(--redesign-sans);
	}

	:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 5px;
	}

	.type-h3 {
		font-family: var(--redesign-serif);
		font-size: 40px;
		font-style: normal;
		font-weight: 400;
		line-height: 135%;
		letter-spacing: -0.4px;
	}
	.type-h5 {
		font-family: var(--redesign-serif);
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: 130%;
		letter-spacing: normal;
	}
	.type-large {
		font-family: var(--redesign-sans);
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: 150%;
		letter-spacing: 0.18px;
	}
	.button-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px;
		font-family: var(--redesign-sans);
		font-size: 10px;
		font-style: normal;
		font-weight: 700;
		line-height: 120%;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		vertical-align: top;
		background: var(--button-background, #eae6e2);
		transition: background-color 180ms ease;
	}
	.button-primary span {
		font: inherit;
	}
	.button-primary:hover {
		background: var(--button-hover-background, #d9d4ce);
	}

	.heading-small {
		font-family: var(--redesign-sans);
		font-size: 14px;
		font-style: normal;
		font-weight: 700;
		line-height: 148%;
		letter-spacing: 0.56px;
		text-transform: uppercase;
	}
`;
