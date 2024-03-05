import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';

const MediaStackWrapper = styled.div`
	overflow: hidden;
`;

type Props = {
	data: {
		useVideo: boolean,
		video: {
			url: string
		},
		image: {
			url: string
		},
	};
	isPriority?: boolean
};

const MediaStack = (props: Props) => {
	const {
		data,
		isPriority = false
	} = props;

	const useVideo = data?.useVideo && data?.video?.url;
	const useImage = !data?.useVideo && data?.image?.url;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-5%',
	});

	return (
		<MediaStackWrapper ref={ref}>
			{useVideo && <VideoComponent data={data.video} inView={inView} />}
			{useImage && <ImageComponent data={data.image} isPriority={false} />}
		</MediaStackWrapper>
	);
};

export default MediaStack;
