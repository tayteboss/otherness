import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';

type Props = {
	thumbnailMedia: MediaType;
};

const ArticleMediaWrapper = styled.div``;

const ArticleMedia = (props: Props) => {
	const { thumbnailMedia } = props;

	return (
		<ArticleMediaWrapper>
			<LayoutWrapper>
				<LayoutGrid>articlemedia</LayoutGrid>
			</LayoutWrapper>
		</ArticleMediaWrapper>
	);
};

export default ArticleMedia;
