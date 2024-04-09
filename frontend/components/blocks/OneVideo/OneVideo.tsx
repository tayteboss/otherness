import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import useViewportWidth from '../../../hooks/useViewportWidth';
import { useInView } from 'react-intersection-observer';
import MuxPlayer from '@mux/mux-player-react/lazy';
import { useRef, useState } from 'react';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	oneVideo: any;
};

const OneVideoWrapper = styled.section``;

const InnerVideoWrapper = styled.div`
	position: relative;
	overflow: hidden;
	padding-top: 56.25%;

	mux-player {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	mux-player,
	img {
		transform: scale(1.01);

		transition: all var(--transition-speed-extra-slow)
			var(--transition-ease);
	}
`;

const Inner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

const ControlsWrapper = styled.div`
	position: absolute;
	bottom: ${pxToRem(32)};
	left: ${pxToRem(32)};
	display: flex;
	align-items: center;
	gap: ${pxToRem(16)};
	z-index: 5;
`;

const PlayTrigger = styled.button`
	color: white;
	cursor: pointer;
`;

const MuteTrigger = styled.button`
	color: white;
	cursor: pointer;
`;

const OneVideo = (props: Props) => {
	const { oneVideo } = props;

	const [isMuted, setIsMuted] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile';

	const playbackId = oneVideo?.video?.asset?.playbackId;
	const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.png?width=214&height=121&time=1`;

	const muxRef = useRef(null);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	console.log('playbackId', playbackId);

	return (
		<OneVideoWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper useGalleryLayout>
				<InnerVideoWrapper>
					{playbackId && (
						<Inner>
							<MuxPlayer
								streamType="on-demand"
								playbackId={playbackId}
								loop={true}
								thumbnailTime={1}
								loading="page"
								preload="auto"
								playsInline={true}
								poster={`${posterUrl}`}
								ref={muxRef}
								paused={!isPlaying}
								muted={isMuted}
							/>
							<ControlsWrapper>
								<PlayTrigger
									onClick={() => setIsPlaying(!isPlaying)}
								>
									{isPlaying ? 'Pause' : 'Play'}
								</PlayTrigger>
								<MuteTrigger
									onClick={() => setIsMuted(!isMuted)}
								>
									{isMuted ? 'Unmute' : 'Mute'}
								</MuteTrigger>
							</ControlsWrapper>
						</Inner>
					)}
				</InnerVideoWrapper>
			</LayoutWrapper>
		</OneVideoWrapper>
	);
};

export default OneVideo;
