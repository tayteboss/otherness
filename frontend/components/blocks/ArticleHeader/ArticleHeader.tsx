import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

type Props = {
	media: MediaType;
	title: string;
	excerpt: string;
	tag: string;
	author?: string;
	authorUrl?: string;
};

const ArticleHeaderWrapper = styled.section`
	margin-bottom: ${pxToRem(120)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: var(--header-h);
		margin-bottom: 0;
	}
`;

const MediaWrapper = styled(motion.div)`
	grid-column: 1 / 12;
	width: calc(100% + 24px);
	margin-left: -24px;
	height: 100%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / 13;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-left: -16px;
		width: calc(100% + 32px);
	}

	* {
		height: 100%;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			height: auto;
		}
	}

	.image-component-wrapper,
	.video-component-wrapper {
		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			padding-top: 143.75%;
		}
	}
`;

const ContentWrapper = styled.div`
	grid-column: 14 / -2;
	padding: var(--header-h) 0 ${pxToRem(192)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 13 / -1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		padding: ${pxToRem(32)} 0 ${pxToRem(40)};
	}
`;

const Title = styled.h1`
	margin-bottom: ${pxToRem(24)};
`;

const Excerpt = styled.h3`
	margin-bottom: ${pxToRem(48)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(24)};
	}
`;

const DetailsWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(8)};
	align-items: center;
`;

const Tag = styled.span`
	text-transform: uppercase;
`;

const Divider = styled.div`
	height: 4px;
	width: 4px;
	background: var(--colour-black);
	border-radius: 100px;
`;

const LinkAuthor = styled.a`
	text-transform: uppercase;

	&:hover {
		text-decoration: underline;
	}
`;

const Author = styled.span`
	text-transform: uppercase;
`;

const ArticleHeader = (props: Props) => {
	const { media, title, excerpt, tag, author, authorUrl } = props ?? {};

	return (
		<ArticleHeaderWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<MediaWrapper>
						<MediaStack
							data={media}
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</MediaWrapper>
					<ContentWrapper>
						{title && <Title className="type-h3">{title}</Title>}
						{excerpt && (
							<Excerpt className="type-secondary-heading-medium">
								{excerpt}
							</Excerpt>
						)}
						<DetailsWrapper>
							{tag && <Tag className="type-p">{tag}</Tag>}
							{tag && author && <Divider />}
							{authorUrl
								? author && (
										<LinkAuthor
											href={authorUrl}
											target="_blank"
											className="type-p"
										>
											{author}
										</LinkAuthor>
								  )
								: author && (
										<Author className="type-p">
											{author}
										</Author>
								  )}
						</DetailsWrapper>
					</ContentWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ArticleHeaderWrapper>
	);
};

export default ArticleHeader;
