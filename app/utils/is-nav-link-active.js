const getLinkHash = (url = '') => {
	const hashIndex = url.indexOf('#');

	return hashIndex === -1 ? '' : url.slice(hashIndex);
};

const isNavLinkActive = (link, route) => {
	if (!link?.url || !route) return false;

	const hash = getLinkHash(link.url);

	if (hash) {
		const linkPath = link.url.slice(0, link.url.indexOf('#')) || '/';

		return route.path === linkPath && route.hash === hash;
	}

	return route.path === link.url;
};

export { getLinkHash, isNavLinkActive };
