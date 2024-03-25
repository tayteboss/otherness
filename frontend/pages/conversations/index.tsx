import styled from 'styled-components';
import client from '../../client';
import { motion } from 'framer-motion';
import {
	ArticleType,
	ConversationsPageType,
	ConversationsType,
	ProjectType,
	TransitionsType
} from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import {
	basicArticlesQueryDefault,
	basicArticlesQueryString,
	conversationsPageQueryString,
	overflowArticlesQueryString
} from '../../lib/sanityQueries';
import PageHeader from '../../components/blocks/PageHeader';
import ExploreFurther from '../../components/blocks/ExploreFurther';
import ConversationsList from '../../components/blocks/ConversationsList';
import { useState, useEffect } from 'react';

const PageWrapper = styled(motion.div)`
	padding-top: var(--header-h);
	min-height: 100vh;
`;

type Props = {
	data: ConversationsPageType;
	conversations: ArticleType[];
	pageTransitionVariants: TransitionsType;
	hasMoreArticles: boolean;
};

const Page = (props: Props) => {
	const { data, conversations, pageTransitionVariants, hasMoreArticles } =
		props;

	const articleSkip = 10;

	const [isLoading, setIsLoading] = useState(false);
	const [fetchedArticles, setFetchedArticles] =
		useState<ConversationsType[]>(conversations);
	const [articleCount, setArticleCount] = useState(articleSkip);
	const [cantLoadMore, setCantLoadMore] = useState(!hasMoreArticles);

	const handleNextArticles = async () => {
		setIsLoading(true);

		const query = `
			*[_type == 'article'] | order(orderRank) [${articleCount}...${
			articleCount + articleSkip
		}] ${basicArticlesQueryDefault}
		`;
		const moreArticlesQuery = `
			*[_type == 'article'] | order(orderRank) [${articleCount + articleSkip}...${
			articleCount + articleSkip + 1
		}] ${basicArticlesQueryDefault}
		`;

		try {
			const data = await client.fetch(query);
			const moreData = await client.fetch(moreArticlesQuery);

			setFetchedArticles([...fetchedArticles, ...data]);
			setArticleCount(articleCount + articleSkip);

			if (moreData.length === 0) {
				setCantLoadMore(true);
			} else {
				setCantLoadMore(false);
			}

			const timer = setTimeout(() => {
				setIsLoading(false);
			}, 1000);

			return () => clearTimeout(timer);
		} catch (error) {
			console.error('Error fetching site data:', error);
			setIsLoading(false);
			return [];
		}
	};

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
			<PageHeader data={data?.heroTitle} isLoading={isLoading} />
			<ConversationsList
				data={fetchedArticles}
				isLoading={isLoading}
				cantLoadMore={cantLoadMore}
				handleNextArticles={handleNextArticles}
			/>
			<ExploreFurther
				title={data?.furtherReading?.title}
				pageReference={data?.furtherReading.pageReference}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	let data = await client.fetch(conversationsPageQueryString);
	const conversations = await client.fetch(basicArticlesQueryString);
	const overflowArticles = await client.fetch(overflowArticlesQueryString);
	const hasMoreArticles = overflowArticles.length > 0;

	data = data[0];

	return {
		props: {
			data,
			conversations,
			hasMoreArticles
		}
	};
}

export default Page;
