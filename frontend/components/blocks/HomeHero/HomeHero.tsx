import styled from 'styled-components';
import { ButtonType, MediaType } from '../../../shared/types/types';
import MediaStack from '../../common/MediaStack';
import pxToRem from '../../../utils/pxToRem';
import PrimaryButton from '../../elements/PrimaryButton';
import useViewportWidth from '../../../hooks/useViewportWidth';

type Props = {
	title: string;
	mobileTitle?: string;
	description: string;
	mobileDescription?: string;
	media: MediaType;
	link: ButtonType;
};

const HomeHeroWrapper = styled.section`
	position: relative;
`;

const MediaWrapper = styled.div`
	position: relative;
	z-index: 1;

	.video-component-wrapper,
	.image-component-wrapper {
		min-height: calc(100vh - ((var(--header-h) / 2) - 10px));

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			min-height: calc(100svh - var(--header-h));
		}
	}
`;

const ContentWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 7vh;
	z-index: 2;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		align-items: flex-start;
		gap: ${pxToRem(30)};
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(40)};
	width: 90vw;
	padding: 0 ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: 0 ${pxToRem(16)};
		width: 100vw;
		gap: ${pxToRem(20)};
		align-items: flex-start;
	}
`;

const Title = styled.h1`
	text-align: center;
	max-width: ${pxToRem(1200)};
	margin: 0 auto;
	color: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		text-align: left;
		margin: 0;
	}
`;

const Description = styled.h3`
	max-width: ${pxToRem(946)};
	margin: 0 auto;
	color: var(--colour-white);
`;

const ButtonWrapper = styled.div`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		text-align: left;
		padding: 0 ${pxToRem(16)};
	}
`;

const HomeHero = (props: Props) => {
	const { title, mobileTitle, description, mobileDescription, media, link } =
		props;

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile' || viewport === 'tabletPortrait';

	return (
		<HomeHeroWrapper>
			<MediaWrapper>
				<MediaStack data={media} isPriority />
			</MediaWrapper>
			<ContentWrapper>
				<TitleWrapper>
					{title && <Title>{isMobile ? mobileTitle : title}</Title>}
					{description && (
						<Description className="type-secondary-heading-large">
							{isMobile ? mobileDescription : description}
						</Description>
					)}
				</TitleWrapper>
				{link && (
					<ButtonWrapper>
						<PrimaryButton data={link}>{link.title}</PrimaryButton>
					</ButtonWrapper>
				)}
			</ContentWrapper>
		</HomeHeroWrapper>
	);
};

export default HomeHero;
