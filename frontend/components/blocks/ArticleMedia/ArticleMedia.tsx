import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	thumbnailMedia: MediaType;
};

const ArticleMediaWrapper = styled.section`
	margin-bottom: ${pxToRem(40)};
`;

const MediaWrapper = styled.div<{ $aspectRatio: string }>`
	grid-column: 10 / -2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 3 / -3;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	.image-component-wrapper,
	.video-component-wrapper {
		aspect-ratio: ${(props) => props.$aspectRatio};
	}
`;

const Caption = styled.p`
	padding-top: ${pxToRem(12)};
	width: 80%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		width: 100%;
	}
`;

const ArticleMedia = (props: Props) => {
	const { thumbnailMedia } = props;

	const imageWidth =
		thumbnailMedia?.image?.asset?.metadata?.dimensions?.width;
	const imageHeight =
		thumbnailMedia?.image?.asset?.metadata?.dimensions?.height;
	const imageAspectRatio = `${imageWidth} / ${imageHeight}`;
	const videoAspectRatio = '16 / 9';
	const isImage = thumbnailMedia?.mediaType === 'image';

	return (
		<ArticleMediaWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					<MediaWrapper
						$aspectRatio={
							isImage ? imageAspectRatio : videoAspectRatio
						}
					>
						<MediaStack
							data={thumbnailMedia}
							noTransition
							sizes="(max-width: 768px) 100vw, (max-width: 1124px) 83vw, 58vw"
						/>
						{thumbnailMedia?.caption && (
							<Caption className="type-p-small">
								{thumbnailMedia.caption}
							</Caption>
						)}
					</MediaWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</ArticleMediaWrapper>
	);
};

export default ArticleMedia;
