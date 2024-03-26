import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import PageHeader from '../components/blocks/PageHeader';
import PrimaryButton from '../components/elements/PrimaryButton';
import pxToRem from '../utils/pxToRem';
import LayoutWrapper from '../components/common/LayoutWrapper';

const PageWrapper = styled.div`
	min-height: 100vh;
	padding-top: var(--header-h);
`;

const Inner = styled.div`
	padding-top: ${pxToRem(80)};
`;

const Page = () => {
	return (
		<PageWrapper>
			<NextSeo title="404 | Sorry we couldn't find that page" />
			<PageHeader data="Sorry, we couldn't find that page" />
			<Inner>
				<LayoutWrapper>
					<PrimaryButton url="/" isBlack>
						Back Home
					</PrimaryButton>
				</LayoutWrapper>
			</Inner>
		</PageWrapper>
	);
};

export default Page;
