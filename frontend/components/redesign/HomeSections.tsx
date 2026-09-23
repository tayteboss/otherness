import ConsultationLink from './ConsultationLink';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import {
	CSSProperties,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import type {
	HomePageV2,
	LegacyNoticedEntry,
	RedesignSettings
} from '../../lib/redesign/types';
import Artwork from './Artwork';
import NoticedCursorLayout from '../layout/NoticedCursorLayout';
import { HomeSectionsWrapper } from './HomeSections.styles';

type Services = NonNullable<HomePageV2['services']>;
type Results = NonNullable<HomePageV2['results']>;

// Cursor-following thumbnail wrapper, reused verbatim from the legacy
// NoticedCard so the hover interaction stays identical.
const ThumbWrapper = styled.div`
	width: 15vw;
	padding-top: 100%;
	position: relative;
`;

const ThumbInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

// External URLs open in a new tab; internal page references resolve to the
// live Work/Conversations routes, matching the legacy Noticed behaviour.
function resolveNoticedHref(entry: LegacyNoticedEntry): string | null {
	if (entry.url) return entry.url;
	const ref = entry.pageReference;
	if (ref?.slug) {
		if (ref._type === 'project') return `/work/${ref.slug}`;
		if (ref._type === 'article') return `/conversations/${ref.slug}`;
	}
	return null;
}

// useLayoutEffect avoids a paint flash when collapsing panels, but must fall
// back to useEffect during SSR to keep React from warning.
const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

// Animates a clip wrapper between a collapsed (0) and expanded (auto) height.
// `instant` (first mount / reduced motion) skips the transition entirely.
function animateHeight(el: HTMLElement, open: boolean, instant: boolean) {
	// A quick reversal can already be at the target height, so no transitionend
	// will fire. Release that height immediately to keep the panel responsive.
	if (
		instant ||
		prefersReducedMotion() ||
		(open &&
			Math.abs(el.getBoundingClientRect().height - el.scrollHeight) < 1)
	) {
		el.style.transition = 'none';
		el.style.height = open ? 'auto' : '0px';
		void el.offsetHeight;
		el.style.transition = '';
		return;
	}
	const start = el.getBoundingClientRect().height;
	el.style.height = `${start}px`;
	// Force a reflow so the browser registers the start height before we
	// change it, otherwise the transition is skipped.
	void el.offsetHeight;
	el.style.height = open ? `${el.scrollHeight}px` : '0px';
}

function ServicesSection({ services }: { services: Services }) {
	const [open, setOpen] = useState<string | null>(
		() =>
			(
				services.find(
					(service) => service.title?.toLowerCase() === 'branding'
				) || services[0]
			)?._key || null
	);
	const summaryRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const trackRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const mounted = useRef(false);

	useIsomorphicLayoutEffect(() => {
		services.forEach((service) => {
			const isOpen = open === service._key;
			const panel = panelRefs.current[service._key];
			// inert keeps collapsed content out of tab order and AT.
			if (panel) panel.toggleAttribute('inert', !isOpen);
			[summaryRefs, trackRefs].forEach((store) => {
				const el = store.current[service._key];
				if (el) animateHeight(el, isOpen, !mounted.current);
			});
		});
		mounted.current = true;
	}, [open, services]);

	const settleHeight = (
		event: React.TransitionEvent<HTMLDivElement>,
		key: string
	) => {
		// Once opening finishes, release the height so the panel stays
		// responsive to content/viewport changes.
		if (event.propertyName === 'height' && open === key) {
			event.currentTarget.style.height = 'auto';
		}
	};

	return (
		<section
			className="services"
			id="services"
			aria-labelledby="services-heading"
		>
			<h2 className="section-label" id="services-heading">
				Services
			</h2>
			{!services.length && (
				<p className="development-note">
					Development placeholder — services pending.
				</p>
			)}
			{services.map((service) => (
				<div
					className="service"
					key={service._key}
					data-expanded={open === service._key}
				>
					<h3>
						<button
							className="service-toggle"
							type="button"
							id={`service-${service._key}`}
							aria-expanded={open === service._key}
							aria-controls={`service-panel-${service._key}`}
							onClick={() =>
								setOpen(
									open === service._key ? null : service._key
								)
							}
						>
							<span className="service-title type-h3">
								{service.title ||
									'Development placeholder — service title'}
							</span>
							<span className="symbol" aria-hidden="true">
								{open === service._key ? '-' : '+'}
							</span>
						</button>
					</h3>
					<div
						className="service-panel"
						role="region"
						id={`service-panel-${service._key}`}
						aria-labelledby={`service-${service._key}`}
						ref={(el) => {
							panelRefs.current[service._key] = el;
						}}
					>
						<div
							className="service-summary"
							ref={(el) => {
								summaryRefs.current[service._key] = el;
							}}
							onTransitionEnd={(event) =>
								settleHeight(event, service._key)
							}
						>
							<div className="service-summary-body">
								{service.description ? (
									<p className="type-large">
										{service.description}
									</p>
								) : (
									<p className="type-large">
										Development placeholder — service
										description pending.
									</p>
								)}
								<ConsultationLink className="button-primary">
									{service.contactLabel || 'Get in touch'}{' '}
									<span aria-hidden="true">→</span>
								</ConsultationLink>
							</div>
						</div>
						<div
							className="service-track"
							ref={(el) => {
								trackRefs.current[service._key] = el;
							}}
							onTransitionEnd={(event) =>
								settleHeight(event, service._key)
							}
						>
							<ul
								className="project-track"
								tabIndex={0}
								aria-label={`${
									service.title || 'Service'
								} projects`}
								data-lenis-prevent-touch
							>
								{(service.projects || []).map((card) => {
									const content = (
										<>
											<Artwork
												key={
													card.image?.asset?._id ||
													'pending'
												}
												image={card.image}
												label="project artwork pending"
											/>
											<p className="project-title heading-small">
												{card.project?.title ||
													'Development placeholder — project unavailable'}
											</p>
											{card.caption && (
												<p className="project-caption type-h5">
													{card.caption}
												</p>
											)}
										</>
									);
									return (
										<li
											className="project-card"
											key={card._key}
										>
											{card.project?.slug &&
											!card.project.archiveProject ? (
												<Link
													href={`/work/${card.project.slug}`}
												>
													{content}
												</Link>
											) : (
												content
											)}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			))}
		</section>
	);
}

export function ResultsSection({ results }: { results: Results }) {
	const [selected, setSelected] = useState(0);
	const [pausedByUser, setPausedByUser] = useState(false);
	const [reduceMotion, setReduceMotion] = useState(false);
	const [inView, setInView] = useState(false);
	const tabs = useRef<(HTMLButtonElement | null)[]>([]);
	const sectionRef = useRef<HTMLElement>(null);
	const swipeStart = useRef<{ x: number; y: number } | null>(null);
	const suppressClick = useRef(false);
	const playing = !pausedByUser && !reduceMotion && results.length > 1;

	useEffect(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const syncMotion = () => setReduceMotion(motion.matches);
		syncMotion();
		motion.addEventListener('change', syncMotion);
		return () => motion.removeEventListener('change', syncMotion);
	}, []);

	useEffect(() => {
		const node = sectionRef.current;
		if (!node) return undefined;
		const observer = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ threshold: 0.35 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const selectResult = (index: number, fromUser = false) => {
		if (!results.length) return;
		if (fromUser) setPausedByUser(true);
		const next = (index + results.length) % results.length;
		// A drag can focus the outgoing panel; keep focus out of hidden content.
		if (
			sectionRef.current
				?.querySelector('.result-panel[data-active="true"]')
				?.contains(document.activeElement)
		) {
			tabs.current[next]?.focus({ preventScroll: true });
		}
		setSelected(next);
	};

	return (
		<section
			ref={sectionRef}
			className="results"
			id="results"
			aria-labelledby="results-heading"
			data-inview={inView ? 'true' : 'false'}
			data-playing={playing ? 'true' : 'false'}
			onPointerDown={(event) => {
				suppressClick.current = false;
				if (
					window.innerWidth > 768 ||
					!event.isPrimary ||
					event.button !== 0
				)
					return;
				swipeStart.current = { x: event.clientX, y: event.clientY };
				if (!(event.target as HTMLElement).closest('button')) {
					event.currentTarget.setPointerCapture(event.pointerId);
				}
			}}
			onPointerUp={(event) => {
				if (!event.isPrimary) return;
				const start = swipeStart.current;
				swipeStart.current = null;
				if (!start || results.length < 2) return;
				const dx = event.clientX - start.x;
				const dy = event.clientY - start.y;
				if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
				suppressClick.current = true;
				selectResult(selected + (dx < 0 ? 1 : -1), true);
			}}
			onPointerCancel={() => {
				swipeStart.current = null;
			}}
			onClickCapture={(event) => {
				if (!suppressClick.current) return;
				event.preventDefault();
				event.stopPropagation();
				suppressClick.current = false;
			}}
		>
			{results.map((result, index) => (
				<div
					key={result._key}
					className={`result-background ${
						result.mobileBackground ? 'desktop-label' : ''
					}`}
					data-active={selected === index ? 'true' : 'false'}
				>
					<Artwork
						image={result.background}
						label="results background pending"
						sizes="100vw"
					/>
				</div>
			))}
			{results.map(
				(result, index) =>
					result.mobileBackground && (
						<div
							key={`${result._key}-mobile`}
							className="result-background mobile-label"
							data-active={selected === index ? 'true' : 'false'}
						>
							<Artwork
								image={result.mobileBackground}
								label="mobile results background pending"
								sizes="100vw"
							/>
						</div>
					)
			)}
			<h2 className="section-label" id="results-heading">
				<span className="desktop-label">Results</span>
				<span className="mobile-label">Results &amp; social proof</span>
			</h2>
			<div className="result-stage">
				{!results.length && (
					<div className="result-panel" data-active="true">
						<p className="development-note">
							Development placeholder — results pending.
						</p>
					</div>
				)}
				{results.map((result, index) => (
					<div
						key={result._key}
						role="tabpanel"
						id={`result-panel-${result._key}`}
						aria-labelledby={`result-tab-${result._key}`}
						aria-hidden={selected !== index}
						tabIndex={selected === index ? 0 : -1}
						className="result-panel"
						data-active={selected === index ? 'true' : 'false'}
					>
						{result.logo?.asset?.url && result.logo.alt ? (
							<img
								className="result-logo"
								src={result.logo.asset.url}
								alt={result.logo.alt}
								width={
									result.logo.asset.metadata?.dimensions
										?.width
								}
								height={
									result.logo.asset.metadata?.dimensions
										?.height
								}
								loading="lazy"
							/>
						) : (
							<p className="result-client">
								<small className="development-note">
									Development placeholder — client logo
									pending.
								</small>
							</p>
						)}
						<blockquote className="result-quote serif">
							{result.quote ||
								'Development placeholder — quote pending.'}
						</blockquote>
					</div>
				))}
			</div>
			{!!results.length && (
				<div
					className="result-tabs"
					role="tablist"
					aria-label="Client results"
					data-lenis-prevent-touch
				>
					{results.map((result, index) => (
						<button
							key={result._key}
							style={
								{
									'--result-order':
										(index - selected + results.length) %
										results.length
								} as CSSProperties
							}
							ref={(element) => {
								tabs.current[index] = element;
							}}
							type="button"
							role="tab"
							id={`result-tab-${result._key}`}
							aria-controls={`result-panel-${result._key}`}
							aria-selected={selected === index}
							data-playing={playing ? 'true' : 'false'}
							tabIndex={selected === index ? 0 : -1}
							onClick={() => selectResult(index, true)}
							onKeyDown={(event) => {
								const next =
									event.key === 'ArrowRight'
										? (index + 1) % results.length
										: event.key === 'ArrowLeft'
										? (index - 1 + results.length) %
										  results.length
										: event.key === 'Home'
										? 0
										: event.key === 'End'
										? results.length - 1
										: null;
								if (next === null) return;
								event.preventDefault();
								selectResult(next, true);
								tabs.current[next]?.focus({
									preventScroll: true
								});
								if (window.innerWidth > 768) {
									tabs.current[next]?.scrollIntoView({
										block: 'nearest',
										inline: 'nearest'
									});
								}
							}}
						>
							<span
								className="result-tab-progress"
								aria-hidden="true"
							/>
							{result.client ||
								'Development placeholder — client name pending.'}
							{playing && selected === index && (
								<span
									className="result-tab-play"
									aria-hidden="true"
									onAnimationEnd={(event) => {
										if (
											event.target !== event.currentTarget
										)
											return;
										setSelected(
											(current) =>
												(current + 1) % results.length
										);
									}}
								/>
							)}
						</button>
					))}
				</div>
			)}
		</section>
	);
}

function NoticedSection({ entries }: { entries: LegacyNoticedEntry[] }) {
	const [active, setActive] = useState<string | null>(null);
	const [open, setOpen] = useState<string | null>(entries[0]?._key || null);
	const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const mounted = useRef(false);
	useIsomorphicLayoutEffect(() => {
		entries.forEach((entry) => {
			const panel = panelRefs.current[entry._key];
			if (!panel) return;
			const isOpen = open === entry._key;
			panel.toggleAttribute('inert', !isOpen);
			animateHeight(
				panel,
				isOpen,
				!mounted.current ||
					panel.offsetWidth === 0 ||
					(isOpen && panel.style.height === 'auto')
			);
		});
		mounted.current = true;
	}, [open, entries]);
	// Persist the last shown thumbnail so it can animate out with the cursor
	// overlay after the row loses hover/focus.
	const [lastThumb, setLastThumb] = useState<string>('');

	const activeEntry = entries.find((entry) => entry._key === active) || null;

	useEffect(() => {
		if (activeEntry?.thumbnailImage)
			setLastThumb(activeEntry.thumbnailImage);
	}, [activeEntry]);

	return (
		<section
			className="noticed"
			id="noticed"
			aria-labelledby="noticed-heading"
		>
			<h2 className="section-label" id="noticed-heading">
				Noticed
			</h2>
			{!entries.length && (
				<p className="development-note">
					Development placeholder — Noticed entries pending.
				</p>
			)}
			<ol className="noticed-list" onMouseLeave={() => setActive(null)}>
				{entries.map((entry) => {
					const href = resolveNoticedHref(entry);
					const isExternal = !!entry.url;
					const body = (
						<>
							<span>
								{entry.title ||
									'Development placeholder — title pending'}
							</span>
							<span className="noticed-detail">
								{entry.source}
							</span>
							<span className="noticed-detail">{entry.year}</span>
							<span className="noticed-detail" aria-hidden="true">
								→
							</span>
						</>
					);
					return (
						<li
							className="noticed-row"
							key={entry._key}
							data-active={active === entry._key}
							data-expanded={open === entry._key}
							onMouseEnter={() => setActive(entry._key)}
							onFocus={() => setActive(entry._key)}
							onBlur={(event) => {
								if (
									!event.currentTarget.contains(
										event.relatedTarget
									)
								)
									setActive(null);
							}}
						>
							<div className="noticed-mobile">
								<button
									className="noticed-toggle"
									type="button"
									id={`noticed-toggle-${entry._key}`}
									aria-expanded={open === entry._key}
									aria-controls={`noticed-panel-${entry._key}`}
									onClick={() =>
										setOpen(
											open === entry._key
												? null
												: entry._key
										)
									}
								>
									{entry.title ||
										'Development placeholder — title pending'}
								</button>
								<div
									className="noticed-panel"
									id={`noticed-panel-${entry._key}`}
									role="region"
									aria-labelledby={`noticed-toggle-${entry._key}`}
									ref={(el) => {
										panelRefs.current[entry._key] = el;
									}}
									onTransitionEnd={(event) => {
										if (
											event.target ===
												event.currentTarget &&
											event.propertyName === 'height' &&
											open === entry._key
										)
											event.currentTarget.style.height =
												'auto';
									}}
								>
									<div className="noticed-panel-body">
										<div className="noticed-copy">
											{/* Reserve the toggle's text height, including wrapped titles. */}
											<span
												className="noticed-title-space"
												aria-hidden="true"
											>
												{entry.title ||
													'Development placeholder — title pending'}
											</span>
											<span>{entry.source}</span>
											<span>{entry.year}</span>
											{href && (
												<a
													className="noticed-arrow"
													href={href}
													target={
														isExternal
															? '_blank'
															: undefined
													}
													rel={
														isExternal
															? 'noreferrer'
															: undefined
													}
													aria-label={`View ${
														entry.title || 'feature'
													}${
														isExternal
															? ' (opens in a new tab)'
															: ''
													}`}
												>
													<span aria-hidden="true">
														→
													</span>
												</a>
											)}
										</div>
										{entry.thumbnailImage && (
											<div className="noticed-thumbnail">
												<Image
													src={entry.thumbnailImage}
													alt=""
													fill
													sizes="(max-width: 768px) 50vw, 15vw"
												/>
											</div>
										)}
									</div>
								</div>
							</div>
							{href ? (
								isExternal ? (
									<a
										className="noticed-link"
										href={href}
										target="_blank"
										rel="noreferrer"
									>
										{body}
									</a>
								) : (
									<Link className="noticed-link" href={href}>
										{body}
									</Link>
								)
							) : (
								<div className="noticed-link">{body}</div>
							)}
						</li>
					);
				})}
			</ol>
			<NoticedCursorLayout isActive={!!activeEntry?.thumbnailImage}>
				{lastThumb && (
					<ThumbWrapper>
						<ThumbInner>
							<Image
								src={lastThumb}
								alt="Noticed thumbnail"
								fill
								sizes="15vw"
								loading="lazy"
							/>
						</ThumbInner>
					</ThumbWrapper>
				)}
			</NoticedCursorLayout>
		</section>
	);
}

export default function HomeSections({
	home,
	noticed
}: {
	home: HomePageV2 | null;
	settings: RedesignSettings | null;
	noticed: LegacyNoticedEntry[];
}) {
	return (
		<HomeSectionsWrapper data-redesign-home>
			<section
				className="introduction"
				id="introduction"
				aria-labelledby="introduction-heading"
			>
				<h2 className="serif" id="introduction-heading">
					{home?.introduction?.heading ||
						'Development placeholder — introduction heading pending'}
				</h2>
				<p className="statement heading-small">
					{home?.introduction?.statement ||
						'Development placeholder — agency statement pending.'}
				</p>
				{home?.introduction?.link?.href && (
					<Link
						className="button-primary"
						href={home.introduction.link.href}
						prefetch={false}
					>
						{home.introduction.link.label || 'What to expect'}{' '}
						<span aria-hidden="true">→</span>
					</Link>
				)}
			</section>
			<ServicesSection services={home?.services || []} />
			<ResultsSection results={home?.results || []} />
			<NoticedSection entries={noticed || []} />
		</HomeSectionsWrapper>
	);
}
