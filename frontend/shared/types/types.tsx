import exp from 'constants';

const homeBlocksComponentList = [
	'homeComponentOneProject',
	'homeComponentTwoHalfProjects',
	'homeComponentOneTestimonialOneStatistic',
	'homeComponentOneStatistic'
];

export type MediaType = {
	mediaType: 'video' | 'image';
	video?: string;
	image?: string;
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
	url?: string;
	pageReference?: string;
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
};

export type HomeComponentOneHalfProjectType = {
	project: {
		selectPosition: 'left' | 'right';
		selectSize: 'small' | 'large';
	};
};

export type HomeComponentOneProjectType = {
	project: {
		selectPosition: 'left' | 'right';
		selectSize: 'small' | 'large';
	};
};

export type HomeComponentHomeStatisticType = {
	project: {
		selectPosition: 'left' | 'right';
		selectSize: 'small' | 'large';
	};
};

export type HomeComponentOneTestimonialOneStatisticType = {
	project: {
		selectPosition: 'left' | 'right';
		selectSize: 'small' | 'large';
	};
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
	homeComponentOneStatistic: HomeComponentHomeStatisticType;
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

export type HomePageType = {
	button: ButtonType;
	featuredConversations: ConversationsType[];
	heroButton: ButtonType;
	heroDescription: string;
	heroMedia: MediaType;
	heroTitle: string;
	homeBlocks: HomeBlocksType[];
	noticedList: NoticedType[];
	seoDescription: string;
	seoTitle: string;
	servicesList: string[];
	whatToExpectButton: ButtonType;
	whatToExpectContent: string;
	whatToExpectTitle: string;
};
