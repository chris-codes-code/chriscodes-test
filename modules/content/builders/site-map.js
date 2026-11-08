import { consola } from 'consola';
import { fetchPages } from '../fetchers/pages.js';
import { getSiteMapModel } from '../models/site-map.js';
import { buildContent } from '../utils/build-content.js';

const buildSiteMap = async (options, locale) => {
	const pages = await fetchPages(locale);
	const siteMapModel = getSiteMapModel({ pages });

	buildContent(options.outputDir, 'site-map.json', siteMapModel);

	consola.info(`👍 Site map built successfully`);
};

export { buildSiteMap };
