export default defineEventHandler((event) => {
	const { SITE_URL, STAGING_MODE } = useRuntimeConfig(event).public;
	const isStaging = STAGING_MODE === 'true';

	setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8');

	let text = isStaging ? 'User-agent: *\nDisallow: /' : 'User-agent: *\nDisallow:';

	if (!isStaging && SITE_URL) {
		text += `\n\nSitemap: ${SITE_URL}/sitemap.xml`;
	}

	return `${text}\n`;
});
