import styled from 'styled-components';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useIsPresent, useReducedMotion } from 'framer-motion';
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
	settings,
	routePath
}: {
	children: ReactNode;
	settings: RedesignSettings | null;
	routePath: string;
}) {
	const [menuOpen, setMenuOpen] = useState(false);
	const present = useIsPresent();
	const reduced = useReducedMotion();
	const pageRef = useRef<HTMLDivElement>(null);
	const compactFooter = routePath === '/contact';
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeMenu = useCallback(() => setMenuOpen(false), []);
	useEffect(() => {
		pageRef.current?.toggleAttribute('inert', !present);
	}, [present]);
	return (
		<motion.div
			ref={pageRef}
			data-page-route={routePath}
			data-page-present={present}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { duration: reduced ? 0 : 0.65, ease: 'easeOut' }
			}}
			exit={{
				opacity: 0,
				transition: { duration: reduced ? 0 : 0.3, ease: 'easeInOut' }
			}}
		>
			<Header
				routePath={routePath}
				settings={settings}
				open={menuOpen}
				onOpen={() => setMenuOpen(true)}
				triggerRef={triggerRef}
			/>
			<MobileMenu
				settings={settings}
				open={menuOpen}
				onClose={closeMenu}
				triggerRef={triggerRef}
			/>
			<Main>{children}</Main>
			<Footer
				settings={settings}
				compact={compactFooter}
				routePath={routePath}
			/>
		</motion.div>
	);
}
