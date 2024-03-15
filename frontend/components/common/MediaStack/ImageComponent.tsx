import Image from 'next/image';
import styled from 'styled-components';
import { MediaType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';

const ImageComponentWrapper = styled.div`
	position: relative;
	background-color: gray;
	overflow: hidden;
`;

const InnerBlur = styled(motion.div)`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

const Inner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
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
	isPriority: boolean;
	inView: boolean;
};

const ImageComponent = (props: Props) => {
	const { data, isPriority, inView } = props;

	return (
		<ImageComponentWrapper className="image-component-wrapper">
			<AnimatePresence initial={false}>
				{inView && data?.image?.asset?.metadata?.lqip && (
					<InnerBlur
						variants={wrapperVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<Image
							src={data?.image?.asset?.metadata?.lqip}
							alt={data?.image?.alt || ''}
							fill
							priority={isPriority}
							blurDataURL={data?.image?.asset?.metadata?.lqip}
						/>
					</InnerBlur>
				)}
			</AnimatePresence>
			<Inner>
				{data?.image?.asset?.url && (
					<Image
						src={data.image.asset?.url}
						alt={data?.image?.alt || ''}
						fill
						priority={isPriority}
						blurDataURL={data?.image?.asset?.metadata?.lqip}
					/>
				)}
			</Inner>
		</ImageComponentWrapper>
	);
};

export default ImageComponent;
