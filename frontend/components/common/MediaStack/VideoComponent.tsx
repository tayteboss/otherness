import MuxPlayer from '@mux/mux-player-react/lazy';
import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';

const VideoComponentWrapper = styled.div`
	position: relative;
	overflow: hidden;

	mux-player {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

type Props = {
	data: MediaType;
	inView: boolean;
};

const VideoComponent = (props: Props) => {
	const { data, inView } = props;

	return (
		<VideoComponentWrapper className="video-component-wrapper">
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
					poster={
						'https://image.mux.com/mZViVMVUgVLvqoTWOk2knYWRtFctWQrqZFa7EtmDEQw/thumbnail.png?width=214&height=121&time=2'
					}
				/>
			)}
		</VideoComponentWrapper>
	);
};

export default VideoComponent;
