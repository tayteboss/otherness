import { useEffect } from 'react';

const useHeaderHeight = () => {
	useEffect(() => {
		const setHeaderHeight = (): void => {
			const header: HTMLElement | null =
				document.querySelector('.header');

			if (!header) return;
			const headerHeight = header.offsetHeight;

			document.documentElement.style.setProperty(
				'--header-h',
				`${headerHeight}px`
			);
		};

		setHeaderHeight();

		const timer = setTimeout(() => {
			setHeaderHeight();
		}, 100);

		window.addEventListener('resize', setHeaderHeight);

		return () => {
			window.removeEventListener('resize', setHeaderHeight);
			clearTimeout(timer);
		};
	}, []);
};

export default useHeaderHeight;
