import { fetchSite } from '../fetchers/site.js';
import { getSiteModel } from '../models/site/index.js';
import { buildContent } from '../utils/build-content.js';

const buildSite = async (options, locale) => {
	const response = await fetchSite(locale);
	const model = getSiteModel(response.data);

	buildContent(options.outputDir, 'site.json', model);
};

export { buildSite };
