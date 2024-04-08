import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import ArrowButton from '../../elements/ArrowButton';

type Props = {
	data: { title: string; url: string }[];
};

const FooterSocialLinksWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(40)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex-direction: column;
		gap: ${pxToRem(0)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: row;
		gap: ${pxToRem(32)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		flex-direction: column;
		gap: ${pxToRem(0)};
	}
`;

const FooterSocialLinks = (props: Props) => {
	const { data } = props;

	const hasData = data.length > 0;

	return (
		<FooterSocialLinksWrapper>
			{hasData &&
				data.map((item, i) => (
					<ArrowButton url={item?.url} key={i}>
						{item.title}
					</ArrowButton>
				))}
		</FooterSocialLinksWrapper>
	);
};

export default FooterSocialLinks;
