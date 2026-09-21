import styled from 'styled-components';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { GoogleTagManager } from '@next/third-parties/google';
import type { RedesignSettings } from '../../lib/redesign/types';
import Header from '../redesign/Header';
import Footer from '../redesign/Footer';
import MobileMenu from '../redesign/MobileMenu';

const Main = styled.main`
	position: relative;
	z-index: 3;
	background: var(--colour-white);
`;

export default function Layout({
	children,
	settings
}: {
	children: ReactNode;
	settings: RedesignSettings | null;
}) {
	const [menuOpen, setMenuOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeMenu = useCallback(() => setMenuOpen(false), []);
	return (
		<>
			<GoogleTagManager gtmId="G-5TXD8TLXKY" />
			<Header
				settings={settings}
				open={menuOpen}
				onOpen={() => setMenuOpen(true)}
				triggerRef={triggerRef}
			/>
			<ReactLenis root>
				<MobileMenu
					settings={settings}
					open={menuOpen}
					onClose={closeMenu}
					triggerRef={triggerRef}
				/>
				<Main>{children}</Main>
			</ReactLenis>
			<Footer settings={settings} />
		</>
	);
}
