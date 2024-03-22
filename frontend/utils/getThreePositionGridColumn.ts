const getThreePositionGridColumn = (
	selectPosition: 'left' | 'middle' | 'right'
) => {
	let gridColumn = '';

	if (selectPosition === 'left') {
		gridColumn = '1 / span 8';
	} else if (selectPosition === 'middle') {
		gridColumn = '9 / -9';
	} else if (selectPosition === 'right') {
		gridColumn = '-9 / span 8';
	} else {
		gridColumn = '1 / span 8';
	}

	return gridColumn;
};

export default getThreePositionGridColumn;
