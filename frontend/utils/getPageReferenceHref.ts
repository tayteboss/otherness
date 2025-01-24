const getPageReferenceHref = (
	ref: string | { _type: string; slug: { current: string } },
	useProject = false
) => {
	if (useProject) {
		if (typeof ref !== 'string' && ref._type === 'project') {
			return `work/${ref.slug.current}`;
		}
		if (typeof ref !== 'string' && ref._type === 'article') {
			return `conversations/${ref.slug.current}`;
		}

		return '/';
	}

	if (ref === 'whatToExpectPage') {
		return '/working-together';
	} else if (ref === 'contactPage') {
		return '/contact';
	} else if (ref === 'conversationsPage') {
		return '/conversations';
	} else if (ref === 'workPage') {
		return '/work';
	} else {
		return '/';
	}
};

export default getPageReferenceHref;
