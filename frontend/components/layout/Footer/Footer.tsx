import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import LogoIconSvg from '../../svgs/LogoIconSvg';
import pxToRem from '../../../utils/pxToRem';
import FooterSocialLinks from './FooterSocialLinks';
import PrimaryButton from '../../elements/PrimaryButton';
import Link from 'next/link';
import { ButtonType } from '../../../shared/types/types';

type Props = {
	footerConsultationCta: string;
	socialLink1: ButtonType;
	socialLink2: ButtonType;
	socialLink3: ButtonType;
	tagline: string;
	footerConsultationButtonTitle: string;
	footerConsultationButtonUrl: string;
};

const FooterWrapper = styled.footer`
	background: var(--colour-black);
	padding: ${pxToRem(90)} 0 ${pxToRem(60)};
	margin-bottom: var(--footer-header-h);
	position: relative;
	z-index: 2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(40)} 0 ${pxToRem(24)};
		margin-bottom: 0;
	}
`;

const DesktopWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const DetailsWrapper = styled.div`
	grid-column: 1 / 15;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / 13;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(32)};
	}
`;

const LogoWrapper = styled.div`
	margin-bottom: ${pxToRem(44)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(32)};

		svg {
			width: ${pxToRem(160)};
			height: auto;
		}
	}
`;

const Tagline = styled.h4`
	color: var(--colour-white);
	font-size: ${pxToRem(23)};
	line-height: ${pxToRem(33)};
	letter-spacing: 0.184px;
	margin-bottom: ${pxToRem(16)};
	max-width: ${pxToRem(400)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		max-width: 80%;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		max-width: 100%;
	}
`;

const CtaWrapper = styled.div`
	grid-column: 16 / -1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 14 / -1;
	}
`;

const ConsultationWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${pxToRem(16)};
	margin-bottom: ${pxToRem(40)};
`;

const ConsultationTitle = styled.p`
	flex: 1;
	color: var(--colour-white);
	padding-right: ${pxToRem(32)};

	&.type-h2 {
		@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
			font-size: ${pxToRem(46)};
			line-height: ${pxToRem(59)};
			letter-spacing: -0.69px;
		}
	}
`;

const SubDetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(8)};
`;

const SubDetailsBottomWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(20)};
`;

const SubDetail = styled.p`
	color: var(--colour-white);
	font-family: var(--font-classic-grotesque-regular);
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(15)};
	letter-spacing: 0.12px;
	opacity: 0.5;
`;

const SubDetailLink = styled.a`
	color: var(--colour-white);
	font-family: var(--font-classic-grotesque-regular);
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(15)};
	letter-spacing: 0.12px;
	opacity: 0.5;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 1;
	}
`;

const MobileWrapper = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const Footer = (props: Props) => {
	const {
		footerConsultationCta,
		socialLink1,
		socialLink2,
		socialLink3,
		tagline,
		footerConsultationButtonTitle,
		footerConsultationButtonUrl
	} = props;

	const socialButtons = [
		{
			title: socialLink1.title,
			url: socialLink1.url
		},
		{
			title: socialLink2.title,
			url: socialLink2.url
		},
		{
			title: socialLink3.title,
			url: socialLink3.url
		}
	];

	return (
		<FooterWrapper>
			<LayoutWrapper>
				<DesktopWrapper>
					<LayoutGrid>
						<DetailsWrapper>
							{tagline && <Tagline>{tagline}</Tagline>}
							<FooterSocialLinks data={socialButtons} />
						</DetailsWrapper>
						<CtaWrapper>
							<ConsultationWrapper>
								{footerConsultationCta && (
									<ConsultationTitle className="type-h3">
										{footerConsultationCta}
									</ConsultationTitle>
								)}
								{footerConsultationButtonTitle &&
									footerConsultationButtonUrl && (
										<PrimaryButton
											url={footerConsultationButtonUrl}
										>
											{footerConsultationButtonTitle}
										</PrimaryButton>
									)}
							</ConsultationWrapper>
							<SubDetailsWrapper>
								<SubDetail>
									Otherness™ is a trademark of Otherness
									Holding BV
								</SubDetail>
								<SubDetailsBottomWrapper>
									<SubDetail>© Studio Otherness BV</SubDetail>
									<Link
										href="/privacy"
										passHref
										legacyBehavior
										scroll={false}
									>
										<SubDetailLink>Privacy</SubDetailLink>
									</Link>
								</SubDetailsBottomWrapper>
							</SubDetailsWrapper>
						</CtaWrapper>
					</LayoutGrid>
				</DesktopWrapper>

				<MobileWrapper>
					<ConsultationWrapper>
						{footerConsultationCta && (
							<ConsultationTitle className="type-h2">
								{footerConsultationCta}
							</ConsultationTitle>
						)}
						{footerConsultationButtonTitle &&
							footerConsultationButtonUrl && (
								<PrimaryButton
									url={footerConsultationButtonUrl}
								>
									{footerConsultationButtonTitle}
								</PrimaryButton>
							)}
					</ConsultationWrapper>
					<DetailsWrapper>
						{tagline && <Tagline>{tagline}</Tagline>}
						<FooterSocialLinks data={socialButtons} />
					</DetailsWrapper>

					<SubDetailsWrapper>
						<Link href="/privacy" passHref legacyBehavior>
							<SubDetailLink>Privacy</SubDetailLink>
						</Link>
						<SubDetail>© Studio Otherness BV</SubDetail>
						<SubDetail>
							Otherness™ is a trademark of Otherness Holding BV
						</SubDetail>
					</SubDetailsWrapper>
				</MobileWrapper>
			</LayoutWrapper>
		</FooterWrapper>
	);
};

export default Footer;
