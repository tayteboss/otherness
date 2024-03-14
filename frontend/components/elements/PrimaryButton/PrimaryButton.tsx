import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	children: React.ReactNode;
	link: string;
	target?: string;
};

const LinkTag = styled.a`
	display: inline-block;
`;

const Inner = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${pxToRem(12)} ${pxToRem(32)};
	background: var(--colour-white);
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;
`;

const PrimaryButton = (props: Props) => {
	const { children, link, target = '_self' } = props;

	return (
		<Link href={link} passHref legacyBehavior>
			<LinkTag className="primary-button" target={target}>
				<Inner>{children}</Inner>
			</LinkTag>
		</Link>
	);
};

export default PrimaryButton;
