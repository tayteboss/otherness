import { css } from 'styled-components';

// Opt-in only: do not merge these into GlobalStyles or the legacy Work theme.
export const redesignTokens = {
	colours: {
		ink: '#1A1715',
		paper: '#F7F4F0',
		white: '#FFFFFF',
		taupe: '#67605A'
	},
	fonts: {
		serif: "'Baryton Regular', Georgia, serif",
		// Neue Montreal @font-face declarations wait for the supplied files.
		sans: "'Neue Montreal', 'Classic Grotesque Pro Regular', Arial, sans-serif"
	},
	spacing: {
		gutterDesktop: '64px',
		gutterMobile: '24px',
		sectionDesktop: '128px',
		sectionMobile: '64px'
	},
	breakpoints: { mobile: '768px' },
	motion: { short: '250ms', reveal: '600ms', ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }
} as const;

// Apply to redesign page/chrome wrappers, never to the Work content wrapper.
export const redesignScope = css`
	--redesign-ink: ${redesignTokens.colours.ink};
	--redesign-paper: ${redesignTokens.colours.paper};
	--redesign-white: ${redesignTokens.colours.white};
	--redesign-taupe: ${redesignTokens.colours.taupe};
	--redesign-serif: ${redesignTokens.fonts.serif};
	--redesign-sans: ${redesignTokens.fonts.sans};
	--redesign-gutter: ${redesignTokens.spacing.gutterDesktop};
	font-family: var(--redesign-sans);
	color: var(--redesign-ink);

	@media (max-width: ${redesignTokens.breakpoints.mobile}) {
		--redesign-gutter: ${redesignTokens.spacing.gutterMobile};
	}

	:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 5px;
	}
`;
