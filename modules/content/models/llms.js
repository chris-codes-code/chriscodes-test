import { isArrayWithItems } from '../utils/helpers.js';

const llmsPageModel = ({ loc, title, description } = {}) => ({
	loc: loc || '/',
	title: title || null,
	description: description || null,
});

const getLlmsModel = ({ seo, pages = [] } = {}) => ({
	title: seo?.title || null,
	description: seo?.description || null,
	pages: isArrayWithItems(pages) ? pages.map(llmsPageModel) : [],
});

export { getLlmsModel };
