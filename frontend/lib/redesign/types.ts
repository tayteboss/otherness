// Deliberately separate from the legacy Work contracts. Optional editorial fields
// are nullable because an unpublished/incomplete Sanity document is normal in preview.
export type Maybe<T> = T | null;
export interface Link {
	label: Maybe<string>;
	href: Maybe<string>;
}
export interface Image {
	alt: Maybe<string>;
	crop: Maybe<{ top: number; bottom: number; left: number; right: number }>;
	hotspot: Maybe<{ x: number; y: number; width: number; height: number }>;
	asset: Maybe<{
		_id: string;
		url: string;
		metadata: Maybe<{
			dimensions: Maybe<{
				width: number;
				height: number;
				aspectRatio: number;
			}>;
			lqip: Maybe<string>;
		}>;
	}>;
}
export interface Seo {
	title: Maybe<string>;
	description: Maybe<string>;
	image: Maybe<Image>;
}
interface Document {
	_id: string;
	_rev: string;
	seo: Maybe<Seo>;
}
export interface Keyed {
	_key: string;
}
export interface ListEntry extends Keyed {
	title: Maybe<string>;
	detail: Maybe<string>;
	link: Maybe<Link>;
}
export interface RedesignSettings extends Document {
	navigation: Maybe<(Link & Keyed)[]>;
	consultationUrl: Maybe<string>;
	consultationLabel: Maybe<string>;
	footer: Maybe<{
		heading: Maybe<string>;
		tagline: Maybe<string>;
		copyright: Maybe<string>;
		trademark: Maybe<string>;
		privacyLink: Maybe<Link>;
		socials: Maybe<(Link & Keyed)[]>;
	}>;
}
export interface ProjectCard extends Keyed {
	caption: Maybe<string>;
	projectId: Maybe<string>;
	project: Maybe<{
		_id: string;
		title: Maybe<string>;
		slug: Maybe<string>;
		archiveProject: Maybe<boolean>;
	}>;
	image: Maybe<Image>;
}
export interface HomePageV2 extends Document {
	loadingPairs: Maybe<
		(Keyed & { first: Maybe<string>; second: Maybe<string> })[]
	>;
	landing: Maybe<{
		statement: Maybe<string>;
		desktopImage: Maybe<Image>;
		mobileImage: Maybe<Image>;
	}>;
	introduction: Maybe<{
		heading: Maybe<string>;
		statement: Maybe<string>;
		link: Maybe<Link>;
	}>;
	services: Maybe<
		(Keyed & {
			title: Maybe<string>;
			description: Maybe<string>;
			contactLabel: Maybe<string>;
			projects: Maybe<ProjectCard[]>;
		})[]
	>;
	results: Maybe<
		(Keyed & {
			client: Maybe<string>;
			quote: Maybe<string>;
			background: Maybe<Image>;
			mobileBackground: Maybe<Image>;
			logo: Maybe<Image>;
		})[]
	>;
	noticed: Maybe<
		(Keyed & {
			title: Maybe<string>;
			source: Maybe<string>;
			year: Maybe<string>;
			link: Maybe<Link>;
			image: Maybe<Image>;
		})[]
	>;
}
export interface OurWayPage extends Document {
	hero: Maybe<{
		statement: Maybe<string>;
		scrollLabel: Maybe<string>;
		image: Maybe<Image>;
		mobileImage: Maybe<Image>;
	}>;
	introduction: Maybe<{ text: Maybe<string> }>;
	partnership: Maybe<{
		heading: Maybe<string>;
		founderNote: Maybe<string>;
		principles: Maybe<
			(Keyed & { title: Maybe<string>; description: Maybe<string> })[]
		>;
	}>;
	process: Maybe<{
		heading: Maybe<string>;
		description: Maybe<string>;
		stages: Maybe<
			(Keyed & {
				title: Maybe<string>;
				description: Maybe<string>;
				services: Maybe<ListEntry[]>;
			})[]
		>;
	}>;
	consultation: Maybe<{
		heading: Maybe<string>;
		text: Maybe<string>;
		buttonLabel: Maybe<string>;
		artwork: Maybe<Image>;
	}>;
	credentials: Maybe<{
		founderHeading: Maybe<string>;
		biography: Maybe<string>;
		services: Maybe<ListEntry[]>;
		clients: Maybe<ListEntry[]>;
		recognition: Maybe<ListEntry[]>;
		logos: Maybe<
			(Keyed & {
				title: Maybe<string>;
				image: Maybe<Image>;
				link: Maybe<Link>;
			})[]
		>;
	}>;
}
// Legacy Noticed entries sourced from the original `homePage` document. The
// thumbnail is a resolved asset URL and the destination is either an external
// URL or an internal page reference.
export interface LegacyNoticedEntry extends Keyed {
	title: Maybe<string>;
	source: Maybe<string>;
	year: Maybe<string>;
	thumbnailImage: Maybe<string>;
	url: Maybe<string>;
	pageReference: Maybe<{ _type: string; slug: Maybe<string> }>;
}
export interface RedesignData {
	settings: Maybe<RedesignSettings>;
	home: Maybe<HomePageV2>;
	ourWay: Maybe<OurWayPage>;
	legacyNoticed: Maybe<LegacyNoticedEntry[]>;
}
