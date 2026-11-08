import { getPagePath } from '../../../../app/utils/page-paths.js';
import { gtmModel } from './gtm.js';

const getAttrs = ({ label, target, text, type, url, clickedFrom } = {}) => ({
	label,
	target,
	text,
	type,
	url,
	clickedFrom,
});

const linkModel = (link) => {
	const { label, target, text, type, url, clickedFrom } = getAttrs(link);

	return {
		gtm: gtmModel.event.click({
			clicked_from: clickedFrom || null,
			type: 'link',
			category: type,
			label,
			url,
		}),
		label,
		target,
		text,
		type,
		url: type === 'internal' ? getPagePath(url) : url,
	};
};

export { linkModel };
