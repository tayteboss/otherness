import MuxPlayer from '@mux/mux-player-react/lazy';
import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import useViewportWidth from '../../../hooks/useViewportWidth';

const VideoComponentWrapper = styled.div`
	position: relative;
	overflow: hidden;

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

	mux-player {
		--media-object-fit: contain;
		--media-object-position: center;
		--controls: none;
		--media-object-fit: cover;
		--media-object-position: center;
	}
`;

const InnerBlur = styled(motion.div)`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 3;
	background: var(--colour-beige-light);

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--colour-beige-light);
		height: 100%;
		width: 100%;
		z-index: 0;
	}
`;

const Inner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

const wrapperVariants = {
	hidden: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 0,
		transition: {
			duration: 0.3,
			delay: 0.5,
			ease: 'easeInOut'
		}
	}
};

type Props = {
	data: MediaType;
	inView: boolean;
	isPriority: boolean;
};

const VideoComponent = (props: Props) => {
	const { data, inView, isPriority } = props;

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile';

	const playbackId =
		isMobile && data?.mobileVideo?.asset?.playbackId
			? data.mobileVideo.asset.playbackId
			: data?.video?.asset?.playbackId;
	const posterUrl =
		isMobile && data?.mobileVideo?.asset?.playbackId
			? `https://image.mux.com/${data.mobileVideo.asset.playbackId}/thumbnail.png?width=214&height=121&time=1`
			: `https://image.mux.com/${data?.video?.asset?.playbackId}/thumbnail.png?width=214&height=121&time=1`;

	return (
		<VideoComponentWrapper className="video-component-wrapper">
			<AnimatePresence initial={false}>
				{playbackId && inView && (
					<InnerBlur
						variants={wrapperVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<Image
							src={`${posterUrl}`}
							alt={''}
							fill
							priority={isPriority}
							sizes="25vw"
						/>
					</InnerBlur>
				)}
			</AnimatePresence>
			{playbackId && (
				<Inner>
					<MuxPlayer
						streamType="on-demand"
						playbackId={playbackId}
						autoPlay="muted"
						loop={true}
						thumbnailTime={1}
						loading="page"
						preload="auto"
						muted
						playsInline={true}
						poster={`${posterUrl}`}
					/>
				</Inner>
			)}
		</VideoComponentWrapper>
	);
};

export default VideoComponent;
