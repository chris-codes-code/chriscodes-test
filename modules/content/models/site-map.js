import { getPagePath } from '../../../app/utils/page-paths.js';
import { isArrayWithItems } from '../utils/helpers.js';

const locModel = ({ loc, modified } = {}) => ({
	loc,
	...(modified && { lastmod: `${modified}Z` }),
});

const pageLocModel = ({ link, modified } = {}) => locModel({ loc: getPagePath(link), modified });

const getPagesLocs = (pages) =>
	isArrayWithItems(pages) ? pages.filter((page) => !page.noindex).map(pageLocModel) : [locModel({ loc: '/' })];

const getSiteMapModel = ({ pages = [] } = {}) => getPagesLocs(pages);

export { getSiteMapModel };
