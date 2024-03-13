import styled from 'styled-components';
import client from '../../client';
import { motion } from 'framer-motion';
import {
	ArticleType,
	ConversationsPageType,
	TransitionsType
} from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import {
	conversationsPageQueryString,
	conversationsQueryString
} from '../../lib/sanityQueries';

const PageWrapper = styled(motion.div)``;

type Props = {
	data: ConversationsPageType;
	conversations: ArticleType[];
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, conversations, pageTransitionVariants } = props;

	console.log('conversations', conversations);

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.seoTitle || 'Otherness'}
				description={data?.seoDescription || ''}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(conversationsPageQueryString);
	const conversations = await client.fetch(conversationsQueryString);

	return {
		props: {
			data,
			conversations
		}
	};
}

export default Page;
