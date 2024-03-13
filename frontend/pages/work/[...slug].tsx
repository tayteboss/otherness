import styled from 'styled-components';
import client from '../../client';
import { ProjectType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

type Props = {
	data: ProjectType;
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
	const projectsQuery = `
		*[_type == 'project'] [0...100] {
			slug
		}
	`;

	const allProjects = await client.fetch(projectsQuery);

	return {
		paths: allProjects.map((item: any) => {
			return `/work/${item?.slug?.current}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }: any) {
	const mediaTypeString = `
		mediaType,
		image {
			alt,
			asset-> {
				url,
			},
		},
		video {
			asset-> {
				playbackId,
			},
		}
	`;

	const projectQuery = `
		*[_type == 'project' && slug.current == "${params.slug[0]}"][0] {
			...,
			imageBlocks[] {
				...,
				imageComponentOneHalfOneXSmall {
					half {
						${mediaTypeString}
					},
					xSmall {
						${mediaTypeString}
					}
				},
				imageComponentTwoXSmall {
					lhs {
						${mediaTypeString}
					},
					rhs {
						${mediaTypeString}
					}
				},
				imageComponentOneHalf {
					${mediaTypeString},
					selectPosition
				},
				imageComponentEditorialBig {
					editorialBlock {
						description,
						title,
						theme
					},
					selectPosition,
					media {
						${mediaTypeString}
					}
				},
				imageComponentLandscape {
					${mediaTypeString},
					selectPosition
				},
				imageComponentOneBigTwoSmall {
					big {
						${mediaTypeString}
					},
					small1 {
						${mediaTypeString}
					},
					small2 {
						${mediaTypeString}
					}
				},
				imageComponentOneEditorial {
					selectPosition,
					editorialBlock {
						description,
						title,
						theme
					}
				},
				imageComponentOnePortrait {
					selectPosition,
					selectSize,
					${mediaTypeString}
				},
				imageComponentTwoSmall {
					selectPosition,
					small1 {
						${mediaTypeString}
					},
					small2 {
						${mediaTypeString}
					}
				},
				imageComponentFull {
					${mediaTypeString}
				},
				imageComponentOnePortraitOneMedium {
					selectPosition,
					portrait {
						${mediaTypeString}
					},
					medium {
						${mediaTypeString}
					}
				},
				imageComponentOneBig {
					selectPosition,
					${mediaTypeString}
				},
				imageComponentOneSmallOneBigLandscape {
					selectPosition,
					landscape {
						${mediaTypeString}
					},
					small {
						${mediaTypeString}
					}
				},
				imageComponentOneBigOneXSmall {
					selectPosition,
					big {
						${mediaTypeString}
					},
					small {
						${mediaTypeString}
					}
				}
			},
			fullWidthHero {
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
			twoColumnHero {
				leftBlock {
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
				rightBlock {
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
			},
			relatedProject-> {
				slug,
				title,
				heroLayoutType,
				fullWidthHero {
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
				twoColumnHero {
					leftBlock {
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
					rightBlock {
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
				},
			},
		}
	`;

	const data = await client.fetch(projectQuery);

	return {
		props: {
			data
		}
	};
}

export default Page;
