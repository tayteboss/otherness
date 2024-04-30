import styled from 'styled-components';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

const UnderstandBackgroundWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 1;
`;

const UnderstandBackground = () => {
	const shaderUrl =
		'https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23FF8F5E&color2=%23D7C7A1&color3=%23A2A89C&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uDensity=1.3&uFrequency=5.5&uSpeed=0.2&uStrength=4&uTime=0&wireframe=false';

	return (
		<UnderstandBackgroundWrapper>
			<ShaderGradientCanvas
				importedFiber={{ ...fiber, ...drei, ...reactSpring }}
				style={{
					position: 'absolute',
					top: 0,
					height: '100%',
					width: '100%'
				}}
			>
				<ShaderGradient control="query" urlString={shaderUrl} />
			</ShaderGradientCanvas>
		</UnderstandBackgroundWrapper>
	);
};

export default UnderstandBackground;
