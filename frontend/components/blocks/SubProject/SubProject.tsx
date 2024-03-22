import styled from 'styled-components';
import { SubProjectType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { useInView } from 'react-intersection-observer';
import pxToRem from '../../../utils/pxToRem';

const SubProjectWrapper = styled.div`
	padding-top: ${pxToRem(48)};
`;

const HeaderWrapper = styled.div`
	margin-bottom: ${pxToRem(48)};
`;

const Title = styled.h2<{ $inView: boolean }>`
	position: relative;
	padding-bottom: ${pxToRem(8)};
	margin-bottom: ${pxToRem(48)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(24)} 0 ${pxToRem(8)};
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: ${(props) => (props.$inView ? '100%' : '0')};
		height: 1px;
		background: var(--colour-beige-light);

		transition: all 2000ms var(--transition-ease);
	}
`;

const Description = styled.div`
	grid-column: 11 / span 11;
	font-family: var(--font-classic-grotesque-regular);
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(21)};
	letter-spacing: 0.14px;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / -1;
	}
`;

const SubProject = (props: SubProjectType) => {
	const { title, label, description, imageBlocks } = props;

	const formatId = (label: string) => {
		if (!label) return;
		return label.replace(/\s+/g, '-').toLowerCase();
	};

	const formattedDescription: string = `<p>${description.replace(
		/\n/g,
		'<br />'
	)}</p>`;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<SubProjectWrapper id={formatId(label)}>
			<HeaderWrapper>
				<LayoutWrapper>
					{title && (
						<Title ref={ref} $inView={inView}>
							{title}
						</Title>
					)}
					<LayoutGrid>
						{description && (
							<Description
								dangerouslySetInnerHTML={{
									__html: formattedDescription
								}}
							/>
						)}
					</LayoutGrid>
				</LayoutWrapper>
			</HeaderWrapper>
		</SubProjectWrapper>
	);
};

export default SubProject;
