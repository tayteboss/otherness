import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';

type Props = {
	imageComponentTwoSmall: any;
};

const ImageComponentTwoSmallWrapper = styled.section``;

const ImageComponentTwoSmall = (prop: Props) => {
	const { imageComponentTwoSmall } = prop;

	return (
		<ImageComponentTwoSmallWrapper>
			<LayoutWrapper useGalleryLayout>
				<LayoutGrid useGalleryGrid>ImageComponentTwoSmall</LayoutGrid>
			</LayoutWrapper>
		</ImageComponentTwoSmallWrapper>
	);
};

export default ImageComponentTwoSmall;
