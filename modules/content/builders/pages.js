import { consola } from 'consola';
import { fetchPages, fetchPage } from '../fetchers/pages.js';
import { getPageModel } from '../models/page.js';
import { buildContent } from '../utils/build-content.js';
import { toPageSlug, getPageFilename } from '../../../app/utils/page-paths.js';

const buildPages = async (options, locale) => {
	const pages = await fetchPages(locale);

	for (const page of pages) {
		try {
			const pageSlug = toPageSlug(page.link);

			if (!pageSlug) {
				throw new Error('Page missing path property');
			}

			const pageResponse = await fetchPage(locale, pageSlug);
			const pageModel = getPageModel(pageResponse.data);

			const filename = getPageFilename(pageSlug);
			buildContent(`${options.outputDir}/pages`, `${filename}.json`, pageModel);

			consola.info(`👍 Page: ${pageModel.title} content built successfully`);
		} catch (error) {
			consola.error(`❌ Error building Page:`, error.message || error);
		}
	}
};

export { buildPages };
