import exp from 'constants';

const homeBlocksComponentList = [
	'homeComponentOneProject',
	'homeComponentTwoHalfProjects',
	'homeComponentOneTestimonialOneStatistic',
	'homeComponentOneStatistic'
];

export type MediaType = {
	mediaType: 'video' | 'image';
	video: { asset: { playbackId: string } };
	image: { asset: { url: string; metadata: { lqip: string } }; alt: string };
	caption?: string;
};

export type TransitionsType = {
	hidden: {
		opacity: number;
		transition: {
			duration: number;
		};
	};
	visible: {
		opacity: number;
		transition: {
			duration: number;
			delay?: number;
		};
	};
};

export type ButtonType = {
	url: string;
	pageReference: {
		_ref: string;
	};
	title: string;
};

export type SlugType = {
	current: string;
};

export type ConversationsType = {
	title: string;
	excerpt: string;
	slug: SlugType;
	tag: string;
	theme: 'dark' | 'light';
	thumbnailMedia: MediaType;
	author?: string;
	authorUrl?: string;
};

export type StatisticType = {
	statisticTitle: string;
	description: string;
	size: 'small' | 'medium';
	image: {
		asset: {
			url: string;
		};
	};
	video: {
		asset: {
			playbackId: string;
		};
	};
	mediaType: 'video' | 'image';
};

export type TestimonialType = {
	credit: string;
	testimonial: string;
	theme: 'dark' | 'light';
};

export type HomeComponentOneHalfProjectType = {
	projectOne: {
		tagline: string;
		thumbnailMedia: MediaType;
		title: string;
	};
	projectTwo: {
		tagline: string;
		thumbnailMedia: MediaType;
		title: string;
	};
};

export type HomeComponentOneProjectType = {
	project: {
		project: {
			tagline: string;
			thumbnailMedia: MediaType;
			title: string;
		};
	};
};

export type HomeComponentHomeOneStatisticType = {
	selectPosition: 'left' | 'middle' | 'right';
	statistic: StatisticType;
};

export type HomeComponentOneTestimonialOneStatisticType = {
	statistic: StatisticType;
	testimonialBlock: TestimonialType;
};

export type HomeComponentTwoHalfProjectsType = {
	project: {
		selectPosition: 'left' | 'right';
		selectSize: 'small' | 'large';
	};
};

export type HomeBlocksType = {
	component: (typeof homeBlocksComponentList)[number];
	homeComponentOneHalfProjects: HomeComponentOneHalfProjectType;
	homeComponentOneProject: HomeComponentOneProjectType;
	homeComponentOneStatistic: HomeComponentHomeOneStatisticType;
	homeComponentOneTestimonialOneStatistic: HomeComponentOneTestimonialOneStatisticType;
	homeComponentTwoHalfProjects: HomeComponentTwoHalfProjectsType;
};

export type NoticedType = {
	title: string;
	source: string;
	thumbnailImage: string;
	url?: string;
	year: string;
};

export type FurtherReadingType = {
	pageReference: {
		_ref: string;
	};
	title: string;
};

export type HomePageType = {
	button: ButtonType;
	featuredConversations: ConversationsType[];
	heroButton: ButtonType;
	heroDescription: string;
	heroMedia: MediaType;
	heroTitle: string;
	homeBlocks: PageBuilderType[];
	noticedList: NoticedType[];
	seoDescription: string;
	seoTitle: string;
	servicesList: string[];
	whatToExpectButton: ButtonType;
	whatToExpectContent: [];
	whatToExpectTitle: string;
	heroLink: ButtonType;
};

export type SiteSettingsType = {
	footerConsultationCta: string;
	instagramUrl: string;
	linkedInUrl: string;
	tagline: string;
	twitterUrl: string;
	footerConsultationButtonTitle: string;
	footerConsultationButtonUrl: string;
	mobileMenuConsultationCta: string;
	mobileMenuConsultationButtonTitle: string;
};

export type ImageMultiColumnContentType = {
	columns: { description: string; title: string }[];
	media: MediaType;
	title: string;
	_type: string;
};

export type ProcessListType = {
	title: string;
	description: string;
	columns: { listContent: any[]; title: string }[];
};

export type CtaBannerType = {
	title: string;
	link: ButtonType;
	media: MediaType;
};

export type ImageOneColumnContentType = {
	media: MediaType;
	title: string;
	content: [];
};

export type WhatToExpectType = {
	heroTitle: string;
	pageBuilder: (
		| ImageMultiColumnContentType
		| ProcessListType
		| CtaBannerType
		| ImageOneColumnContentType
	)[];
	seoDescription: string;
	seoTitle: string;
	furtherReading: FurtherReadingType;
};

export type ConversationsPageType = {
	heroTitle: string;
	seoDescription: string;
	seoTitle: string;
	furtherReading: FurtherReadingType;
};

export type WorkPageType = {
	heroTitle: string;
	seoDescription: string;
	seoTitle: string;
	ctaBannerLink: ButtonType;
	ctaBannerMedia: MediaType;
	ctaBannerTitle: string;
};

export type TwoColumnHeroType = {
	leftBlock: MediaType;
	rightBlock: MediaType;
};

export type ProjectType = {
	title: string;
	tagline: string;
	slug: SlugType;
	thumbnailMedia: MediaType;
	collaborators: {
		title: string;
		url?: string;
	}[];
	description: string;
	excerpt: string;
	fullWidthHero?: MediaType;
	heroLayoutType: 'fullWidth' | 'twoColumn';
	imageBlocks: any;
	mood: (
		| 'all'
		| 'artsy'
		| 'bombastic'
		| 'bookish'
		| 'luxxy'
		| 'technical'
		| 'profesh'
		| 'vivacious'
	)[];
	relatedProject: ProjectType;
	twoColumnHero: TwoColumnHeroType;
	type: (
		| 'all'
		| 'strategy'
		| 'branding'
		| 'packaging'
		| 'art-direction'
		| 'digital'
	)[];
};

export type ArticleRichTextType = {
	content: [];
	title: string;
};

export type ArticleMediaType = {
	thumbnailMedia: MediaType;
	title: string;
};

export type ArticleTestimonialType = {
	testimonial: string;
};

export type ArticleType = {
	title: string;
	author: string;
	excerpt: string;
	pageBuilder:
		| ArticleRichTextType
		| ArticleMediaType
		| ArticleTestimonialType;
	relatedArticle: ArticleType[];
	slug: SlugType;
	tag: string;
	theme: 'dark' | 'light';
	thumbnailMedia: MediaType;
};

export type HomeComponentTwoHalfProjects = {
	component: string;
	title: string;
};

export type ProjectCardType = {
	title: string;
	tagline: string;
	thumbnailMedia: MediaType;
	slug: SlugType;
	isLarge?: boolean;
};
