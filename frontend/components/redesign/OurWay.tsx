import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type {
	Image,
	ListEntry,
	OurWayPage,
	RedesignSettings
} from '../../lib/redesign/types';
import Artwork, { fadeInHero, imageSource } from './Artwork';
import ConsultationLink from './ConsultationLink';
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
				<li className="type-large" key={entry._key}>
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
	const heroRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const element = heroRef.current;
		const reveal = element?.querySelector('.hero-reveal');
		if (!element || !reveal) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const title = element.querySelector('h1');
		const statement = element.querySelector('.hero-statement-reveal');
		const header = document.querySelector('header .header-inner');
		const animations: Animation[] = [];
		let disposed = false;
		let ready = false;
		let frame = 0;
		const update = () => {
			frame = 0;
			const height = element.offsetHeight;
			const scroll = Math.max(0, Math.min(window.scrollY, height));
			const progress =
				ready && !reduced.matches ? scroll / Math.max(1, height) : 0;
			// Match Home's slower layer, zoom, blur and gradual darkening.
			element.style.setProperty(
				'--hero-y',
				`${progress * height * 0.35}px`
			);
			element.style.setProperty(
				'--hero-scale',
				String(1 + progress * 0.16)
			);
			element.style.setProperty('--hero-blur', `${progress * 12}px`);
			element.style.setProperty(
				'--hero-shade',
				String(0.22 + progress * 0.14)
			);
			if (title && header) {
				const initialGap =
					(height - title.offsetHeight) / 2 -
					header.getBoundingClientRect().bottom;
				const clearance = Math.min(32, Math.max(0, initialGap * 0.15));
				const travel = Math.max(1, initialGap - clearance);
				const fadeDistance = Math.max(1, Math.min(160, travel * 0.65));
				const fade = Math.max(
					0,
					Math.min(
						1,
						(progress * height * 0.65 - (travel - fadeDistance)) /
							fadeDistance
					)
				);
				const eased = fade * fade * (3 - 2 * fade);
				element.style.setProperty(
					'--hero-title-opacity',
					String(1 - eased)
				);
				element.style.setProperty(
					'--hero-title-blur',
					`${eased * 12}px`
				);
			}
		};
		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};
		const settle = () => {
			if (disposed) return;
			ready = true;
			element.dataset.heroPhase = 'settled';
			animations.forEach((animation) => animation.cancel());
			update();
		};
		const enter = async () => {
			// Restored scroll positions should not replay a height change above the reader.
			if (reduced.matches || window.scrollY > 0) return settle();
			try {
				element.dataset.heroPhase = 'reveal';
				if (statement)
					animations.push(
						statement.animate(
							[
								{ opacity: 0, filter: 'blur(8px)' },
								{ opacity: 1, filter: 'blur(0px)' }
							],
							{
								delay: 1000,
								duration: 700,
								easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
								fill: 'both'
							}
						)
					);
				const entrance = reveal.animate(
					[
						{ transform: 'scale(1.04)', filter: 'blur(6px)' },
						{ transform: 'scale(1)', filter: 'blur(0px)' }
					],
					{
						duration: 1500,
						easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
						fill: 'both'
					}
				);
				animations.push(entrance);
				await entrance.finished;
				if (disposed || ready) return;
				element.dataset.heroPhase = 'recede';
				const recede = element.animate(
					[{ height: '100vh' }, { height: 'calc(100vh - 32px)' }],
					{
						duration: 800,
						easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
						fill: 'both'
					}
				);
				animations.push(recede);
				await recede.finished;
			} catch {
				// Cancellation or unsupported animation leaves the page fully usable.
			}
			settle();
		};
		const onPreference = () => {
			if (reduced.matches) settle();
			else schedule();
		};
		void enter();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		reduced.addEventListener('change', onPreference);
		const observer = new ResizeObserver(schedule);
		observer.observe(element);
		if (title) observer.observe(title);
		return () => {
			disposed = true;
			animations.forEach((animation) => animation.cancel());
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			reduced.removeEventListener('change', onPreference);
			observer.disconnect();
		};
	}, []);
	const desktop = hero?.image || null;
	const mobile =
		hero?.mobileImage?.asset && hero.mobileImage.alt
			? hero.mobileImage
			: desktop;
	const srcSet = sources(desktop);
	return (
		<section
			className="way-hero"
			ref={heroRef}
			data-our-way-hero
			data-header-theme="dark"
			aria-labelledby="way-title"
			style={
				{
					'--desktop-position': position(desktop),
					'--mobile-position': position(mobile)
				} as React.CSSProperties
			}
		>
			<div className="hero-media">
				<div className="hero-reveal">
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
								onLoad={fadeInHero}
								onError={() => setFailed(true)}
							/>
						</picture>
					) : (
						<p className="development-note">
							{pending('Our Way hero artwork')}
						</p>
					)}
				</div>
			</div>
			<div className="hero-shade" aria-hidden="true" />
			<h1 id="way-title">
				<span className="hero-statement-reveal">
					{hero?.statement ||
						pending('Our Way positioning statement')}
				</span>
			</h1>
		</section>
	);
}

type Logos = NonNullable<NonNullable<OurWayPage['credentials']>['logos']>;
export function Recognition({ logos }: { logos: Logos | null | undefined }) {
	if (!logos?.length)
		return (
			<section
				className="recognition"
				data-header-theme="light"
				aria-label="Recognition logos"
			>
				<p className="development-note">
					{pending('recognition logos')}
				</p>
			</section>
		);
	return (
		<section
			className="recognition"
			data-header-theme="light"
			aria-label="Recognition logos"
		>
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
				data-header-theme="light"
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
				data-header-theme="light"
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
			<section
				className="process"
				data-header-theme="dark"
				aria-labelledby="process-heading"
			>
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
						data-lenis-prevent-touch
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
				data-header-theme="dark"
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
					<ConsultationLink className="action">
						{page?.consultation?.buttonLabel ||
							settings?.consultationLabel ||
							'Book a consultation'}{' '}
						<span aria-hidden="true">→</span>
					</ConsultationLink>
				</div>
				<Artwork
					image={page?.consultation?.artwork || null}
					label="consultation artwork"
					sizes="(max-width: 768px) 100vw, 45vw"
				/>
			</section>
			<section
				className="credentials"
				data-header-theme="light"
				aria-label="Studio credentials"
			>
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
