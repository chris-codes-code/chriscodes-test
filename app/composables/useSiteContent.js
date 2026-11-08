import { useRuntimeConfig } from '#app';
import { consola } from 'consola';
import { getSiteModel } from '../../modules/content/models/site/index';

export const useSiteContent = async ({ locale } = {}) => {
	try {
		const config = useRuntimeConfig();
		const { API_URL, DEFAULT_LOCALE, SSR_ENABLED } = config.public;
		const ssrEnabled = SSR_ENABLED === 'true';

		if (ssrEnabled) {
			const data = await import('~/assets/content/site.json');

			return data.default;
		}

		const { data } = await $fetch(`${API_URL}/${locale || DEFAULT_LOCALE}/content/site`);
		return getSiteModel(data);
	} catch (error) {
		consola.error('#useSiteContent: failed to load site content', error);
		throw createError({
			statusCode: 500,
			statusMessage: 'There was an issue',
			fatal: true,
		});
	}
};
