import Link from 'next/link';
import { useRef, useState } from 'react';
import type { HomePageV2, RedesignSettings } from '../../lib/redesign/types';
import Artwork from './Artwork';
import { HomeSectionsWrapper } from './HomeSections.styles';

type Services = NonNullable<HomePageV2['services']>;
type Results = NonNullable<HomePageV2['results']>;
type Noticed = NonNullable<HomePageV2['noticed']>;

function ServicesSection({
	services,
	consultationUrl
}: {
	services: Services;
	consultationUrl?: string | null;
}) {
	const [open, setOpen] = useState<string | null>(
		() =>
			(
				services.find(
					(service) => service.title?.toLowerCase() === 'branding'
				) || services[0]
			)?._key || null
	);
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
				<div className="service" key={service._key}>
					<h3>
						<button
							className="service-toggle serif"
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
							{service.title ||
								'Development placeholder — service title'}
							<span className="symbol" aria-hidden="true">
								{open === service._key ? '−' : '+'}
							</span>
						</button>
					</h3>
					<div
						role="region"
						id={`service-panel-${service._key}`}
						aria-labelledby={`service-${service._key}`}
						hidden={open !== service._key}
					>
						<div className="service-summary">
							{service.description ? (
								<p>{service.description}</p>
							) : (
								<p className="development-note">
									Development placeholder — service
									description pending.
								</p>
							)}
							{consultationUrl && (
								<a className="action" href={consultationUrl}>
									{service.contactLabel || 'Get in touch'}{' '}
									<span aria-hidden="true">→</span>
								</a>
							)}
						</div>
						<ul
							className="project-track"
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
										<p className="project-title">
											{card.project?.title ||
												'Development placeholder — project unavailable'}
										</p>
										{card.caption && (
											<p className="project-caption serif">
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
			))}
		</section>
	);
}

export function ResultsSection({ results }: { results: Results }) {
	const [selected, setSelected] = useState(0);
	const tabs = useRef<(HTMLButtonElement | null)[]>([]);
	return (
		<section
			className="results"
			id="results"
			aria-labelledby="results-heading"
		>
			<h2 className="section-label" id="results-heading">
				<span className="desktop-label">Results</span>
				<span className="mobile-label">Results &amp; social proof</span>
			</h2>
			{!results.length && (
				<div className="result-panel">
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
					tabIndex={0}
					hidden={selected !== index}
					className="result-panel"
				>
					<Artwork
						image={result.background}
						label="results background pending"
						className={`result-background ${
							result.mobileBackground ? 'desktop-label' : ''
						}`}
						sizes="100vw"
					/>
					{result.mobileBackground && (
						<Artwork
							image={result.mobileBackground}
							label="mobile results background pending"
							className="result-background mobile-label"
							sizes="100vw"
						/>
					)}
					{result.logo?.asset?.url && result.logo.alt ? (
						<img
							className="result-logo"
							src={result.logo.asset.url}
							alt={result.logo.alt}
							loading="lazy"
						/>
					) : (
						<p className="result-client">
							{result.client}
							<br />
							<small className="development-note">
								Development placeholder — client logo pending.
							</small>
						</p>
					)}
					<blockquote className="result-quote serif">
						{result.quote ||
							'Development placeholder — quote pending.'}
					</blockquote>
				</div>
			))}
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
							ref={(element) => {
								tabs.current[index] = element;
							}}
							type="button"
							role="tab"
							id={`result-tab-${result._key}`}
							aria-controls={`result-panel-${result._key}`}
							aria-selected={selected === index}
							tabIndex={selected === index ? 0 : -1}
							onClick={() => setSelected(index)}
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
								setSelected(next);
								tabs.current[next]?.focus({
									preventScroll: true
								});
								tabs.current[next]?.scrollIntoView({
									block: 'nearest',
									inline: 'nearest'
								});
							}}
						>
							{result.attribution ||
								result.client ||
								'Development placeholder — attribution pending.'}
						</button>
					))}
				</div>
			)}
		</section>
	);
}

function NoticedSection({ entries }: { entries: Noticed }) {
	const [active, setActive] = useState<string | null>(null);
	const [expanded, setExpanded] = useState<string | null>(
		entries[0]?._key || null
	);
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
				{entries.map((entry) => (
					<li
						className="noticed-row"
						key={entry._key}
						data-active={active === entry._key}
						data-expanded={expanded === entry._key}
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
						{entry.link?.href ? (
							<Link
								className="noticed-link"
								href={entry.link.href}
							>
								<span>
									{entry.title ||
										'Development placeholder — title pending'}
								</span>
								<span className="noticed-detail">
									{entry.source}
								</span>
								<span className="noticed-detail">
									{entry.year}
								</span>
								<span
									className="noticed-detail"
									aria-hidden="true"
								>
									→
								</span>
							</Link>
						) : (
							<div className="noticed-link">
								<span>
									{entry.title ||
										'Development placeholder — title pending'}
								</span>
								<span className="noticed-detail">
									{entry.source}
								</span>
								<span className="noticed-detail">
									{entry.year}
								</span>
								<span className="development-note">
									Link pending
								</span>
							</div>
						)}
						<button
							type="button"
							className="noticed-toggle"
							aria-label={`Details for ${
								entry.title || 'Noticed entry'
							}`}
							aria-expanded={expanded === entry._key}
							aria-controls={`noticed-image-${entry._key}`}
							onClick={() =>
								setExpanded(
									expanded === entry._key ? null : entry._key
								)
							}
						>
							<span aria-hidden="true">
								{expanded === entry._key ? '−' : '+'}
							</span>
						</button>
						<div
							className="noticed-image"
							id={`noticed-image-${entry._key}`}
						>
							<Artwork
								image={entry.image}
								label="Noticed thumbnail pending"
								sizes="260px"
							/>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}

export default function HomeSections({
	home,
	settings
}: {
	home: HomePageV2 | null;
	settings: RedesignSettings | null;
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
				<div className="statement">
					{home?.introduction?.statement || (
						<p className="development-note">
							Development placeholder — agency statement pending.
						</p>
					)}
				</div>
				{home?.introduction?.link?.href && (
					<Link
						className="action"
						href={home.introduction.link.href}
						prefetch={false}
					>
						{home.introduction.link.label || 'What to expect'}{' '}
						<span aria-hidden="true">→</span>
					</Link>
				)}
			</section>
			<ServicesSection
				services={home?.services || []}
				consultationUrl={settings?.consultationUrl}
			/>
			<ResultsSection results={home?.results || []} />
			<NoticedSection entries={home?.noticed || []} />
		</HomeSectionsWrapper>
	);
}
