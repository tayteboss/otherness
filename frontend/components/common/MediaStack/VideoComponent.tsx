import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

const VideoComponentWrapper = styled.div`
	position: relative;
`;

const Video = styled.video`
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const LoadingWrapper = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--colour-black);
	z-index: 2;
	pointer-events: none;
`;

const Loader = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: ${pxToRem(16)};
	height: ${pxToRem(16)};
	background: var(--colour-white);
	border-radius: 100%;
`;

const wrapperVariants: {} = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
};

const childVariants: {} = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	visible: {
		opacity: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'easeInOut',
			repeat: 'Infinity',
			repeatType: 'mirror',
		},
	},
};

type Props = {
	data: {
		url: string
	};
	inView: boolean;
};

const VideoComponent = (props: Props) => {
	const {
		data,
		inView
	} = props;

	const [isLoading, setIsLoading] = useState(true);

	let videoUrl: boolean | string = false;
	if (data) {
		videoUrl = data?.url;
	}

	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<VideoComponentWrapper className="video-component-wrapper">
			{videoUrl && (
				<>
					<AnimatePresence>
						{isLoading && (
							<LoadingWrapper
								variants={wrapperVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
							>
								<Loader
									variants={childVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
								/>
							</LoadingWrapper>
						)}
					</AnimatePresence>
					<Video
						autoPlay
						muted
						playsInline
						loop
						ref={videoRef}
						preload="auto"
						onLoadedData={() => setIsLoading(false)}
					>
						<source src={videoUrl} type="video/mp4" />
					</Video>
				</>
			)}
		</VideoComponentWrapper>
	);
};

export default VideoComponent;
