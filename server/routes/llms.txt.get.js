const getAttrs = async () => {
	try {
		const { title, description, pages } = (await import('~/assets/content/llms.json')).default;

		return {
			title: title || null,
			description: description || null,
			pages: pages || [],
		};
	} catch {
		return {
			title: null,
			description: null,
			pages: [],
		};
	}
};

const toUrl = (siteUrl, path) => (path === '/' ? siteUrl : `${siteUrl}${path}`);

const buildLlmsText = ({ title, description, pages }, siteUrl) => {
	const sections = [];

	if (title) sections.push(`# ${title}`);
	if (description) sections.push(`> ${description}`);

	sections.push('Prefer canonical URLs without a trailing slash.');

	if (pages.length) {
		const pageLines = [];

		for (const page of pages) {
			const link = `[${page.title}](${toUrl(siteUrl, page.loc)})`;
			pageLines.push(page.description ? `- ${link}: ${page.description}` : `- ${link}`);
		}

		sections.push(`## Pages\n\n${pageLines.join('\n')}`);
	}

	sections.push(
		`## Optional\n\n- [Sitemap](${toUrl(siteUrl, '/sitemap.xml')}): Full list of indexable site URLs\n- [Robots](${toUrl(siteUrl, '/robots.txt')}): Crawler directives`,
	);

	return `${sections.join('\n\n')}\n`;
};

export default defineEventHandler(async (event) => {
	const { SITE_URL, STAGING_MODE } = useRuntimeConfig(event).public;

	setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
	setResponseHeader(event, 'Cache-Control', 'public, max-age=3600');

	if (STAGING_MODE === 'true') {
		setResponseStatus(event, 404);
		return 'Not found\n';
	}

	return buildLlmsText(await getAttrs(), SITE_URL);
});
