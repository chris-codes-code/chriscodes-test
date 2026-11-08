import { getPagePath } from './page-paths.js';
import { getAbsoluteImageURL } from './absolute-image-url.js';

const SITE_NAME = 'Chris Codes Launch Kit';

const siteBase = (siteUrl) => {
	const base = typeof siteUrl === 'string' ? siteUrl.replace(/\/$/, '') : '';
	return base || null;
};

const pageURL = (base, path = '/') => {
	const pagePath = getPagePath(path);
	return `${base}${pagePath === '/' ? '' : pagePath}`;
};

/** Lean default: Organization + WebSite + WebPage. Extend per-project as needed. */
export function buildPageSchemas({ path = '/', seo = null, siteUrl = '' } = {}) {
	const base = siteBase(siteUrl);
	if (!base || seo?.noindex) return null;

	const url = pageURL(base, path);
	const homeURL = pageURL(base, '/');
	const image = getAbsoluteImageURL(seo?.image);

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${base}/#organization`,
				name: SITE_NAME,
				url: homeURL,
				logo: { '@type': 'ImageObject', url: `${base}/apple-touch-icon.png` },
			},
			{
				'@type': 'WebSite',
				'@id': `${base}/#website`,
				name: SITE_NAME,
				url: homeURL,
				publisher: { '@id': `${base}/#organization` },
			},
			{
				'@type': 'WebPage',
				'@id': `${url}#webpage`,
				url,
				name: seo?.title || null,
				description: seo?.description || null,
				isPartOf: { '@id': `${base}/#website` },
				...(image && { primaryImageOfPage: { '@type': 'ImageObject', url: image } }),
			},
		],
	};
}
