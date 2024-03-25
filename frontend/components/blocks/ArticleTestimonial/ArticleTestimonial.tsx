import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';

type Props = {
	testimonial: string;
};

const ArticleTestimonialWrapper = styled.section``;

const ArticleTestimonial = (props: Props) => {
	const { testimonial } = props;

	const formattedTestimonial: string = `<p>${testimonial.replace(
		/\n/g,
		'<br />'
	)}</p>`;

	return (
		<ArticleTestimonialWrapper>
			<LayoutWrapper>
				<LayoutGrid>hello</LayoutGrid>
			</LayoutWrapper>
		</ArticleTestimonialWrapper>
	);
};

export default ArticleTestimonial;
