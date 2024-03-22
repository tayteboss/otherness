import styled from 'styled-components';
import { SubProjectType } from '../../../shared/types/types';
import SubProject from '../SubProject/SubProject';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: SubProjectType[];
};

const SubProjectsWrapper = styled.section`
	margin-bottom: ${pxToRem(80)};
	background: var(--colour-white);
	position: relative;
	z-index: 1;
`;

const SubProjects = (props: Props) => {
	const { data } = props;

	const hasSubProjects = data?.length > 0;

	return (
		<>
			{hasSubProjects && (
				<SubProjectsWrapper>
					{data.map((item, i) => (
						<SubProject
							key={i}
							title={item?.title}
							label={item?.label}
							description={item?.description}
							imageBlocks={item?.imageBlocks}
						/>
					))}
				</SubProjectsWrapper>
			)}
		</>
	);
};

export default SubProjects;
