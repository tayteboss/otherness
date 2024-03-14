import styled from 'styled-components';

const HomeHeroWrapper = styled.section`
	height: calc(100vh - var(--header-h));
	background: papayawhip;
`;

const HomeHero = () => {
	return <HomeHeroWrapper>HomeHero</HomeHeroWrapper>;
};

export default HomeHero;
