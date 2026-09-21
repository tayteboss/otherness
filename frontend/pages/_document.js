import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="apple-touch-icon" sizes="180x180" href="/redesign/favicon/apple-touch-icon.png" />
					<link rel="icon" type="image/svg+xml" href="/redesign/favicon/favicon.svg" />
					<link rel="icon" type="image/png" sizes="96x96" href="/redesign/favicon/favicon-96x96.png" />
					<link rel="shortcut icon" href="/redesign/favicon/favicon.ico" />
					<link rel="manifest" href="/redesign/favicon/site.webmanifest" />
					<meta name="theme-color" content="#1A1715" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
