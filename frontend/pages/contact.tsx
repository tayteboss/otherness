import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import ConsultationLink from '../components/redesign/ConsultationLink';
import { getRedesignShellProps } from '../lib/redesign/shell';
import { redesignScope } from '../styles/redesign';

const Contact = styled.section`
	${redesignScope}
	background: var(--redesign-paper);
	min-height: max(780px, calc(100svh - 100px));
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 200px 24px 104px;
	.contact-icon {
		width: 49px;
		height: 27px;
		margin-bottom: 40px;
	}
	h1 {
		font-family: var(--redesign-serif);
		font-size: clamp(64px, 6vw, 112px);
		font-weight: 400;
		line-height: 1.12;
		letter-spacing: -0.025em;
		text-align: center;
		margin: 0 0 72px;
	}
	.booking {
		background: var(--redesign-ink);
		color: white;
		padding: 16px 32px;
		font-size: 14px;
		line-height: 18px;
		font-weight: 700;
		text-transform: uppercase;
	}
	.booking:hover {
		background: var(--redesign-taupe);
	}
	@media (max-width: 768px) {
		min-height: 680px;
		min-height: max(680px, calc(100svh - 220px));
		padding: 176px 24px 96px;
		h1 {
			font-size: clamp(46px, 11.8vw, 80px);
			margin-bottom: 56px;
		}
	}
`;

export default function ContactPage() {
	return (
		<>
			<NextSeo
				title="Otherness — Contact"
				description="Own your intersections. Book a consultation with Studio Otherness."
			/>
			<Contact aria-labelledby="contact-heading" data-redesign-contact>
				<img
					className="contact-icon"
					src="/redesign/brand/logo-icon-dark.svg"
					width="49"
					height="27"
					alt=""
				/>
				<h1 id="contact-heading">
					Own your
					<br />
					intersections
				</h1>
				<ConsultationLink className="booking">
					Book a consultation <span aria-hidden="true">→</span>
				</ConsultationLink>
			</Contact>
		</>
	);
}

export async function getStaticProps() {
	return { props: await getRedesignShellProps() };
}
