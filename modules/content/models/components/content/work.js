import { formatText } from '../../formatters/text.js';
import { imageModel } from '../../snippets/image.js';
import { linkModel } from '../../snippets/link.js';
import { isArrayWithItems } from '../../../utils/helpers.js';

const DEFAULT_IMAGE_WIDTH = 1600;
const DEFAULT_IMAGE_HEIGHT = 900;

const getAttrs = (entry) => ({
	entries: entry?.entries || null,
});

const getEntryAttrs = (entry) => ({
	title: entry?.title || null,
	description: entry?.description || null,
	image: entry?.image || null,
	link: entry?.link || null,
	categories: entry?.categories || null,
	muxPlaybackId: entry?.muxPlaybackId || null,
	vimeo: entry?.vimeo || null,
});

const categoriesModel = (categories) => {
	if (!isArrayWithItems(categories)) return null;

	return categories
		.map((item) => item?.category || item)
		.filter(Boolean);
};

const entryModel = (entry) => {
	const { title, description, image, link, categories, muxPlaybackId, vimeo } = getEntryAttrs(entry);

	return {
		title,
		description: description ? formatText(description) : null,
		image: image
			? imageModel({
					...image,
					width: image.width || DEFAULT_IMAGE_WIDTH,
					height: image.height || DEFAULT_IMAGE_HEIGHT,
				})
			: null,
		link: link
			? linkModel({
					label: link.label || link.text,
					text: link.text || link.label,
					type: link.type || 'external',
					url: link.url,
					target: link.target || '_blank',
					clickedFrom: 'content-work',
				})
			: null,
		categories: categoriesModel(categories),
		muxPlaybackId,
		vimeo,
	};
};

const workContentModel = (entry) => {
	const { entries } = getAttrs(entry);

	return {
		entries: isArrayWithItems(entries) ? entries.map(entryModel) : null,
	};
};

export { workContentModel };
