import { imageModel } from '../../snippets/image.js';

const getAttrs = (entry) => ({
	title: entry?.title || null,
	image: entry?.image || null,
});

const imageContentModel = (entry) => {
	const { title, image } = getAttrs(entry);

	return {
		title,
		image: image ? imageModel(image) : null,
	};
};

export { imageContentModel };
