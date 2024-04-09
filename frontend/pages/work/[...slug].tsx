import styled from 'styled-components';
import client from '../../client';
import {
	ProjectType,
	TransitionsType,
	WorkPageType
} from '../../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import OthernessPageBuilder from '../../components/common/OthernessPageBuilder';
import CtaBanner from '../../components/blocks/CtaBanner';
import WorkIntro from '../../components/blocks/WorkIntro';
import WorkHero from '../../components/blocks/WorkHero';
import WorkDetails from '../../components/blocks/WorkDetails/WorkDetails';
import { workPageQueryString } from '../../lib/sanityQueries';
import { useEffect } from 'react';
import pxToRem from '../../utils/pxToRem';
import RelatedProject from '../../components/blocks/RelatedProject';
import SubProjects from '../../components/blocks/SubProjects';
import SubProjectsNavigation from '../../components/elements/SubProjectsNavigation';
import MobileSubProjectsNavigation from '../../components/blocks/MobileSubProjectsNavigation';

type Props = {
	data: ProjectType;
	workPageData: WorkPageType;
	pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)`
	padding-top: var(--header-h);
	min-height: 150vh;
	background: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: calc(var(--header-h) + 16px);
	}

	.cta-banner {
		padding-top: ${pxToRem(72)};
		padding-bottom: ${pxToRem(72)};
	}
`;

const Page = (props: Props) => {
	const { data, workPageData, pageTransitionVariants } = props;

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
		type
	} = data ?? {};

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
				title={data?.title || 'Otherness'}
				description={data?.excerpt || ''}
			/>
			<WorkIntro excerpt={excerpt} tagline={tagline} types={type} />
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
			<MobileSubProjectsNavigation subProjects={subProjects} />
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
				}
			},
			subProjects[]-> {
				...,
				label,
				description,
				title,
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
					oneVideo {
						...,
						video {
							asset-> {
								playbackId,
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

	let workPageData = await client.fetch(workPageQueryString);
	const data = await client.fetch(projectQuery);
	workPageData = workPageData[0];

	return {
		props: {
			data,
			workPageData
		}
	};
}

export default Page;
