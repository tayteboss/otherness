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
	overflow: hidden;
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
		pbImageOneColumnContent: ExpectImageOneColumnContent
	};

	return (
		<PageBuilderWrapper className="page-builder">
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
