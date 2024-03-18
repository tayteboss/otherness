import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	children: ReactNode;
	useGalleryLayout?: boolean;
};

const Wrapper = styled.div<{ $useGalleryLayout: boolean }>`
	margin: 0 auto;
	max-width: ${(props) => (props.$useGalleryLayout ? '100%' : '1440px')};
	padding: ${(props) => (props.$useGalleryLayout ? '0 8px' : '0 24px')};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${(props) => (props.$useGalleryLayout ? '0 8px' : '0 16px')};
	}
`;

const LayoutWrapper = (props: Props) => {
	const { useGalleryLayout = false } = props;

	return (
		<Wrapper
			className="layout-wrapper"
			$useGalleryLayout={useGalleryLayout}
		>
			{props.children}
		</Wrapper>
	);
};

export default LayoutWrapper;
