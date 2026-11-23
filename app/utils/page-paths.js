const indexPagePath = '/home';

const toPageSlug = (path = '') => path.split('?')[0].split('#')[0].replace(/\/$/, '').replace(/^\/+/, '');

const getPathSuffix = (path = '') => {
	const hashIndex = path.indexOf('#');
	const queryIndex = path.indexOf('?');
	const suffixIndex =
		hashIndex === -1 ? queryIndex : queryIndex === -1 ? hashIndex : Math.min(hashIndex, queryIndex);

	return suffixIndex === -1 ? '' : path.slice(suffixIndex);
};

const indexSlug = toPageSlug(indexPagePath);

const getPageSlug = (path = '') => toPageSlug(path || indexPagePath);

const getPageBasePath = (path = '') => {
	const slug = toPageSlug(path);
	if (!slug || slug === indexSlug) return '/';
	return `/${slug}`;
};

const getPagePath = (path = '') => `${getPageBasePath(path)}${getPathSuffix(path)}`;

const isSamePagePath = (path = '', pathToCompare = '') =>
	getPageBasePath(path) === getPageBasePath(pathToCompare);

const escapeSlug = (slug) => slug.replace(/__/g, '____');
const getPageFilename = (path = '') => escapeSlug(getPageSlug(path)).replace(/\//g, '__');

export { indexPagePath, toPageSlug, getPageSlug, getPagePath, isSamePagePath, getPageFilename };
