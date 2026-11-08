const getAttrs = (seo) => ({
	title: seo?.title || null,
	description: seo?.description || null,
	image: seo?.image || null,
	noindex: seo?.noindex || false,
});

const seoModel = (seo) => {
	const { title, description, image, noindex } = getAttrs(seo);

	return {
		title,
		description,
		image,
		noindex,
	};
};

export { seoModel };
