import { css } from 'styled-components';

// The neutral centre leaves the image clear; the gradient edges bend it.
const refractionMap = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="88" viewBox="0 0 240 88">
  <defs>
    <linearGradient id="x"><stop stop-color="#000000"/><stop offset="1" stop-color="#ff0000"/></linearGradient>
    <linearGradient id="y" x2="0" y2="1"><stop stop-color="#000000"/><stop offset="1" stop-color="#00ff00"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  <rect width="240" height="88" fill="url(#x)"/>
  <rect width="240" height="88" fill="url(#y)" style="mix-blend-mode:screen"/>
  <rect x="12" y="12" width="216" height="64" fill="#808000" filter="url(#soft)"/>
</svg>`)}`;

export function HeaderGlassFilter() {
	return (
		<svg
			width="0"
			height="0"
			aria-hidden="true"
			focusable="false"
			style={{ position: 'absolute', pointerEvents: 'none' }}
		>
			<defs>
				<filter
					id="header-glass-refraction"
					x="0"
					y="0"
					width="100%"
					height="100%"
					colorInterpolationFilters="sRGB"
				>
					<feImage
						href={refractionMap}
						width="100%"
						height="100%"
						preserveAspectRatio="none"
						result="rim"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="rim"
						scale="18"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</defs>
		</svg>
	);
}

// Keep refraction fixed across interaction states; only the tint alpha fades.
export const headerGlass = css`
	--header-glass-idle: rgba(255, 255, 255, 0.08);
	--header-glass-hover: rgba(255, 255, 255, 0.16);
	--header-glass-active: rgba(255, 255, 255, 0.2);
	position: relative;
	border: 0;
	border-radius: 0;
	box-shadow: none;
	background: var(--header-glass-idle);
	color: var(--redesign-ink);
	-webkit-backdrop-filter: blur(2px) saturate(1.05);
	backdrop-filter: blur(2px) saturate(1.05);
	transition: background-color 180ms ease;

	@supports (backdrop-filter: url('#header-glass-refraction')) {
		backdrop-filter: url('#header-glass-refraction') blur(1px)
			saturate(1.05);
	}

	&[aria-current='page'],
	&[aria-expanded='true'] {
		background: var(--header-glass-hover);
		box-shadow: none;
	}
	&[aria-current='page'] {
		text-decoration: underline;
		text-underline-offset: 5px;
		text-decoration-thickness: 1px;
	}
	@media (hover: hover) {
		&:hover {
			background-color: var(--header-glass-hover);
		}
	}
	&:active {
		background-color: var(--header-glass-active);
	}
	&:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 4px;
	}
	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
	@media (prefers-reduced-transparency: reduce) {
		--header-glass-idle: #efedeb;
		--header-glass-hover: #e4e1dd;
		--header-glass-active: #d9d4ce;
		-webkit-backdrop-filter: none;
		backdrop-filter: none;
	}
	@media (forced-colors: active) {
		--header-glass-idle: ButtonFace;
		--header-glass-hover: ButtonFace;
		--header-glass-active: ButtonFace;
		color: ButtonText;
		-webkit-backdrop-filter: none;
		backdrop-filter: none;
	}
`;
