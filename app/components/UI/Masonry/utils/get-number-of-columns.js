export const getNumberOfColumns = (container, items) => {
	if (!items.length || !items[0].offsetWidth) return 1;

	return Math.max(1, Math.round(container.offsetWidth / items[0].offsetWidth));
};
