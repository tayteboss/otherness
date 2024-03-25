import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';

type Props = {
	media: MediaType;
	title: string;
	excerpt: string;
	tag: string;
	author?: string;
	authorUrl?: string;
};

const ArticleHeaderWrapper = styled.section``;

const ArticleHeader = (props: Props) => {
	const { media, title, excerpt, tag, author, authorUrl } = props;

	return <ArticleHeaderWrapper>ArticleHeader</ArticleHeaderWrapper>;
};

export default ArticleHeader;
