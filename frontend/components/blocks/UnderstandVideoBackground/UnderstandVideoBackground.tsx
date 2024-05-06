import MuxPlayer from '@mux/mux-player-react';
import styled from 'styled-components';

type Props = {
	data: {
		asset: {
			playbackId: string;
		};
	};
};

const UnderstandVideoBackgroundWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 1;
	pointer-events: none;
	transform: scale(2);

	* {
		pointer-events: none;
	}
`;

const Inner = styled.div`
	height: 100%;
	width: 100%;

	mux-player {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
`;

const UnderstandVideoBackground = (props: Props) => {
	const { data } = props;

	return (
		<UnderstandVideoBackgroundWrapper>
			{data?.asset?.playbackId && (
				<Inner>
					<MuxPlayer
						streamType="on-demand"
						playbackId={data.asset.playbackId}
						autoPlay="muted"
						loop={true}
						thumbnailTime={1}
						preload="auto"
						muted
						playsInline={true}
						minResolution="1080p"
					/>
				</Inner>
			)}
		</UnderstandVideoBackgroundWrapper>
	);
};

export default UnderstandVideoBackground;
