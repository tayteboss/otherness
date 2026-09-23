import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import type { RedesignSettings } from '../../lib/redesign/types';

export const NavigationLinks = styled.div`
	display: flex;
	justify-content: center;
	gap: 8px;
	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 10px 18px;
		background: #efedeb;
		color: var(--redesign-ink);
		font-size: 14px;
		line-height: 20px;
		font-weight: 700;
		text-transform: uppercase;
		transition: background 200ms ease;
	}
	a:hover,
	a[aria-current='page'] {
		background: #d9d4ce;
	}
	a[aria-current='page'] {
		box-shadow: inset 0 -2px currentColor;
	}
	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
`;

export function Navigation({
	settings,
	label,
	onNavigate
}: {
	settings: RedesignSettings | null;
	label: string;
	onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
	const router = useRouter();
	return (
		<nav aria-label={label}>
			<NavigationLinks>
				{(settings?.navigation || []).map((link) => {
					const href =
						link._key === 'contact'
							? '/contact'
							: link.href;
					if (!href || !link.label) return null;
					const active =
						href.startsWith('/') &&
						(router.asPath.split('?')[0] === href ||
							router.asPath.startsWith(`${href}/`));
					return (
						<Link
							key={link._key}
							href={href}
							prefetch={href === '/our-way' ? false : undefined}
							aria-current={active ? 'page' : undefined}
							onClick={onNavigate}
						>
							{link.label}
						</Link>
					);
				})}
			</NavigationLinks>
		</nav>
	);
}
