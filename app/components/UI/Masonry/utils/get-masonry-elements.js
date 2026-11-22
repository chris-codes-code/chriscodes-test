export const getMasonryElements = (container) => ({
	container,
	items: [...container.querySelectorAll('.UIMasonryItem')],
});
