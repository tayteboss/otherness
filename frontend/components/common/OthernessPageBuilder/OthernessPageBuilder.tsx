import styled from 'styled-components';
import HomeComponentOneProject from '../../blocks/HomeComponentOneProject';
import HomeComponentOneStatistic from '../../blocks/HomeComponentOneStatistic';
import HomeComponentOneTestimonialOneStatistic from '../../blocks/HomeComponentOneTestimonialOneStatistic';
import HomeComponentTwoHalfProjects from '../../blocks/HomeComponentTwoHalfProjects';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: any;
};

const PageBuilderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(8)};
`;

const OthernessPageBuilder = (props: Props) => {
	const { data } = props;

	const sections: any = {
		homeComponentOneTestimonialOneStatistic:
			HomeComponentOneTestimonialOneStatistic,
		homeComponentTwoHalfProjects: HomeComponentTwoHalfProjects,
		homeComponentOneProject: HomeComponentOneProject,
		homeComponentOneStatistic: HomeComponentOneStatistic
	};

	return (
		<PageBuilderWrapper className="page-builder">
			{data &&
				data.map((section: any, i: number) => {
					{
						const Component = sections[section.component];
						return (
							<Component
								key={`${section.component}-${i}`}
								{...section}
							/>
						);
					}
				})}
		</PageBuilderWrapper>
	);
};

export default OthernessPageBuilder;
