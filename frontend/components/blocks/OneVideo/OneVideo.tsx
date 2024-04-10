import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import useViewportWidth from '../../../hooks/useViewportWidth';
import { useInView } from 'react-intersection-observer';
import MuxPlayer from '@mux/mux-player-react/lazy';
import { useRef, useState } from 'react';
import pxToRem from '../../../utils/pxToRem';
import LayoutGrid from '../../common/LayoutGrid';
import PlaySvg from '../../svgs/PlaySvg';
import Image from 'next/image';

type Props = {
	oneVideo: any;
};

const OneVideoWrapper = styled.section`
	background: var(--colour-white);
	padding: ${pxToRem(88)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		padding: ${pxToRem(48)} 0;
	}
`;

const InnerVideoWrapper = styled.div`
	position: relative;
	overflow: hidden;
	padding-top: 56.25%;
	grid-column: 4 / -4;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		height: 100dvh;
		padding-top: 0;
	}

	mux-player {
		--live-button: none;
		--fullscreen-button: none;
		--time-display: none;
		--playback-rate-button: none;
		--seek-backward-button: none;
		--seek-forward-button: none;
		--rendition-selectmenu: none;
	}

	mux-player,
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.01);

		transition: all var(--transition-speed-extra-slow)
			var(--transition-ease);
	}
`;

const PosterImageWrapper = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 2;
`;

const DesktopInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 1;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: none;
	}
`;

const MobileInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: block;
	}
`;

const ControlsWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5;
`;

const PlayTrigger = styled.button`
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(15px);
	height: 100px;
	width: 100px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		background: rgba(255, 255, 255, 0.65);
	}

	svg {
		position: relative;
		left: 4px;
	}
`;

const OneVideo = (props: Props) => {
	const { oneVideo } = props;

	const [isMuted, setIsMuted] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile';

	const playbackId = oneVideo?.video?.asset?.playbackId;
	const mobilePlaybackId = oneVideo?.mobileVideo?.asset?.playbackId;
	const posterImage = oneVideo?.desktopPosterImage?.asset?.url;
	const mobilePosterImage = oneVideo?.mobilePosterImage?.asset?.url;

	const muxRef = useRef(null);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<OneVideoWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>
					<InnerVideoWrapper>
						{playbackId && (
							<DesktopInner>
								{posterImage && !isPlaying && (
									<PosterImageWrapper>
										<Image
											src={posterImage}
											alt="Video poster image"
											fill
										/>
									</PosterImageWrapper>
								)}
								<MuxPlayer
									streamType="on-demand"
									playbackId={playbackId}
									loop={true}
									thumbnailTime={1}
									loading="page"
									preload="auto"
									playsInline={true}
									ref={muxRef}
									paused={!isPlaying}
									muted={false}
									showControls={true} // Add this line to force show controls
									accentColor="#67605A"
								/>
							</DesktopInner>
						)}
						{playbackId && (
							<MobileInner>
								{posterImage && !isPlaying && (
									<PosterImageWrapper>
										<Image
											src={
												mobilePosterImage
													? mobilePosterImage
													: posterImage
											}
											alt="Video poster image"
											fill
										/>
									</PosterImageWrapper>
								)}
								<MuxPlayer
									streamType="on-demand"
									playbackId={
										mobilePlaybackId
											? mobilePlaybackId
											: playbackId
									}
									loop={true}
									thumbnailTime={1}
									loading="page"
									preload="auto"
									playsInline={true}
									ref={muxRef}
									paused={!isPlaying}
									muted={isMuted}
									showControls={true}
									accentColor="#67605A"
								/>
							</MobileInner>
						)}
						<ControlsWrapper>
							{!isPlaying && (
								<PlayTrigger
									onClick={() => {
										setIsPlaying(!isPlaying);
										setIsMuted(false);
									}}
								>
									<PlaySvg />
								</PlayTrigger>
							)}
						</ControlsWrapper>
					</InnerVideoWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</OneVideoWrapper>
	);
};

export default OneVideo;
