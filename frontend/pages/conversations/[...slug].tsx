import styled from 'styled-components';
import client from '../../client';
import { ArticleType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import ArticleHeader from '../../components/blocks/ArticleHeader';
import OthernessPageBuilder from '../../components/common/OthernessPageBuilder';
import RelatedConversations from '../../components/blocks/RelatedConversations';
import pxToRem from '../../utils/pxToRem';

type Props = {
	data: ArticleType;
	pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)`
	.page-builder {
		margin-bottom: ${pxToRem(40)};
	}
`;

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	const {
		author,
		authorUrl,
		excerpt,
		pageBuilder,
		relatedArticle,
		tag,
		thumbnailMedia,
		title
	} = data ?? {};

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={`Otherness — ${data?.title}` || 'Otherness'}
				description={data?.excerpt || ''}
				openGraph={{
					...(data?.openGraphImage?.image?.asset?.url && {
						images: [
							{
								url: data.openGraphImage.image.asset.url,
								width: 1200,
								height: 630
							}
						]
					})
				}}
			/>
			<ArticleHeader
				media={thumbnailMedia}
				title={title}
				excerpt={excerpt}
				tag={tag}
				author={author}
				authorUrl={authorUrl}
			/>
			<OthernessPageBuilder data={pageBuilder} useType />
			<RelatedConversations data={relatedArticle} />
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
			openGraphImage {
				...,
				asset-> {
					url,
				},
			},
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
			pageBuilder[] {
				...,
				thumbnailMedia {
					mediaType,
					image {
						asset-> {
							...,
							url,
						},
					},
					video {
						asset-> {
							playbackId,
						},
					},
					caption
				},
			}
		}
	`;

	const data = await client.fetch(articleQuery);
	const hasRelatedArticles = data?.relatedArticle;

	if (!hasRelatedArticles) {
		const randomArticlesQuery = `
			*[_type == 'article' && slug.current != "${params.slug[0]}"] | order(_createdAt desc) [0...2] {
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
			}
		`;

		const randomArticles = await client.fetch(randomArticlesQuery);

		data.relatedArticle = randomArticles;
	}

	return {
		props: {
			data
		}
	};
}

export default Page;
