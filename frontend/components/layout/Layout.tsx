import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MobileMenu from '../blocks/MobileMenu';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { SiteSettingsType } from '../../shared/types/types';

const siteSettings: SiteSettingsType = require('../../json/siteSettings.json');

const Main = styled.main`
	position: relative;
	z-index: 3;
	background: var(--colour-white);
`;

type Props = {
	children: ReactNode;
};

const Layout = (props: Props) => {
	const { children } = props;

	const {
		footerConsultationCta,
		socialLink1,
		socialLink2,
		socialLink3,
		tagline,
		footerConsultationButtonTitle,
		footerConsultationButtonUrl,
		mobileMenuConsultationCta,
		mobileMenuConsultationButtonTitle
	} = siteSettings;

	const [hideLayoutHeader, setHideLayoutHeader] = useState(true);
	const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false);

	const router = useRouter();

	const lenis = useLenis(({ scroll }) => {});

	useEffect(() => {
		if (router.asPath === '/') {
			setHideLayoutHeader(true);
		} else {
			setHideLayoutHeader(false);
		}
	}, [router]);

	useEffect(() => {
		if (!lenis) return;

		if (mobileMenuIsActive) {
			const timer = setTimeout(() => {
				lenis.stop();
				clearTimeout(timer);
			}, 500);
		} else {
			lenis.start();
		}
	}, [mobileMenuIsActive]);

	return (
		<>
			<Header
				isActive={!hideLayoutHeader}
				mobileMenuIsActive={mobileMenuIsActive}
				setMobileMenuIsActive={setMobileMenuIsActive}
			/>
			<MobileMenu
				isActive={mobileMenuIsActive}
				setMobileMenuIsActive={setMobileMenuIsActive}
				cta={mobileMenuConsultationCta}
				buttonTitle={mobileMenuConsultationButtonTitle}
				buttonUrl={footerConsultationButtonUrl}
			/>
			<ReactLenis root>
				<Main>{children}</Main>
			</ReactLenis>
			<Footer
				footerConsultationCta={footerConsultationCta}
				socialLink1={socialLink1}
				socialLink2={socialLink2}
				socialLink3={socialLink3}
				tagline={tagline}
				footerConsultationButtonTitle={footerConsultationButtonTitle}
				footerConsultationButtonUrl={footerConsultationButtonUrl}
			/>
			<Header
				isActive
				mobileMenuIsActive={mobileMenuIsActive}
				setMobileMenuIsActive={setMobileMenuIsActive}
				isFooterVersion
			/>
		</>
	);
};

export default Layout;
