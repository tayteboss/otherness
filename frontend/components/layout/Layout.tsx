import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MobileMenu from '../blocks/MobileMenu';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

const Main = styled.main``;

type Props = {
	children: ReactNode;
};

const Layout = (props: Props) => {
	const { children } = props;

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
			/>
			<ReactLenis root>
				<Main>{children}</Main>
			</ReactLenis>
			<Footer />
		</>
	);
};

export default Layout;
