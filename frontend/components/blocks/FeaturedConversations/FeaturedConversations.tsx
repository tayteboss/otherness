import styled from 'styled-components';
import { ConversationsType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import pxToRem from '../../../utils/pxToRem';
import ConversationCard from '../ConversationCard';

type Props = {
	data: ConversationsType[];
};

const FeaturedConversationsWrapper = styled.section`
	background: var(--colour-white);
	padding: ${pxToRem(24)} 0 ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(40)} 0 ${pxToRem(40)};
	}
`;

const Title = styled.h2`
	margin-bottom: ${pxToRem(32)};
`;

const FeaturedConversations = (props: Props) => {
	const { data } = props;

	const hasData = data && data.length > 0;

	return (
		<FeaturedConversationsWrapper>
			<LayoutWrapper>
				<Title>Conversations we need to have</Title>
			</LayoutWrapper>
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
				</LayoutGrid>
			</LayoutWrapper>
		</FeaturedConversationsWrapper>
	);
};

export default FeaturedConversations;
