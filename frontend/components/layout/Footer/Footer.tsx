import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import LogoIconSvg from '../../svgs/LogoIconSvg';
import pxToRem from '../../../utils/pxToRem';
import FooterSocialLinks from './FooterSocialLinks';
import PrimaryButton from '../../elements/PrimaryButton';
import Link from 'next/link';

type Props = {
	footerConsultationCta: string;
	instagramUrl: string;
	linkedInUrl: string;
	tagline: string;
	twitterUrl: string;
	footerConsultationButtonTitle: string;
	footerConsultationButtonUrl: string;
};

const FooterWrapper = styled.footer`
	background: var(--colour-black);
	padding: ${pxToRem(56)} 0 ${pxToRem(40)};
	margin-bottom: var(--header-h);
	position: relative;
	z-index: 2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(40)} 0 ${pxToRem(24)};
		margin-bottom: 0;
	}

	.layout-grid {
		align-items: end;
	}
`;

const DesktopWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const DetailsWrapper = styled.div`
	grid-column: 1 / 8;

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
	margin-bottom: ${pxToRem(86)};
	max-width: ${pxToRem(350)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		max-width: 80%;
		margin-bottom: ${pxToRem(28)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		max-width: 100%;
	}
`;

const CtaWrapper = styled.div`
	grid-column: 11 / -1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 11 / -1;
	}
`;

const ConsultationWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	margin-bottom: ${pxToRem(83)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex-direction: column;
		align-items: flex-start;
		gap: ${pxToRem(24)};
		margin-bottom: ${pxToRem(65)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(48)};
		gap: ${pxToRem(16)};
	}
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
	justify-content: space-between;
	padding: ${pxToRem(8)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex-direction: column;
		gap: ${pxToRem(8)};
		padding: 0;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		gap: ${pxToRem(3)};
	}
`;

const SubDetail = styled.p`
	color: var(--colour-white);
	font-family: var(--font-classic-grotesque-regular);
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(15)};
	letter-spacing: 0.12px;
`;

const SubDetailLink = styled.a`
	color: var(--colour-white);
	font-family: var(--font-classic-grotesque-regular);
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(15)};
	letter-spacing: 0.12px;
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
		instagramUrl,
		linkedInUrl,
		tagline,
		twitterUrl,
		footerConsultationButtonTitle,
		footerConsultationButtonUrl
	} = props;

	const socialButtons = [
		{
			title: 'Instagram',
			url: instagramUrl
		},
		{
			title: 'LinkedIn',
			url: linkedInUrl
		},
		{
			title: 'Twitter',
			url: twitterUrl
		}
	];

	return (
		<FooterWrapper>
			<LayoutWrapper>
				<DesktopWrapper>
					<LayoutGrid>
						<DetailsWrapper>
							<LogoWrapper>
								<LogoIconSvg colour="var(--colour-white)" />
							</LogoWrapper>
							{tagline && <Tagline>{tagline}</Tagline>}
							<FooterSocialLinks data={socialButtons} />
						</DetailsWrapper>
						<CtaWrapper>
							<ConsultationWrapper>
								{footerConsultationCta && (
									<ConsultationTitle className="type-h2">
										{footerConsultationCta}
									</ConsultationTitle>
								)}
								{footerConsultationButtonTitle &&
									footerConsultationButtonUrl && (
										<PrimaryButton
											link={footerConsultationButtonUrl}
											target="_blank"
										>
											{footerConsultationButtonTitle}
										</PrimaryButton>
									)}
							</ConsultationWrapper>
							<SubDetailsWrapper>
								<SubDetail>© Studio Otherness BV</SubDetail>
								<SubDetail>
									Otherness™ is a trademark of Otherness
									Holding BV
								</SubDetail>
								<Link
									href="/privacy-policy"
									passHref
									legacyBehavior
								>
									<SubDetailLink>Privacy</SubDetailLink>
								</Link>
							</SubDetailsWrapper>
						</CtaWrapper>
					</LayoutGrid>
				</DesktopWrapper>

				<MobileWrapper>
					<LogoWrapper>
						<LogoIconSvg colour="var(--colour-white)" />
					</LogoWrapper>
					<ConsultationWrapper>
						{footerConsultationCta && (
							<ConsultationTitle className="type-h2">
								{footerConsultationCta}
							</ConsultationTitle>
						)}
						{footerConsultationButtonTitle &&
							footerConsultationButtonUrl && (
								<PrimaryButton
									link={footerConsultationButtonUrl}
									target="_blank"
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
						<SubDetail>© Studio Otherness BV</SubDetail>
						<SubDetail>
							Otherness™ is a trademark of Otherness Holding BV
						</SubDetail>
						<Link href="/privacy-policy" passHref legacyBehavior>
							<SubDetailLink>Privacy</SubDetailLink>
						</Link>
					</SubDetailsWrapper>
				</MobileWrapper>
			</LayoutWrapper>
		</FooterWrapper>
	);
};

export default Footer;
