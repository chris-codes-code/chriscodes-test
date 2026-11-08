import { consola } from 'consola';
import { buildSite } from './builders/site.js';
import { buildPages } from './builders/pages.js';
import { buildSiteMap } from './builders/site-map.js';
import { buildLlms } from './builders/llms.js';

const CONTENT_BUILDERS = ['site', 'pages', 'site-map', 'llms'];

const runContentBuild = async (options, requestedContent = []) => {
	const isBuildRequested = (builder) => requestedContent.length === 0 || requestedContent.includes(builder);
	const locale = process.env.DEFAULT_LOCALE || 'en';

	const builder = async (name, generator) => {
		try {
			await generator(options, locale);
			consola.success(`✅ ${name} content built successfully`);
		} catch (error) {
			consola.error(`❌ Error building ${name}:`, error.message || error);
		}
	};

	consola.info('🔄 Building content...');

	if (isBuildRequested('site')) await builder('Site', buildSite);
	if (isBuildRequested('pages')) await builder('Pages', buildPages);
	if (isBuildRequested('site-map')) await builder('Site map', buildSiteMap);
	if (isBuildRequested('llms')) await builder('LLMs', buildLlms);

	consola.success('🎉 Content build process completed');
};

export { CONTENT_BUILDERS, runContentBuild };
