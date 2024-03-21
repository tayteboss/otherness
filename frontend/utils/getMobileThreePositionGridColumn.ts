const getMobileThreePositionGridColumn = (
	selectPosition: 'left' | 'middle' | 'right'
) => {
	let gridColumn = '';

	if (selectPosition === 'left') {
		gridColumn = 'span 5';
	} else if (selectPosition === 'middle') {
		gridColumn = '1 / -1';
	} else if (selectPosition === 'right') {
		gridColumn = '4 / -1';
	}

	return gridColumn;
};

export default getMobileThreePositionGridColumn;
