import styled from 'styled-components';
import { ConversationsType } from '../../../shared/types/types';

type Props = {
	data: ConversationsType[];
};

const RelatedConversationsWrapper = styled.section``;

const RelatedConversations = (props: Props) => {
	const { data } = props;

	return (
		<RelatedConversationsWrapper>
			RelatedConversations
		</RelatedConversationsWrapper>
	);
};

export default RelatedConversations;
