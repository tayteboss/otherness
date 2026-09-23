import { useState, type SyntheticEvent } from 'react';
import type { Image } from '../../lib/redesign/types';

export function fadeInHero({
	currentTarget
}: SyntheticEvent<HTMLImageElement>) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	// Start when pixels arrive, including images that load after the page fade.
	currentTarget.animate?.([{ opacity: 0 }, { opacity: 1 }], {
		duration: 700,
		easing: 'ease-out'
	});
}

// Sanity's documented rect transform retains the editorial crop. CSS places the
// hotspot within that cropped rectangle when the layout needs an extra crop.
export function imageSource(image: Image | null, width: number) {
	if (!image?.asset?.url) return undefined;
	const url = new URL(image.asset.url);
	url.searchParams.set('w', String(width));
	url.searchParams.set('auto', 'format');
	url.searchParams.set('fit', 'max');
	const dimensions = image.asset.metadata?.dimensions;
	const crop = image.crop;
	if (dimensions && crop) {
		const x = Math.round(crop.left * dimensions.width);
		const y = Math.round(crop.top * dimensions.height);
		url.searchParams.set(
			'rect',
			[
				x,
				y,
				Math.max(
					1,
					Math.round(dimensions.width * (1 - crop.right)) - x
				),
				Math.max(
					1,
					Math.round(dimensions.height * (1 - crop.bottom)) - y
				)
			].join(',')
		);
	}
	return url.toString();
}

export default function Artwork({
	image,
	label,
	className = '',
	sizes = '(max-width: 768px) 76vw, 33vw'
}: {
	image: Image | null;
	label: string;
	className?: string;
	sizes?: string;
}) {
	const [failed, setFailed] = useState(false);
	const source = imageSource(image, 960);
	const crop = image?.crop;
	const hotspot = image?.hotspot;
	const clamp = (value: number) => Math.max(0, Math.min(100, value));
	const x = clamp(
		(100 * ((hotspot?.x ?? 0.5) - (crop?.left || 0))) /
			(1 - (crop?.left || 0) - (crop?.right || 0))
	);
	const y = clamp(
		(100 * ((hotspot?.y ?? 0.5) - (crop?.top || 0))) /
			(1 - (crop?.top || 0) - (crop?.bottom || 0))
	);
	return (
		<div className={`artwork ${className}`}>
			{source && image?.alt && !failed ? (
				<img
					src={source}
					srcSet={[400, 800, 1200, 1920]
						.map(
							(width) => `${imageSource(image, width)} ${width}w`
						)
						.join(', ')}
					sizes={sizes}
					alt={image.alt}
					loading="lazy"
					decoding="async"
					style={{ objectPosition: `${x}% ${y}%` }}
					onError={() => setFailed(true)}
				/>
			) : (
				<div className="artwork-placeholder development-note">
					Development placeholder — {label}
				</div>
			)}
		</div>
	);
}
