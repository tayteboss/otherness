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
	filter: blur(2px);
	transform: scale(1.1);

	* {
		pointer-events: none;
	}
`;

const UnderstandBackground = () => {
	return (
		<UnderstandBackgroundWrapper>
			<ShaderGradientCanvas
				importedfiber={{ ...fiber, ...reactSpring, ...drei }}
				style={{
					position: 'absolute',
					top: 0,
					height: '100%',
					width: '100%'
				}}
			>
				<ShaderGradient
					animate="on"
					brightness={0.9}
					cAzimuthAngle={180}
					cDistance={3.6}
					cPolarAngle={90}
					cameraZoom={1}
					color1="#E7907F"
					color2="#137372"
					color3="#B0927A"
					envPreset="dawn"
					grain="off"
					lightType="3d"
					positionX={-1.1}
					positionY={0.9}
					positionZ={0}
					reflection={0}
					rotationX={0}
					rotationY={10}
					rotationZ={50}
					shader="defaults"
					type="plane"
					uDensity={1.3}
					uFrequency={5.5}
					uSpeed={0.05}
					uStrength={10}
					uTime={0}
					wireframe={false}
					zoomOut={false}
					rangeEnd={40}
					rangeStart={0}
					range="disabled"
				/>
			</ShaderGradientCanvas>
		</UnderstandBackgroundWrapper>
	);
};

export default UnderstandBackground;
