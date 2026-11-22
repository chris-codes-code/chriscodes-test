import { getMaxColumnHeight } from './get-column-height.js';

export const setContainerHeight = (container, columnHeights) => {
	container.style.height = `${getMaxColumnHeight(columnHeights)}px`;
};
