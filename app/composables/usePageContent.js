import { useRuntimeConfig } from '#app';
import { consola } from 'consola';
import { getPageModel } from '../../modules/content/models/page';
import { getPageSlug, getPageFilename, indexPagePath } from '~/utils/page-paths';

export const usePageContent = async ({ locale, path } = {}) => {
	try {
		const config = useRuntimeConfig();
		const { API_URL, DEFAULT_LOCALE, SSR_ENABLED } = config.public;
		const ssrEnabled = SSR_ENABLED === 'true';
		const setPath = path === '/' ? indexPagePath : path;
		const filename = getPageFilename(setPath);

		if (ssrEnabled) {
			const data = await import(`~/assets/content/pages/${filename}.json`);
			return data.default;
		}

		const { data } = await $fetch(`${API_URL}/${locale || DEFAULT_LOCALE}/content/page/${getPageSlug(setPath)}`);
		return getPageModel(data);
	} catch (error) {
		consola.error('#usePageContent: failed to load page content', error);
		throw createError({
			statusCode: 404,
			statusMessage: 'Page not found',
			fatal: true,
		});
	}
};
