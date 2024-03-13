import styled from 'styled-components';
import client from '../../client';
import { ArticleType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

type Props = {
	data: ArticleType;
	pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	console.log('data', data);

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.title || 'Ultra'}
				description={data?.excerpt || ''}
			/>
		</PageWrapper>
	);
};

export async function getStaticPaths() {
	const articlesQuery = `
		*[_type == 'article'] [0...100] {
			slug
		}
	`;

	const allArticles = await client.fetch(articlesQuery);

	return {
		paths: allArticles.map((item: any) => {
			return `/conversations/${item?.slug?.current}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }: any) {
	const articleQuery = `
		*[_type == 'article' && slug.current == "${params.slug[0]}"][0] {
			...,
			thumbnailMedia {
				mediaType,
				image {
					asset-> {
						url,
					},
				},
				video {
					asset-> {
						playbackId,
					},
				},
			},
			relatedArticle[]-> {
				author,
				excerpt,
				slug,
				tag,
				theme,
				thumbnailMedia {
					mediaType,
					image {
						asset-> {
							url,
						},
					},
					video {
						asset-> {
							playbackId,
						},
					},
				},
				title
			},
		}
	`;

	const data = await client.fetch(articleQuery);

	return {
		props: {
			data
		}
	};
}

export default Page;
