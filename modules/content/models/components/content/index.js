import { accordionContentModel } from './accordion.js';
import { imageContentModel } from './image.js';
import { masonryContentModel } from './masonry.js';
import { textContentModel } from './text.js';
import { titleContentModel } from './title.js';
import { workContentModel } from './work.js';

const contentMapperModel = (attrs, id, component) => ({
	attrs,
	id,
	component,
});

const contentMapper = {
	accordion: (entry) =>
		contentMapperModel(accordionContentModel(entry), entry.id || 'accordion', 'ContentAccordion'),
	image: (entry) => contentMapperModel(imageContentModel(entry), entry.id || 'image', 'ContentImage'),
	masonry: (entry) =>
		contentMapperModel(masonryContentModel(entry), entry.id || 'masonry', 'ContentMasonry'),
	text: (entry) => contentMapperModel(textContentModel(entry), entry.id || 'text', 'ContentText'),
	title: (entry) => contentMapperModel(titleContentModel(entry), entry.id || 'title', 'ContentTitle'),
	work: (entry) => contentMapperModel(workContentModel(entry), entry.id || 'work', 'ContentWork'),
};

const getContentModel = (content) => {
	const availableEntries = Object.keys(contentMapper);
	const availableContent = content.filter((entry) => availableEntries.includes(entry.layout));

	return availableContent.map((entry) => {
		try {
			return contentMapper[entry.layout](entry);
		} catch (error) {
			console.error(error);
			return contentMapperModel(null, null, null);
		}
	});
};

export { getContentModel };
