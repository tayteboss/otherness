import styled from 'styled-components';
import { ConversationsType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import ArrowSvg from '../../svgs/ArrowSvg';
import { useState } from 'react';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ConversationCard from '../ConversationCard';
import Link from 'next/link';

type Props = {
	data: ConversationsType[];
};

const RelatedConversationsWrapper = styled.section`
	background: var(--colour-beige-light);
	padding: ${pxToRem(24)} 0 ${pxToRem(80)};
	display: block;
	position: relative;
	z-index: 5;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(24)} 0 ${pxToRem(56)};
	}
`;

const SubTitleWrapper = styled.a`
	display: flex;
	align-items: center;
	gap: ${pxToRem(16)};
	padding: ${pxToRem(12)} 0;
`;

const SubTitle = styled.span<{ $isActive?: boolean }>`
	font-size: ${pxToRem(14)};
	line-height: ${pxToRem(17)};
	letter-spacing: 1.12px;
	text-transform: uppercase;

	transform: ${(props) => props.$isActive && 'translateX(8px)'};

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const ArrowWrapper = styled.div<{ $isActive: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	transform: ${(props) => props.$isActive && 'translateX(8px)'};

	transition: all var(--transition-speed-default) var(--transition-ease);

	svg {
		width: 20px;
		height: auto;
	}
`;

const Title = styled.h2`
	margin-bottom: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(40)};
	}
`;

const ConversationsWrapper = styled.div``;

const RelatedConversations = (props: Props) => {
	const { data } = props;

	const hasData = data?.length > 0;

	const [isHovered, setIsHovered] = useState(false);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<>
			{hasData && (
				<RelatedConversationsWrapper ref={ref}>
					<LayoutWrapper>
						<Link href="/conversations" passHref legacyBehavior>
							<SubTitleWrapper
								className={`view-element-fade-in ${
									inView
										? 'view-element-fade-in--in-view'
										: ''
								}`}
								onMouseOver={() => setIsHovered(true)}
								onMouseOut={() => setIsHovered(false)}
							>
								<SubTitle>Explore Further</SubTitle>
								<ArrowWrapper $isActive={isHovered}>
									<ArrowSvg />
								</ArrowWrapper>
							</SubTitleWrapper>
						</Link>
						<ConversationsWrapper>
							<Title>Conversations we need to have</Title>
							<LayoutGrid>
								{data.map((item, i) => (
									<ConversationCard
										title={item?.title}
										excerpt={item?.excerpt}
										tag={item?.tag}
										theme={item?.theme}
										thumbnailMedia={item?.thumbnailMedia}
										slug={item?.slug}
										author={item?.author}
										index={(i = 1)}
										key={i}
									/>
								))}
							</LayoutGrid>
						</ConversationsWrapper>
					</LayoutWrapper>
				</RelatedConversationsWrapper>
			)}
		</>
	);
};

export default RelatedConversations;
