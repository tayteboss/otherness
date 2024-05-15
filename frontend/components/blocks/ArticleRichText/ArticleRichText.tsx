import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { PortableText } from '@portabletext/react';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	content: [];
};

const ArticleRichTextWrapper = styled.section`
	margin-bottom: ${pxToRem(40)};
`;

const ContentWrapper = styled.div`
	grid-column: 10 / -2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 3 / -3;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}
`;

const ArticleRichText = (props: Props) => {
	const { content } = props;

	return (
		<ArticleRichTextWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<ContentWrapper className="rich-text rich-text--large-p">
						<PortableText value={content} />
					</ContentWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ArticleRichTextWrapper>
	);
};

export default ArticleRichText;
