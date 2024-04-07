import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type StyledProps = {
	$divWidth: number;
};

type Props = {
	title: string;
	description: string;
	theme: string;
};

const EditorialCardWrapper = styled.div`
	width: 100%;
`;

const Inner = styled.div<StyledProps>`
	min-height: ${(props) => props.$divWidth}px;
	width: 100%;
	padding: ${pxToRem(24)};
	background: var(--colour-black);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		min-height: unset;
	}

	* {
		color: var(--colour-white);
	}
`;

const Title = styled.h4`
	margin-bottom: ${pxToRem(24)};
`;

const Description = styled.div`
	* {
		font-family: var(--font-classic-grotesque-regular);
		font-size: ${pxToRem(18)};
		line-height: ${pxToRem(25)};
		letter-spacing: 0.9px;
		text-transform: uppercase;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(16)};
			line-height: ${pxToRem(22)};
			letter-spacing: 0.64px;
		}
	}
`;

const DescriptionHTML = styled.div``;

const EditorialCard = (props: Props) => {
	const { title, description } = props;

	const [divWidth, setDivWidth] = useState(0);

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleResize = () => {
			if (ref.current) {
				setDivWidth(ref.current.offsetWidth);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);
	}, []);

	const { ref: ref2, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	const formattedDescription: string = description
		? `<p>${description.replace(/\n/g, '<br />')}</p>`
		: '';

	return (
		<EditorialCardWrapper
			ref={ref}
			className={`editorial-card view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<Inner $divWidth={divWidth} ref={ref2}>
				{title && <Title>{title}</Title>}
				{description && (
					<Description className="type-secondary-heading-medium">
						<DescriptionHTML
							dangerouslySetInnerHTML={{
								__html: formattedDescription
							}}
						/>
					</Description>
				)}
			</Inner>
		</EditorialCardWrapper>
	);
};

export default EditorialCard;
