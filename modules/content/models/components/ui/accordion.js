import { linkModel } from '../../snippets/link.js';
import { isArrayWithItems } from '../../../utils/helpers.js';
import { formatText } from '../../formatters/text.js';

const getAttrs = (accordion) => ({
	entries: accordion?.entries || null,
});

const getEntryAttrs = (entry) => ({
	title: entry?.title || null,
	text: entry?.text || null,
	link: entry?.link || null,
});

const entriesModel = (entries, clickedFrom) =>
	entries.map((entry) => {
		const { title, text, link } = getEntryAttrs(entry);

		return {
			title,
			text: text ? formatText(text) : null,
			link: link ? linkModel({ ...link, clickedFrom }) : null,
		};
	});

const accordionModel = (accordion, clickedFrom) => {
	const { entries } = getAttrs(accordion);

	return {
		entries: isArrayWithItems(entries) ? entriesModel(entries, clickedFrom) : null,
	};
};

export { accordionModel };
