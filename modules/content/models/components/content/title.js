const getAttrs = (entry) => ({
	title: entry?.title || null,
	direction: entry?.direction || 'left',
	level: entry?.level || 'h2',
	color: entry?.color || null,
});

const titleContentModel = (entry) => {
	const { title, direction, level, color } = getAttrs(entry);

	return {
		title,
		direction,
		level,
		color,
	};
};

export { titleContentModel };
