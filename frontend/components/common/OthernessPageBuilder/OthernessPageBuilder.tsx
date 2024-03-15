import HomeComponentOneProject from '../../blocks/HomeComponentOneProject';
import HomeComponentOneStatistic from '../../blocks/HomeComponentOneStatistic';
import HomeComponentOneTestimonialOneStatistic from '../../blocks/HomeComponentOneTestimonialOneStatistic';
import HomeComponentTwoHalfProjects from '../../blocks/HomeComponentTwoHalfProjects';

type Props = {
	data: any;
};

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
		<>
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
		</>
	);
};

export default OthernessPageBuilder;
