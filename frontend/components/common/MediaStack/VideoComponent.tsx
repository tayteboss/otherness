import MuxPlayer from '@mux/mux-player-react/lazy';
import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const VideoComponentWrapper = styled.div`
	position: relative;
	overflow: hidden;

	mux-player {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const InnerBlur = styled(motion.div)`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

const wrapperVariants = {
	hidden: {
		opacity: 1,
		filter: 'blur(10px)',
		scale: 1.05,
		transition: {
			duration: 2,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 0,
		filter: 'blur(0px)',
		scale: 1,
		transition: {
			duration: 2,
			ease: 'easeInOut',
			delay: 0.2
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

	return (
		<VideoComponentWrapper className="video-component-wrapper">
			<AnimatePresence initial={false}>
				{inView && data?.video?.asset?.playbackId && (
					<InnerBlur
						variants={wrapperVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<Image
							src={`https://image.mux.com/${data?.video?.asset?.playbackId}/thumbnail.png?width=214&height=121&time=1`}
							alt={''}
							fill
							priority={isPriority}
						/>
					</InnerBlur>
				)}
			</AnimatePresence>
			{data?.video?.asset?.playbackId && (
				<MuxPlayer
					streamType="on-demand"
					playbackId={data?.video?.asset?.playbackId}
					autoPlay="muted"
					loop={true}
					thumbnailTime={1}
					loading="page"
					preload="auto"
					muted
					playsInline={true}
					poster={`https://image.mux.com/${data?.video?.asset?.playbackId}/thumbnail.png?width=214&height=121&time=1`}
				/>
			)}
		</VideoComponentWrapper>
	);
};

export default VideoComponent;
