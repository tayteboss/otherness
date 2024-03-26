import styled from 'styled-components';
import { ButtonType, MediaType } from '../../../shared/types/types';
import LayoutGrid from '../../common/LayoutGrid';
import MediaStack from '../../common/MediaStack';
import PrimaryButton from '../../elements/PrimaryButton';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	link: ButtonType;
	media: MediaType;
	title: string;
};

const CtaBannerWrapper = styled.section`
	padding: ${pxToRem(32)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(28)} 0;
	}
`;

const Inner = styled.div`
	background: var(--colour-black);
`;

const MediaWrapper = styled.div`
	grid-column: 1 / 15;
	height: 100%;
	width: 100%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 1 / 13;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	* {
		height: 100%;
		width: 100%;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			height: ${pxToRem(262)};
		}
	}
`;

const ContentWrapper = styled.div`
	grid-column: 15 / -1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${pxToRem(40)};
	padding: ${pxToRem(120)} 10%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: 13 / -1;
		padding: ${pxToRem(100)} 5%;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		align-items: center;
		padding: ${pxToRem(48)} ${pxToRem(40)};
	}
`;

const Title = styled.h4`
	color: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		text-align: center;
	}
`;

const CtaBanner = (props: Props) => {
	const { link, media, title } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<CtaBannerWrapper ref={ref} className="cta-banner">
			<Inner>
				<LayoutGrid>
					<MediaWrapper>
						<MediaStack data={media} />
					</MediaWrapper>
					<ContentWrapper
						className={`view-element-fade-in ${
							inView ? 'view-element-fade-in--in-view' : ''
						}`}
					>
						<Title>{title || ''}</Title>
						{link && (
							<PrimaryButton data={link}>
								{link?.title || ''}
							</PrimaryButton>
						)}
					</ContentWrapper>
				</LayoutGrid>
			</Inner>
		</CtaBannerWrapper>
	);
};

export default CtaBanner;
