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
	pointer-events: none;

	* {
		pointer-events: none;
	}
`;

const UnderstandBackground = () => {
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
				<ShaderGradient
					animate="on"
					brightness={1}
					cAzimuthAngle={180}
					cDistance={3.6}
					cPolarAngle={90}
					cameraZoom={1}
					color1="#FF8F5E"
					color2="#D7C7A1"
					color3="#A2A89C"
					envPreset="city"
					grain="off"
					lightType="3d"
					positionX={-1.4}
					positionY={0}
					positionZ={0}
					reflection={0.1}
					rotationX={0}
					rotationY={10}
					rotationZ={50}
					shader="defaults"
					type="plane"
					uDensity={1.3}
					uFrequency={5.5}
					uSpeed={0.1}
					uStrength={4}
					uTime={0}
					wireframe={false}
					zoomOut={false}
				/>
			</ShaderGradientCanvas>
		</UnderstandBackgroundWrapper>
	);
};

export default UnderstandBackground;
