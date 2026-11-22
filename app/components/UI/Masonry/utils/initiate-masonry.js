import { buildColumnHeightsArray } from './build-column-heights-array.js';
import { getMasonryElements } from './get-masonry-elements.js';
import { getMinColumnHeight } from './get-column-height.js';
import { getNumberOfColumns } from './get-number-of-columns.js';
import { setContainerHeight } from './set-container-height.js';
import { setItemPosition } from './set-item-position.js';

let windowWidth;

export const initiateMasonry = (container, { force = false } = {}) => {
	if (!container) return;
	if (windowWidth === window.innerWidth && !force) return;

	const { items } = getMasonryElements(container);
	if (!items.length) return;

	const numberOfColumns = getNumberOfColumns(container, items);
	const columnHeights = buildColumnHeightsArray(numberOfColumns);

	items.forEach((item) => {
		const minColumnHeight = getMinColumnHeight(columnHeights);
		const columnIndex = columnHeights.indexOf(minColumnHeight);

		setItemPosition(item, minColumnHeight, columnIndex, numberOfColumns);
		columnHeights[columnIndex] = minColumnHeight + item.offsetHeight;
	});

	windowWidth = window.innerWidth;
	setContainerHeight(container, columnHeights);
};
