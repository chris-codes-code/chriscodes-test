import { formatText } from '../../formatters/text.js';
import { imageModel } from '../../snippets/image.js';

const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 800;

const getAttrs = (entry) => ({
	items: entry?.items || [],
});

const itemModel = (item, index) => ({
	id: item?.id || `masonry-item-${index}`,
	title: item?.title || null,
	text: item?.text ? formatText(item.text) : null,
	body: item?.body ? formatText(item.body) : item?.description ? formatText(item.description) : null,
	image: item?.image
		? imageModel({
				...item.image,
				width: item.image.width || DEFAULT_IMAGE_WIDTH,
				height: item.image.height || DEFAULT_IMAGE_HEIGHT,
			})
		: null,
});

const masonryContentModel = (entry) => {
	const { items } = getAttrs(entry);

	return {
		items: items.map(itemModel),
	};
};

export { masonryContentModel };
