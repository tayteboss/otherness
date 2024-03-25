import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';

type Props = {
	title: string;
	content: [];
};

const ArticleRichTextWrapper = styled.div``;

const ArticleRichText = (props: Props) => {
	const { title, content } = props;

	return (
		<ArticleRichTextWrapper>
			<LayoutWrapper>
				<LayoutGrid>richtext</LayoutGrid>
			</LayoutWrapper>
		</ArticleRichTextWrapper>
	);
};

export default ArticleRichText;
