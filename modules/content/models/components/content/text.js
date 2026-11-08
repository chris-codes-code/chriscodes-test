import { formatText } from '../../formatters/text.js';

const getAttrs = (entry) => ({
	title: entry?.title || null,
	text: entry?.text || null,
});

const textContentModel = (entry) => {
	const { title, text } = getAttrs(entry);

	return {
		title,
		text: text ? formatText(text) : null,
	};
};

export { textContentModel };
