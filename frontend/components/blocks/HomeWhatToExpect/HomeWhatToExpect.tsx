import styled from 'styled-components';
import { ButtonType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { PortableText } from '@portabletext/react';
import pxToRem from '../../../utils/pxToRem';
import ArrowButton from '../../elements/ArrowButton';

type Props = {
	title: string;
	content: [];
	button: ButtonType;
};

const HomeWhatToExpectWrapper = styled.section`
	background: var(--colour-beige-light);
	padding: ${pxToRem(136)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(80)} 0;
	}
`;

const TitleWrapper = styled.div`
	grid-column: 3 / 11;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / 12;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(24)};
	}
`;

const Title = styled.h3`
	color: var(--colour-black);
`;

const ContentWrapper = styled.div`
	grid-column: 13 / 23;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${pxToRem(40)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 13 / -1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		gap: ${pxToRem(32)};
	}
`;

const RichTextWrapper = styled.div`
	* {
		color: var(--colour-black);
	}
`;

const HomeWhatToExpect = (props: Props) => {
	const { title, content, button } = props;

	return (
		<HomeWhatToExpectWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<TitleWrapper>
						{title && (
							<Title className="type-secondary-heading-large">
								{title}
							</Title>
						)}
					</TitleWrapper>
					<ContentWrapper>
						{content && (
							<RichTextWrapper className="rich-text">
								<PortableText value={content} />
							</RichTextWrapper>
						)}
						{button && (
							<ArrowButton data={button} isBlack>
								{button.title}
							</ArrowButton>
						)}
					</ContentWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</HomeWhatToExpectWrapper>
	);
};

export default HomeWhatToExpect;
