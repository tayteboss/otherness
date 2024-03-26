export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const whatToExpectQueryString = `
	*[_type == "whatToExpectPage"] {
		...,
		furtherReading {
			...,
		},
		seoTitle,
		seoDescription,
		heroTitle,
		pageBuilder[] {
			...,
			media {
				mediaType,
				image {
					asset-> {
						url,
						metadata {
							lqip
						}
					},
					alt
				},
				video {
					asset-> {
						playbackId,
					},
				},
			},
		}
	}
`;

export const privacyQueryString = `
	*[_type == "privacyPage"] {
		...,
	}
`;

export const conversationsPageQueryString = `
	*[_type == "conversationsPage"] {
		...,
		furtherReading {
			...,
		},
		seoTitle,
		seoDescription,
		heroTitle,
	}
`;

export const workPageQueryString = `
	*[_type == "workPage"] {
		seoTitle,
		seoDescription,
		heroTitle,
		ctaBannerTitle,
		ctaBannerLink,
		ctaBannerMedia {
			mediaType,
			image {
				asset-> {
					url,
					metadata {
						lqip
					}
				},
				alt
			},
			video {
				asset-> {
					playbackId,
				},
			},
		},
	}
`;

export const basicProjectsQueryDefault = `
	{
		mood,
		type,
		title,
		tagline,
		slug,
		thumbnailMedia {
			mediaType,
			image {
				asset-> {
					url,
					metadata {
						lqip
					}
				},
				alt
			},
			video {
				asset-> {
					playbackId,
				},
			}
		}
	}
`;

export const projectsQueryDefault = `
{
	...,
	mood,
	type,
	fullWidthHero {
		mediaType,
		image {
			asset-> {
				url,
				metadata {
					lqip
				}
			},
			alt
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
					metadata {
						lqip
					}
				},
				alt
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
					metadata {
						lqip
					}
				},
				alt
			},
			video {
				asset-> {
					playbackId,
				},
			},
		},
	},
}
`;

export const basicProjectsQueryString = `
	*[_type == 'project'] | order(orderRank) [0...10] ${basicProjectsQueryDefault}
`;

export const overflowProjectsQueryString = `
	*[_type == 'project'] | order(orderRank) [10...100] ${basicProjectsQueryDefault}
`;

export const projectsQueryString = `
	*[_type == 'project'] | order(orderRank) [0...100] ${projectsQueryDefault}
`;

export const conversationsQueryDefault = `
	{
		...,
		thumbnailMedia {
			mediaType,
			image {
				asset-> {
					url,
					metadata {
						lqip
					}
				},
				alt
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
						metadata {
							lqip
						}
					},
					alt
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

export const basicArticlesQueryDefault = `
	{
		...,
		thumbnailMedia {
			mediaType,
			image {
				asset-> {
					url,
					metadata {
						lqip
					}
				},
				alt
			},
			video {
				asset-> {
					playbackId,
				},
			},
		},
	}
`;

export const basicArticlesQueryString = `
	*[_type == 'article'] | order(orderRank) [0...10] ${basicArticlesQueryDefault}
`;

export const overflowArticlesQueryString = `
	*[_type == 'article'] | order(orderRank) [10...100] ${basicArticlesQueryDefault}
`;

export const coversationsQueryString = `
	*[_type == 'article'] | order(orderRank) [0...100] ${conversationsQueryDefault}
`;

export const homePageQueryString = `
	*[_type == "homePage"] {
		...,
		seoTitle,
		seoDescription,
		heroTitle,
		heroDescription,
		'heroLink': button,
		heroMedia {
			mediaType,
			image {
				asset-> {
					url,
					metadata {
						lqip
					}
				},
				alt
			},
			video {
				asset-> {
					playbackId,
				},
			},
		},
		whatToExpectTitle,
		whatToExpectContent,
		whatToExpectButton,
		servicesList,
		homeBlocks[] {
			component,
			homeComponentOneProject {
				...,
				project {
					selectPosition,
					selectSize,
					project-> {
						title,
						tagline,
						slug,
						thumbnailMedia {
							mediaType,
							image {
								asset-> {
									url,
									metadata {
										lqip
									}
								},
								alt
							},
							video {
								asset-> {
									playbackId,
								},
							}
						}
					}
				}
			},
			homeComponentTwoHalfProjects {
				projectOne-> {
					title,
					tagline,
					slug,
					thumbnailMedia {
						mediaType,
						image {
							asset-> {
								url,
								metadata {
									lqip
								}
							},
							alt
						},
						video {
							asset-> {
								playbackId,
							},
						}
					}
				},
				projectTwo-> {
					title,
					tagline,
					slug,
					thumbnailMedia {
						mediaType,
						image {
							asset-> {
								url,
								metadata {
									lqip
								}
							},
							alt
						},
						video {
							asset-> {
								playbackId,
							},
						}
					}
				},
			},
			homeComponentOneTestimonialOneStatistic {
				...,
				statistic {
					...,
					mediaType,
					image {
						asset-> {
							url,
							metadata {
								lqip
							}
						},
						alt
					},
					video {
						asset-> {
							playbackId,
						},
					}
				}
			},
			homeComponentOneStatistic {
				...,
				statistic {
					...,
					mediaType,
					image {
						asset-> {
							url,
							metadata {
								lqip
							}
						},
						alt
					},
					video {
						asset-> {
							playbackId,
						},
					}
				}
			},
		},
		"featuredConversations": featuredConversations[]->{
			excerpt,
			slug,
			tag,
			author,
			authorUrl,
			theme,
			title,
			thumbnailMedia {
				mediaType,
				image {
					asset-> {
						url,
						metadata {
							lqip
						}
					},
					alt
				},
				video {
					asset-> {
						playbackId,
					},
				}
			}
		},
		noticedList[]{
			title,
			source,
			year,
			"thumbnailImage": thumbnailImage.asset->url,
			url,
		}
	}
`;
