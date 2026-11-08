const getAttrs = (hero) => ({
	title: hero?.title || null,
});

const heroModel = (hero) => {
	const { title } = getAttrs(hero);

	return {
		title,
	};
};

export { heroModel };
