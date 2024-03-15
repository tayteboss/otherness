import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';

type Props = {
	data: { title: string; url: string }[];
};

const FooterSocialLinksWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(8)};
`;

const LinkTag = styled.a`
	padding: ${pxToRem(8)} ${pxToRem(16)};
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(14)};
	letter-spacing: 0.96px;
	text-transform: uppercase;
	color: var(--colour-white);
	background: rgba(255, 255, 255, 0.2);
`;

const FooterSocialLinks = (props: Props) => {
	const { data } = props;

	const hasData = data.length > 0;

	return (
		<FooterSocialLinksWrapper>
			{hasData &&
				data.map((item, i) => (
					<Link href={item.url} passHref legacyBehavior>
						<LinkTag target="_blank">{item.title}</LinkTag>
					</Link>
				))}
		</FooterSocialLinksWrapper>
	);
};

export default FooterSocialLinks;