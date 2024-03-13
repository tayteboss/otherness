export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const homePageQueryString = `
	*[_type == "homePage"] {
		...,
		referenceTitle,
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
				},
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
					project-> {
						title,
						tagline,
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
							}
						}
					}
				}
			},
			homeComponentTwoHalfProjects {
				projectOne-> {
					title,
					tagline,
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
						}
					}
				},
				projectTwo-> {
					title,
					tagline,
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
						},
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
						},
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
			...,
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
