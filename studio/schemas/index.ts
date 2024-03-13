import article from './article';
import conversationsPage from './conversationsPage';
import homePage from './homePage';
import mediaSelect from './mediaSelect';
import pbCtaBanner from './pbCtaBanner';
import pbImageMultiColumnContent from './pbImageMultiColumnContent';
import pbImageOneColumnContent from './pbImageOneColumnContent';
import pbMedia from './pbMedia';
import pbProcessList from './pbProcessList';
import pbRichText from './pbRichText';
import pbTestimonial from './pbTestimonial';
import project from './project';
import projectSingleHero from './projectSingleHero';
import projectTwoColumnHero from './projectTwoColumnHero';
import siteSettings from './siteSettings';
import statisticBlock from './statisticBlock';
import subProject from './subProject';
import testimonialBlock from './testimonialBlock';
import thumbnailMedia from './thumbnailMedia';
import whatToExpectPage from './whatToExpectPage';
import workPage from './workPage';


export const schemaTypes = [
	// Site Settings
	siteSettings,

	// Pages
	homePage,
	workPage,
	whatToExpectPage,
	conversationsPage,

	// Documents
	project,
	article,

	// Other
	projectSingleHero,
	projectTwoColumnHero,
	mediaSelect,
	subProject,
	statisticBlock,
	testimonialBlock,
	thumbnailMedia,

	// Page Builder
	pbMedia,
	pbRichText,
	pbTestimonial,
	pbImageMultiColumnContent,
	pbImageOneColumnContent,
	pbCtaBanner,
	pbProcessList
];
