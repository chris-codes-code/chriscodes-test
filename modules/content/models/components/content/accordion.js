import { accordionModel } from '../ui/accordion.js';

const getAttrs = (entry) => ({
	title: entry?.title || null,
	entries: entry?.entries || null,
});

const accordionContentModel = (entry) => {
	const { title, entries } = getAttrs(entry);
	const accordion = accordionModel({ entries }, 'content-accordion');

	return {
		title,
		entries: accordion.entries,
	};
};

export { accordionContentModel };
