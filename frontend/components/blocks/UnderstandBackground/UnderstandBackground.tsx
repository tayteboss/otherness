import styled from 'styled-components';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';
import { useInView } from 'react-intersection-observer';

const UnderstandBackgroundWrapper = styled.div<{ $isActive: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 1;
	pointer-events: none;
	filter: blur(2px);
	transform: scale(1.1);
	opacity: ${(props) => (props.$isActive ? 1 : 0)};

	transition: all var(--transition-speed-slow) var(--transition-ease);
	transition-delay: 1000ms;

	* {
		pointer-events: none;
	}
`;

const UnderstandBackground = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<UnderstandBackgroundWrapper ref={ref} $isActive={inView}>
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
					color1="#f4e7cf"
					color2="#85b6c4"
					color3="#4a6b2d"
					envPreset="lobby"
					frameRate={10}
					grain="off"
					lightType="3d"
					positionX={-1.4}
					positionY={0}
					positionZ={0}
					range="disabled"
					rangeEnd={20.2}
					rangeStart={11.6}
					rotationX={0}
					rotationY={10}
					rotationZ={50}
					shader="defaults"
					toggleAxis={false}
					type="waterPlane"
					uAmplitude={1}
					uDensity={1.4}
					uFrequency={5.5}
					uSpeed={0.1}
					uStrength={1.7}
					uTime={11.6}
					wireframe={false}
				/>
			</ShaderGradientCanvas>
		</UnderstandBackgroundWrapper>
	);
};

export default UnderstandBackground;
