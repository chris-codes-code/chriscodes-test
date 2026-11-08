import { getPagePath } from './page-paths.js';
import { getAbsoluteImageURL } from './absolute-image-url.js';

const SITE_NAME = 'Chris Codes Launch Kit';

const getAttrs = ({ seo, path = '/', image: fallbackImage = null } = {}) => {
	const { SITE_URL } = useRuntimeConfig().public;
	const pagePath = getPagePath(path);

	return {
		title: seo?.title || null,
		description: seo?.description || null,
		image: getAbsoluteImageURL(seo?.image) || getAbsoluteImageURL(fallbackImage),
		noindex: seo?.noindex || false,
		url: SITE_URL ? `${SITE_URL.replace(/\/$/, '')}${pagePath === '/' ? '' : pagePath}` : null,
	};
};

const buildHeadAttrs = (options) => {
	const { title, description, image, noindex, url } = getAttrs(options);
	const meta = [];
	const link = [];

	if (title) {
		meta.push({ property: 'og:title', content: title });
		meta.push({ name: 'twitter:title', content: title });
	}

	if (description) {
		meta.push({ name: 'description', content: description });
		meta.push({ property: 'og:description', content: description });
		meta.push({ name: 'twitter:description', content: description });
	}

	if (image) {
		meta.push({ property: 'og:image', content: image });
		meta.push({ name: 'twitter:image', content: image });
	}

	if (noindex) {
		meta.push({ name: 'robots', content: 'noindex' });
	}

	if (url) {
		meta.push({ property: 'og:url', content: url });
		link.push({ rel: 'canonical', href: url });
	}

	meta.push({ property: 'og:type', content: 'website' });
	meta.push({ property: 'og:site_name', content: SITE_NAME });
	meta.push({ name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' });

	return {
		title,
		link,
		meta,
	};
};

export { buildHeadAttrs };
