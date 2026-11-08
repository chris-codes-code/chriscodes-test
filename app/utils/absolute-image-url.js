const isAbsoluteURL = (url) => typeof url === 'string' && /^https?:\/\//i.test(url);

export function getAbsoluteImageURL(image) {
	if (!image) return null;

	const src = typeof image === 'string' ? image : image.src || image.url || null;
	return isAbsoluteURL(src) ? src : null;
}
