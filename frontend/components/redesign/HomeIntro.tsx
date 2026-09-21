import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import styled from 'styled-components';
import type { HomePageV2 } from '../../lib/redesign/types';
import { redesignScope } from '../../styles/redesign';

const SESSION_KEY = 'otherness:intro:v1';
const Panel = styled(motion.dialog)`
	${redesignScope}
	position: fixed;
	inset: 0;
	margin: 0;
	padding: 0;
	width: 100%;
	max-width: none;
	height: 100%;
	height: 100dvh;
	max-height: none;
	border: 0;
	background: var(--redesign-ink);
	color: var(--redesign-paper);
	&::backdrop {
		background: transparent;
	}
	.word-pair {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding: 4.2vw;
	}
	.word-pair span {
		font-family: var(--redesign-serif);
		font-size: clamp(40px, 6vw, 120px);
		line-height: 1.2;
	}
	@media (max-width: 768px) {
		.word-pair {
			flex-direction: column;
			justify-content: center;
			gap: 0;
		}
		.word-pair span {
			font-size: clamp(32px, 8.3vw, 56px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		display: none;
	}
`;

export default function HomeIntro({
	pairs
}: {
	pairs: HomePageV2['loadingPairs'];
}) {
	const usable = (pairs || [])
		.filter((pair) => pair.first && pair.second)
		.slice(0, 3);
	const [playing, setPlaying] = useState(false);
	const [index, setIndex] = useState(0);
	const [fading, setFading] = useState(false);
	const admitted = useRef(false);
	const panelRef = useRef<HTMLDialogElement>(null);
	const lenis = useLenis(() => undefined);
	const finish = useCallback(() => setPlaying(false), []);
	useEffect(() => {
		// Keep admission stable through React Strict Mode's effect rehearsal.
		if (admitted.current) return;
		admitted.current = true;
		try {
			const seen = sessionStorage.getItem(SESSION_KEY);
			sessionStorage.setItem(SESSION_KEY, 'seen');
			if (
				seen ||
				usable.length !== 3 ||
				window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
				window.scrollY > 20
			)
				return;
			setPlaying(true);
		} catch {
			// Disabled storage must never block content or cause repeated intros.
		}
	}, [usable.length]);
	useEffect(() => {
		const panel = panelRef.current;
		if (!playing || !panel) return;
		try {
			panel.showModal();
		} catch {
			finish();
			return;
		}
		const previousOverflow = document.documentElement.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		lenis?.stop();
		panel.focus({ preventScroll: true });
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const onPreference = () => {
			if (reduced.matches) finish();
		};
		reduced.addEventListener('change', onPreference);
		// Completion is timer-driven, independent of images and animation callbacks.
		const timers = [
			window.setTimeout(() => setIndex(1), 1500),
			window.setTimeout(() => setIndex(2), 3000),
			window.setTimeout(() => setFading(true), 4500),
			window.setTimeout(finish, 4800)
		];
		return () => {
			timers.forEach(window.clearTimeout);
			reduced.removeEventListener('change', onPreference);
			panel.close();
			document.documentElement.style.overflow = previousOverflow;
			lenis?.resize();
			lenis?.start();
			// Do not steal focus during route changes or from another modal.
			if (document.activeElement === document.body)
				document
					.getElementById('landing-statement')
					?.focus({ preventScroll: true });
		};
	}, [playing, lenis, finish]);
	if (!playing) return null;
	const pair = usable[index];
	return (
		<Panel
			ref={panelRef}
			aria-label="Welcome to Otherness"
			tabIndex={-1}
			data-home-intro
			initial={{ opacity: 1 }}
			animate={{ opacity: fading ? 0 : 1 }}
			transition={{ duration: 0.3 }}
			onCancel={(event) => {
				event.preventDefault();
				finish();
			}}
		>
			<motion.div
				className="word-pair"
				key={index}
				aria-hidden="true"
				initial={{ opacity: 0, filter: 'blur(8px)' }}
				animate={{
					opacity: [0, 1, 1, 0],
					filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
				}}
				transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
			>
				<span>{pair?.first}</span>
				<span>{pair?.second}</span>
			</motion.div>
		</Panel>
	);
}
