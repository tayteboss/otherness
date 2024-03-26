import styled from 'styled-components';
import { ConversationsType } from '../../../shared/types/types';
import Link from 'next/link';
import pxToRem from '../../../utils/pxToRem';
import ArrowSvg from '../../svgs/ArrowSvg';
import { useInView } from 'react-intersection-observer';
import MediaCursorLayout from '../../layout/MediaCursorLayout';
import MediaStack from '../../common/MediaStack';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ConversationCardWrapper = styled.a<{ $isDarkTheme: boolean }>`
	padding: ${pxToRem(24)};
	background: ${(props) =>
		props.$isDarkTheme ? 'var(--colour-black)' : 'transparant'};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: ${pxToRem(590)};
	border: 1px solid var(--colour-black);
	overflow: hidden;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(16)};
		gap: ${pxToRem(120)};
		min-height: auto;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		gap: ${pxToRem(40)};
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(24)};
	position: relative;
	z-index: 5;
`;

const Title = styled.h4<{ $isDarkTheme: boolean }>`
	color: ${(props) =>
		props.$isDarkTheme ? 'var(--colour-white)' : 'var(--colour-black)'};
`;

const Excerpt = styled.p<{ $isDarkTheme: boolean }>`
	color: ${(props) =>
		props.$isDarkTheme ? 'var(--colour-white)' : 'var(--colour-black)'};
`;

const FooterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	z-index: 5;
`;

const DetailsWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: ${pxToRem(8)};
`;

const Tag = styled.span<{ $isDarkTheme: boolean }>`
	color: ${(props) =>
		props.$isDarkTheme ? 'var(--colour-white)' : 'var(--colour-black)'};
	font-family: var(--font-classic-grotesque-regular);
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(21)};
	letter-spacing: 0.14px;
	text-transform: uppercase;
`;

const Divider = styled.div<{ $isDarkTheme: boolean }>`
	background: ${(props) =>
		props.$isDarkTheme ? 'var(--colour-white)' : 'var(--colour-black)'};
	height: ${pxToRem(4)};
	width: ${pxToRem(4)};
	border-radius: 100%;
`;

const ArrowWrapper = styled(motion.div)``;

const MediaWrapper = styled.div`
	.image-component-wrapper,
	.video-component-wrapper {
		width: ${pxToRem(300)};
		height: ${pxToRem(300)};
	}
`;

const ConversationCard = (props: ConversationsType & { index: number }) => {
	const { title, excerpt, tag, theme, thumbnailMedia, slug, author, index } =
		props;

	const [isHovered, setIsHovered] = useState(false);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<Link
			href={`/conversations/${slug.current}`}
			passHref
			legacyBehavior
			scroll={false}
		>
			<ConversationCardWrapper
				$isDarkTheme={theme === 'dark'}
				ref={ref}
				className={`conversations-card view-element-fade-in ${
					inView ? 'view-element-fade-in--in-view' : ''
				}`}
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
			>
				<TitleWrapper>
					{title && (
						<Title $isDarkTheme={theme === 'dark'}>{title}</Title>
					)}
					{excerpt && (
						<Excerpt
							className="type-secondary-heading-medium"
							$isDarkTheme={theme === 'dark'}
						>
							{excerpt}
						</Excerpt>
					)}
				</TitleWrapper>
				<FooterWrapper>
					<DetailsWrapper>
						{tag && (
							<Tag $isDarkTheme={theme === 'dark'}>{tag}</Tag>
						)}
						{author && tag && (
							<Divider $isDarkTheme={theme === 'dark'} />
						)}
						{author && (
							<Tag $isDarkTheme={theme === 'dark'}>{author}</Tag>
						)}
					</DetailsWrapper>
					<ArrowWrapper
						initial={{ x: 0 }}
						animate={{
							x: isHovered ? [0, 8, 0] : 0,
							transition: { duration: 0.5 }
						}}
					>
						<ArrowSvg
							colour={
								theme === 'dark'
									? 'var(--colour-white)'
									: 'var(--colour-black)'
							}
						/>
					</ArrowWrapper>
				</FooterWrapper>
				<MediaCursorLayout isActive={isHovered} isOdd={index % 2 === 1}>
					<MediaWrapper>
						<MediaStack data={thumbnailMedia} />
					</MediaWrapper>
				</MediaCursorLayout>
			</ConversationCardWrapper>
		</Link>
	);
};

export default ConversationCard;
