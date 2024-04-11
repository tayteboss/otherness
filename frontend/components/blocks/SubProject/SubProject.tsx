import styled from 'styled-components';
import { SubProjectType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { useInView } from 'react-intersection-observer';
import pxToRem from '../../../utils/pxToRem';
import OthernessPageBuilder from '../../common/OthernessPageBuilder';
import { useEffect } from 'react';
import { PortableText } from '@portabletext/react';

const SubProjectWrapper = styled.div`
	margin-bottom: ${pxToRem(48)};
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
		margin-bottom: ${pxToRem(20)};
		font-size: ${pxToRem(30)};
		line-height: ${pxToRem(38)};
		letter-spacing: -0.3px;
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

const DescriptionWrapper = styled.div`
	grid-column: 11 / span 10;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / -7;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const SubProjectImages = styled.div``;

const SubProject = (props: SubProjectType) => {
	const { title, label, description, imageBlocks } = props;

	const hasImages = imageBlocks?.length > 0;

	const formatId = (label: string) => {
		if (!label) return;
		return label.replace(/\s+/g, '-').toLowerCase();
	};

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	const { ref: ref2, inView: inView2 } = useInView({
		triggerOnce: false,
		rootMargin: '-50px'
	});

	useEffect(() => {
		const formattedId = formatId(label);

		if (formattedId) {
			const headerLinks = document.querySelectorAll(
				`.sub-project-link[data-id="${formattedId}"]`
			);
			headerLinks.forEach((headerLink) => {
				headerLink.classList.toggle('active', inView2);
			});
		}
	}, [inView2, label]);

	return (
		<SubProjectWrapper
			id={formatId(label)}
			ref={ref2}
			key={formatId(label)}
		>
			<HeaderWrapper>
				<LayoutWrapper>
					{title && (
						<Title ref={ref} $inView={inView}>
							{title}
						</Title>
					)}
					<LayoutGrid>
						{description && (
							<DescriptionWrapper className="rich-text">
								<PortableText value={description} />
							</DescriptionWrapper>
						)}
					</LayoutGrid>
				</LayoutWrapper>
			</HeaderWrapper>
			{hasImages && (
				<SubProjectImages>
					<OthernessPageBuilder
						data={imageBlocks}
						useImageComponent
					/>
				</SubProjectImages>
			)}
		</SubProjectWrapper>
	);
};

export default SubProject;
