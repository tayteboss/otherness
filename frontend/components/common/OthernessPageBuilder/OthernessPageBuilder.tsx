import styled from 'styled-components';
import HomeComponentOneProject from '../../blocks/HomeComponentOneProject';
import HomeComponentOneStatistic from '../../blocks/HomeComponentOneStatistic';
import HomeComponentOneTestimonialOneStatistic from '../../blocks/HomeComponentOneTestimonialOneStatistic';
import HomeComponentTwoHalfProjects from '../../blocks/HomeComponentTwoHalfProjects';
import pxToRem from '../../../utils/pxToRem';
import ExpectMultiColumnContent from '../../blocks/ExpectMultiColumnContent';
import ExpectProcessList from '../../blocks/ExpectProcessList';
import CtaBanner from '../../blocks/CtaBanner';
import ExpectImageOneColumnContent from '../../blocks/ExpectImageOneColumnContent';
import ImageComponentEditorialBig from '../../blocks/ImageComponentEditorialBig';
import ImageComponentFull from '../../blocks/ImageComponentFull';
import ImageComponentLandscape from '../../blocks/ImageComponentLandscape';
import ImageComponentOneBig from '../../blocks/ImageComponentOneBig';
import ImageComponentOneBigOneXSmall from '../../blocks/ImageComponentOneBigOneXSmall';
import ImageComponentOneBigTwoSmall from '../../blocks/ImageComponentOneBigTwoSmall';
import ImageComponentOneEditorial from '../../blocks/ImageComponentOneEditorial';
import ImageComponentOneHalf from '../../blocks/ImageComponentOneHalf';
import ImageComponentOneHalfOneXSmall from '../../blocks/ImageComponentOneHalfOneXSmall';
import ImageComponentOnePortrait from '../../blocks/ImageComponentOnePortrait';
import ImageComponentOnePortraitOneMedium from '../../blocks/ImageComponentOnePortraitOneMedium';
import ImageComponentOneSmallOneBigLandscape from '../../blocks/ImageComponentOneSmallOneBigLandscape';
import ImageComponentOneXSmall from '../../blocks/ImageComponentOneXSmall';
import ImageComponentTwoXSmall from '../../blocks/ImageComponentTwoXSmall';
import ImageComponentTwoHalf from '../../blocks/ImageComponentTwoHalf';
import ImageComponentOneTestimonialOneXSmall from '../../blocks/ImageComponentOneTestimonialOneXSmall';
import ArticleTestimonial from '../../blocks/ArticleTestimonial';
import ArticleMedia from '../../blocks/ArticleMedia';
import ArticleRichText from '../../blocks/ArticleRichText';

type Props = {
	data: any;
	useType?: boolean;
	useImageComponent?: boolean;
	useComponent?: boolean;
};

const PageBuilderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(8)};
	background: var(--colour-white);
	position: relative;
	z-index: 1;
`;

const OthernessPageBuilder = (props: Props) => {
	const {
		data,
		useType = false,
		useComponent = false,
		useImageComponent = false
	} = props;

	const sections: any = {
		homeComponentOneTestimonialOneStatistic:
			HomeComponentOneTestimonialOneStatistic,
		homeComponentTwoHalfProjects: HomeComponentTwoHalfProjects,
		homeComponentOneProject: HomeComponentOneProject,
		homeComponentOneStatistic: HomeComponentOneStatistic,
		pbImageMultiColumnContent: ExpectMultiColumnContent,
		pbProcessList: ExpectProcessList,
		pbCtaBanner: CtaBanner,
		pbImageOneColumnContent: ExpectImageOneColumnContent,
		imageComponentEditorialBig: ImageComponentEditorialBig,
		imageComponentFull: ImageComponentFull,
		imageComponentLandscape: ImageComponentLandscape,
		imageComponentOneBig: ImageComponentOneBig,
		imageComponentOneBigOneXSmall: ImageComponentOneBigOneXSmall,
		imageComponentOneBigTwoSmall: ImageComponentOneBigTwoSmall,
		imageComponentOneEditorial: ImageComponentOneEditorial,
		imageComponentOneHalf: ImageComponentOneHalf,
		imageComponentOneHalfOneXSmall: ImageComponentOneHalfOneXSmall,
		imageComponentOnePortrait: ImageComponentOnePortrait,
		imageComponentOnePortraitOneMedium: ImageComponentOnePortraitOneMedium,
		imageComponentOneSmallOneBigLandscape:
			ImageComponentOneSmallOneBigLandscape,
		imageComponentOneXSmall: ImageComponentOneXSmall,
		imageComponentTwoXSmall: ImageComponentTwoXSmall,
		imageComponentTwoHalf: ImageComponentTwoHalf,
		imageComponentOneTestimonialOneXSmall:
			ImageComponentOneTestimonialOneXSmall,
		pbRichText: ArticleRichText,
		pbMedia: ArticleMedia,
		pbTestimonial: ArticleTestimonial
	};

	console.log('data', data);

	return (
		<PageBuilderWrapper className="page-builder">
			{useImageComponent &&
				data &&
				data.map((section: any, i: number) => {
					{
						if (!sections[section.imageComponent]) {
							return (
								<div key={Math.random() * 10000}>
									No section found for{' '}
									{section.imageComponent}
								</div>
							);
						} else {
							const Component = sections[section.imageComponent];
							return (
								<Component
									key={`${section.imageComponent}-${i}`}
									{...section}
								/>
							);
						}
					}
				})}

			{useType &&
				data &&
				data.map((section: any, i: number) => {
					{
						if (!sections[section._type]) {
							return (
								<div key={Math.random() * 10000}>
									No section found for {section._type}
								</div>
							);
						} else {
							const Component = sections[section._type];
							return (
								<Component
									key={`${section._type}-${i}`}
									{...section}
								/>
							);
						}
					}
				})}

			{useComponent &&
				data &&
				data.map((section: any, i: number) => {
					{
						if (!sections[section.component]) {
							return (
								<div key={Math.random() * 10000}>
									No section found for {section.component}
								</div>
							);
						} else {
							const Component = sections[section.component];
							return (
								<Component
									key={`${section.component}-${i}`}
									{...section}
								/>
							);
						}
					}
				})}
		</PageBuilderWrapper>
	);
};

export default OthernessPageBuilder;
