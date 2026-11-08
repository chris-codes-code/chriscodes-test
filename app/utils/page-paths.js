const indexPagePath = '/home';

const toPageSlug = (path = '') => path.split('?')[0].split('#')[0].replace(/\/$/, '').replace(/^\/+/, '');

const indexSlug = toPageSlug(indexPagePath);

const getPageSlug = (path = '') => toPageSlug(path || indexPagePath);

const getPagePath = (path = '') => {
	const slug = toPageSlug(path);
	if (!slug || slug === indexSlug) return '/';
	return `/${slug}`;
};

const isSamePagePath = (path = '', pathToCompare = '') => getPagePath(path) === getPagePath(pathToCompare);

const escapeSlug = (slug) => slug.replace(/__/g, '____');
const getPageFilename = (path = '') => escapeSlug(getPageSlug(path)).replace(/\//g, '__');

export { indexPagePath, toPageSlug, getPageSlug, getPagePath, isSamePagePath, getPageFilename };
