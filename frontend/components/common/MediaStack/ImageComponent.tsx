import Image from 'next/image';
import styled from 'styled-components';

const ImageComponentWrapper = styled.div`
	position: relative;
	padding-top: 56.25%;
	background-color: gray;
`;

type Props = {
	data: {
		url: string;
	};
	isPriority: boolean;
};

const ImageComponent = (props: Props) => {
	const { data, isPriority } = props;

	return (
		<ImageComponentWrapper className="image-component-wrapper">
			<Image src={data.url} alt="" fill priority={isPriority} />
		</ImageComponentWrapper>
	);
};

export default ImageComponent;
