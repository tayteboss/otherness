import { NextSeo } from 'next-seo';
import OurWay from '../components/redesign/OurWay';
import { getRedesignData } from '../lib/redesign/server';
import { getRedesignShellProps } from '../lib/redesign/shell';
import type { OurWayPage, RedesignSettings } from '../lib/redesign/types';

export default function Page({
	ourWay,
	redesignSettings
}: {
	ourWay: OurWayPage | null;
	redesignSettings: RedesignSettings | null;
}) {
	return (
		<>
			<NextSeo
				title={ourWay?.seo?.title || 'Otherness — Our Way'}
				description={ourWay?.seo?.description || undefined}
				openGraph={
					ourWay?.seo?.image?.asset?.url
						? {
								images: [
									{
										url: ourWay.seo.image.asset.url,
										alt: ourWay.seo.image.alt || undefined
									}
								]
						  }
						: undefined
				}
			/>
			<OurWay page={ourWay} settings={redesignSettings} />
		</>
	);
}

export async function getStaticProps() {
	const [redesign, shell] = await Promise.all([
		getRedesignData(),
		getRedesignShellProps()
	]);
	return { props: { ...shell, ourWay: redesign.ourWay } };
}
