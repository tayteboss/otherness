import styled from 'styled-components';
import { ButtonType, MediaType } from '../../../shared/types/types';
import MediaStack from '../../common/MediaStack';
import pxToRem from '../../../utils/pxToRem';
import PrimaryButton from '../../elements/PrimaryButton';

type Props = {
	title: string;
	description: string;
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
		height: calc(100vh - var(--header-h));
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
	}
`;

const Title = styled.h1`
	text-align: center;
	max-width: ${pxToRem(1200)};
	margin: 0 auto;
	color: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		text-align: left;
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
	const { title, description, media, link } = props;

	return (
		<HomeHeroWrapper>
			<MediaWrapper>
				<MediaStack data={media} isPriority />
			</MediaWrapper>
			<ContentWrapper>
				<TitleWrapper>
					{title && <Title>{title}</Title>}
					{description && (
						<Description className="type-secondary-heading-large">
							{description}
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
