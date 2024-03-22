import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useHeaderHeight = () => {
	const router = useRouter();

	useEffect(() => {
		const setHeaderHeight = (): void => {
			const header: HTMLElement | null =
				document.querySelector('.header');
			const footerHeader: HTMLElement | null =
				document.querySelector('.footer-header');

			if (!header) return;
			const headerHeight = header.offsetHeight;

			document.documentElement.style.setProperty(
				'--header-h',
				`${headerHeight}px`
			);

			if (footerHeader) {
				const footerHeaderHeight = footerHeader.offsetHeight;

				document.documentElement.style.setProperty(
					'--footer-header-h',
					`${footerHeaderHeight}px`
				);
			}
		};

		setHeaderHeight();

		const timer = setTimeout(() => {
			setHeaderHeight();
		}, 50);

		window.addEventListener('resize', setHeaderHeight);

		return () => {
			window.removeEventListener('resize', setHeaderHeight);
			clearTimeout(timer);
		};
	}, [router.asPath]);
};

export default useHeaderHeight;
