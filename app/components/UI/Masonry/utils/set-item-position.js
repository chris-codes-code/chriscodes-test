export const setItemPosition = (item, minColumnHeight, columnIndex, numberOfColumns) => {
	item.style.top = `${minColumnHeight}px`;
	item.style.left = `${columnIndex * (100 / numberOfColumns)}%`;
};
