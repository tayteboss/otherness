import styled from 'styled-components';
import client from '../../client';
import { ProjectType, TransitionsType } from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import OthernessPageBuilder from '../../components/common/OthernessPageBuilder';
import WorkIntro from '../../components/blocks/WorkIntro';
import WorkHero from '../../components/blocks/WorkHero';
import WorkDetails from '../../components/blocks/WorkDetails/WorkDetails';
import { useEffect } from 'react';
import pxToRem from '../../utils/pxToRem';
import RelatedProject from '../../components/blocks/RelatedProject';
import SubProjects from '../../components/blocks/SubProjects';
import SubProjectsNavigation from '../../components/elements/SubProjectsNavigation';
import MobileSubProjectsNavigation from '../../components/blocks/MobileSubProjectsNavigation';

type Props = {
	data: ProjectType;
	pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)`
	min-height: 150vh;
	background: var(--colour-white);

	.cta-banner {
		padding-top: ${pxToRem(72)};
		padding-bottom: ${pxToRem(72)};
	}

	.page-builder {
		section {
			&:last-child {
				padding-bottom: ${pxToRem(80)};
			}
		}
	}
`;

const ArchiveBlank = styled.div`
	height: 100vh;
	width: 100%;
	background: var(--colour-white);
`;

const Page = (props: Props) => {
	const { data, pageTransitionVariants } = props;

	const {
		collaborators,
		description,
		excerpt,
		fullWidthHero,
		heroLayoutType,
		imageBlocks,
		relatedProject,
		subProjects,
		tagline,
		title,
		twoColumnHero,
		type,
		archiveProject = false
	} = data ?? {};

	useEffect(() => {
		if (archiveProject) {
			// Redirect client-side (users)
			window.location.href = '/work';
		}
	}, [archiveProject]);

	if (archiveProject) {
		// Still render SEO + fallback content for crawlers
		return (
			<>
				<NextSeo
					title={`Otherness — ${data?.title ?? 'Archived Project'}`}
					description={data?.excerpt ?? ''}
					noindex={false} // <-- still indexable if you want
				/>
				<ArchiveBlank />
			</>
		);
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={`Otherness — ${data?.title ?? 'Otherness'}`}
				description={data?.excerpt ?? ''}
				openGraph={{
					...(data?.openGraphImage?.asset?.url && {
						images: [
							{
								url: data.openGraphImage.asset.url,
								width: 1200,
								height: 630
							}
						]
					})
				}}
			/>
			<WorkIntro excerpt={excerpt} tagline={tagline} types={type} />
			<MobileSubProjectsNavigation subProjects={subProjects} />
			<WorkHero
				heroLayoutType={heroLayoutType}
				twoColumnHero={twoColumnHero}
				fullWidthHero={fullWidthHero}
			/>
			<WorkDetails
				client={title}
				collaborators={collaborators}
				description={description}
			/>
			<OthernessPageBuilder data={imageBlocks} useImageComponent />
			<SubProjects data={subProjects} />
			<RelatedProject
				data={relatedProject}
				desktopMedia={relatedProject?.relatedDesktopMedia}
			/>
			<SubProjectsNavigation subProjects={subProjects} />
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
				metadata {
					lqip
				}
			},
		},
		video {
			asset-> {
				playbackId,
			},
		},
		mobileImage {
			alt,
			asset-> {
				url,
				metadata {
					lqip
				}
			},
		},
		mobileVideo {
			asset-> {
				playbackId,
			},
		}
	`;

	const projectQuery = `
		*[_type == 'project' && slug.current == "${params.slug[0]}"][0] {
			...,
			archiveProject,
			openGraphImage {
				...,
				asset-> {
					url,
				},
			},
			fullWidthHero {
				${mediaTypeString}
			},
			twoColumnHero {
				leftBlock {
					${mediaTypeString}
				},
				rightBlock {
					${mediaTypeString}
				},
			},
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
				imageComponentTwoXSmall {
					selectPosition,
					lhs {
						${mediaTypeString}
					},
					rhs {
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
				},
				imageComponentOneXSmall {
					selectPosition,
					${mediaTypeString}
				},
				imageComponentTwoHalf {
					rhs {
						${mediaTypeString}
					},
					lhs {
						${mediaTypeString}
					}
				},
				imageComponentOneTestimonialOneXSmall {
					...,
					xSmall {
						${mediaTypeString}
					}
				},
				pbCtaBanner {
					...,
					media {
						${mediaTypeString}
					}
				},
				oneVideo {
					...,
					video {
						asset-> {
							playbackId,
						},
					},
					desktopPosterImage {
						asset-> {
							url,
							metadata {
								lqip
							}
						},
					},
					mobilePosterImage {
						asset-> {
							url,
							metadata {
								lqip
							}
						},
					},
				}
			},
			subProjects[]-> {
				...,
				label,
				description,
				title,
				imageBlocks[] {
					...,
					pbCtaBanner {
						...,
						media {
							${mediaTypeString}
						}
					},
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
					imageComponentTwoXSmall {
						selectPosition,
						lhs {
							${mediaTypeString}
						},
						rhs {
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
					},
					imageComponentOneXSmall {
						selectPosition,
						${mediaTypeString}
					},
					imageComponentTwoHalf {
						rhs {
							${mediaTypeString}
						},
						lhs {
							${mediaTypeString}
						}
					},
					imageComponentOneTestimonialOneXSmall {
						...,
						xSmall {
							${mediaTypeString}
						}
					},
					oneVideo {
						...,
						video {
							asset-> {
								playbackId,
							},
						},
						desktopPosterImage {
							asset-> {
								url,
								metadata {
									lqip
								}
							},
						},
						mobilePosterImage {
							asset-> {
								url,
								metadata {
									lqip
								}
							},
						},
					}
				}
			},
			relatedProject-> {
				slug,
				title,
				tagline,
				thumbnailMedia {
					${mediaTypeString}
				},
				relatedDesktopMedia {
					${mediaTypeString}
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
