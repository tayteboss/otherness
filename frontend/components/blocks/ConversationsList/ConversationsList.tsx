import styled from 'styled-components';
import { ConversationsType } from '../../../shared/types/types';
import ConversationCard from '../ConversationCard';
import LayoutGrid from '../../common/LayoutGrid';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import LoadMore from '../../elements/LoadMore';

type Props = {
	data: ConversationsType[];
	isLoading: boolean;
	cantLoadMore: boolean;
	handleNextArticles: () => void;
};

const ConversationsListWrapper = styled.section`
	padding: ${pxToRem(72)} 0 ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(56)} 0 ${pxToRem(80)};
	}

	.load-more {
		grid-column: 13 / 23;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			grid-column: 1 / -1;
		}

		.layout-wrapper {
			padding: 0;
		}
	}
`;

const ConversationsList = (props: Props) => {
	const { data, isLoading, cantLoadMore, handleNextArticles } = props;

	const hasData = data && data?.length > 0;

	return (
		<ConversationsListWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					{hasData &&
						data.map((item, i) => (
							<ConversationCard
								key={i}
								title={item?.title}
								excerpt={item?.excerpt}
								tag={item?.tag}
								theme={item?.theme}
								thumbnailMedia={item?.thumbnailMedia}
								slug={item?.slug}
								author={item?.author}
								index={i}
							/>
						))}
					<LoadMore
						title={isLoading ? 'Loading' : 'Load more articles'}
						handleLoadMore={handleNextArticles}
						isActive={!cantLoadMore}
					/>
				</LayoutGrid>
			</LayoutWrapper>
		</ConversationsListWrapper>
	);
};

export default ConversationsList;
