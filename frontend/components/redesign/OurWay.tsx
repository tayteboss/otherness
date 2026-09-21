import { useState } from 'react';
import Link from 'next/link';
import type {
	Image,
	ListEntry,
	OurWayPage,
	RedesignSettings
} from '../../lib/redesign/types';
import Artwork, { imageSource } from './Artwork';
import { OurWayWrapper } from './OurWay.styles';

const pending = (label: string) => `Development placeholder — ${label} pending`;

function Entries({
	entries,
	label
}: {
	entries: ListEntry[] | null | undefined;
	label: string;
}) {
	if (!entries?.length)
		return <p className="development-note">{pending(label)}</p>;
	return (
		<ul className="entry-list">
			{entries.map((entry) => (
				<li key={entry._key}>
					{entry.link?.href ? (
						<Link href={entry.link.href}>
							{entry.title ||
								entry.link.label ||
								pending('title')}
						</Link>
					) : (
						entry.title || pending('title')
					)}
					{entry.detail && <small>{entry.detail}</small>}
				</li>
			))}
		</ul>
	);
}

function position(image: Image | null) {
	const crop = image?.crop;
	const coordinate = (value: number, start: number, end: number) =>
		`${Math.max(
			0,
			Math.min(
				100,
				(100 * (value - start)) / Math.max(0.01, 1 - start - end)
			)
		)}%`;
	return `${coordinate(
		image?.hotspot?.x ?? 0.5,
		crop?.left || 0,
		crop?.right || 0
	)} ${coordinate(
		image?.hotspot?.y ?? 0.5,
		crop?.top || 0,
		crop?.bottom || 0
	)}`;
}
function sources(image: Image | null) {
	return image?.asset?.url && image.alt
		? [400, 800, 1200, 1920, 2560]
				.map((width) => `${imageSource(image, width)} ${width}w`)
				.join(', ')
		: undefined;
}
function Hero({ hero }: { hero: OurWayPage['hero'] }) {
	const [failed, setFailed] = useState(false);
	const desktop = hero?.image || null;
	const mobile =
		hero?.mobileImage?.asset && hero.mobileImage.alt
			? hero.mobileImage
			: desktop;
	const srcSet = sources(desktop);
	return (
		<section
			className="way-hero"
			data-our-way-hero
			aria-labelledby="way-title"
			style={
				{
					'--desktop-position': position(desktop),
					'--mobile-position': position(mobile)
				} as React.CSSProperties
			}
		>
			{srcSet && !failed ? (
				<picture>
					<source
						media="(max-width: 768px)"
						srcSet={sources(mobile)}
						sizes="100vw"
					/>
					<img
						className="hero-image"
						src={imageSource(desktop, 1920)}
						srcSet={srcSet}
						sizes="100vw"
						alt={desktop?.alt || ''}
						loading="eager"
						onError={() => setFailed(true)}
					/>
				</picture>
			) : (
				<p className="development-note">
					{pending('Our Way hero artwork')}
				</p>
			)}
			<div className="hero-shade" aria-hidden="true" />
			<h1 id="way-title">
				{hero?.statement || pending('Our Way positioning statement')}
			</h1>
			<a className="action scroll-down" href="#way-introduction">
				{hero?.scrollLabel || 'Scroll down'} ↓
			</a>
		</section>
	);
}

type Logos = NonNullable<NonNullable<OurWayPage['credentials']>['logos']>;
export function Recognition({ logos }: { logos: Logos | null | undefined }) {
	const [paused, setPaused] = useState(false);
	if (!logos?.length)
		return (
			<section className="recognition" aria-label="Recognition logos">
				<p className="development-note">
					{pending('recognition logos')}
				</p>
			</section>
		);
	return (
		<section
			className="recognition"
			aria-label="Recognition logos"
			data-paused={paused}
		>
			<div className="logo-controls">
				<button
					type="button"
					aria-pressed={paused}
					onClick={() => setPaused(!paused)}
				>
					{paused ? 'Resume logo movement' : 'Pause logo movement'}
				</button>
			</div>
			<div className="logo-belt">
				{[false, true].map((duplicate) => (
					<ul
						className="logo-group"
						key={String(duplicate)}
						aria-hidden={duplicate || undefined}
					>
						{logos.map((logo) => (
							<li key={logo._key}>
								{!duplicate && logo.link?.href ? (
									<Link
										href={logo.link.href}
										aria-label={
											logo.link.label ||
											logo.title ||
											logo.image?.alt ||
											'Recognition'
										}
									>
										<Artwork
											image={logo.image}
											label={
												logo.title || 'recognition logo'
											}
											sizes="160px"
										/>
									</Link>
								) : (
									<Artwork
										image={logo.image}
										label={logo.title || 'recognition logo'}
										sizes="160px"
									/>
								)}
							</li>
						))}
					</ul>
				))}
			</div>
		</section>
	);
}

export default function OurWay({
	page,
	settings
}: {
	page: OurWayPage | null;
	settings: RedesignSettings | null;
}) {
	const partnership = page?.partnership;
	const principles = partnership?.principles?.length
		? partnership.principles
		: Array.from({ length: 4 }, (_, i) => ({
				_key: `pending-${i}`,
				title: pending(`principle ${i + 1}`),
				description: null
		  }));
	const credentials = page?.credentials;
	return (
		<OurWayWrapper>
			<Hero hero={page?.hero || null} />
			<section
				className="way-introduction"
				id="way-introduction"
				aria-label="Our approach"
				tabIndex={-1}
			>
				<p className="serif large-copy">
					{page?.introduction?.text ||
						pending('sector and client introduction')}
				</p>
			</section>
			<section
				className="partnership"
				aria-labelledby="partnership-heading"
			>
				<h2 className="serif" id="partnership-heading">
					{partnership?.heading || pending('partnership heading')}
				</h2>
				<ol className="principles">
					{principles.map((principle) => (
						<li key={principle._key}>
							<h3 className="label">
								{principle.title || pending('principle title')}
							</h3>
							<p>
								{principle.description ||
									pending('principle description')}
							</p>
						</li>
					))}
				</ol>
				<div className="founder-note">
					{credentials?.founderHeading && (
						<h3 className="label">{credentials.founderHeading}</h3>
					)}
					<p>{partnership?.founderNote || pending('founder note')}</p>
				</div>
			</section>
			<section className="process" aria-labelledby="process-heading">
				<h2 className="serif" id="process-heading">
					{page?.process?.heading || pending('process heading')}
				</h2>
				{page?.process?.description && (
					<p>{page.process.description}</p>
				)}
				{page?.process?.stages?.length ? (
					<ol
						className="process-track"
						aria-label="Process stages — scroll horizontally on mobile"
						tabIndex={0}
						data-lenis-prevent
					>
						{page.process.stages.map((stage) => (
							<li key={stage._key}>
								<h3 className="label">
									{stage.title || pending('stage title')}
								</h3>
								{stage.description && (
									<p>{stage.description}</p>
								)}
								<Entries
									entries={stage.services}
									label="stage services"
								/>
							</li>
						))}
					</ol>
				) : (
					<p className="development-note">
						{pending('process stages')}
					</p>
				)}
			</section>
			<section
				className="consultation"
				aria-labelledby="consultation-heading"
			>
				<div className="consultation-copy">
					<h2 id="consultation-heading">
						{page?.consultation?.heading ||
							pending('consultation heading')}
					</h2>
					<p>
						{page?.consultation?.text ||
							pending('consultation text')}
					</p>
					{settings?.consultationUrl ? (
						<a className="action" href={settings.consultationUrl}>
							{page?.consultation?.buttonLabel ||
								settings.consultationLabel ||
								'Book a consultation'}{' '}
							→
						</a>
					) : (
						<p className="development-note">
							{pending('consultation destination')}
						</p>
					)}
				</div>
				<Artwork
					image={page?.consultation?.artwork || null}
					label="consultation artwork"
					sizes="(max-width: 768px) 100vw, 45vw"
				/>
			</section>
			<section className="credentials" aria-label="Studio credentials">
				{credentials?.founderHeading && (
					<h2 className="label">{credentials.founderHeading}</h2>
				)}
				<p className="serif large-copy">
					{credentials?.biography || pending('founder biography')}
				</p>
				<div className="credential-columns">
					{(['services', 'clients', 'recognition'] as const).map(
						(key, i) => (
							<div key={key}>
								<h3 className="label">
									{
										[
											'Services',
											'Notable clients',
											'Notable recognition'
										][i]
									}
								</h3>
								<Entries
									entries={credentials?.[key]}
									label={key}
								/>
							</div>
						)
					)}
				</div>
			</section>
			<Recognition logos={credentials?.logos} />
		</OurWayWrapper>
	);
}
