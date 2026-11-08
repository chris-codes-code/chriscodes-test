import { consola } from 'consola';
import { fetchSite } from '../fetchers/site.js';
import { fetchPages, fetchPage } from '../fetchers/pages.js';
import { getSiteModel } from '../models/site/index.js';
import { getPageModel } from '../models/page.js';
import { getLlmsModel } from '../models/llms.js';
import { buildContent } from '../utils/build-content.js';
import { toPageSlug, getPagePath } from '../../../app/utils/page-paths.js';

const buildLlms = async (options, locale) => {
	const siteResponse = await fetchSite(locale);
	const site = getSiteModel(siteResponse.data);
	const pages = await fetchPages(locale);
	const llmsPages = [];

	for (const page of pages) {
		try {
			if (page.noindex) continue;

			const pageSlug = toPageSlug(page.link);

			if (!pageSlug) {
				throw new Error('Page missing path property');
			}

			const pageResponse = await fetchPage(locale, pageSlug);
			const pageModel = getPageModel(pageResponse.data);

			llmsPages.push({
				loc: getPagePath(page.link),
				title: pageModel.title,
				description: pageModel.seo.description,
			});
		} catch (error) {
			consola.error(`❌ Error building LLMs page:`, error.message || error);
		}
	}

	const model = getLlmsModel({ seo: site.seo, pages: llmsPages });
	buildContent(options.outputDir, 'llms.json', model);

	consola.info(`👍 LLMs content built successfully`);
};

export { buildLlms };
