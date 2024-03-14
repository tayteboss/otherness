import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	mobileMenuIsActive: boolean;
	setMobileMenuIsActive: (value: boolean) => void;
};

const MobileMenuTriggerWrapper = styled.button`
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(14)};
	letter-spacing: 0.96px;
	text-transform: uppercase;
	padding: ${pxToRem(8)};
	display: none;
	color: var(--colour-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const MobileMenuTrigger = (props: Props) => {
	const { mobileMenuIsActive, setMobileMenuIsActive } = props;

	console.log('setMobileMenuIsActive', setMobileMenuIsActive);
	console.log('mobileMenuIsActive', mobileMenuIsActive);
	console.log('props', props);

	return (
		<MobileMenuTriggerWrapper
			onClick={() => setMobileMenuIsActive(!mobileMenuIsActive)}
		>
			{mobileMenuIsActive ? 'Close' : 'Menu'}
		</MobileMenuTriggerWrapper>
	);
};

export default MobileMenuTrigger;
