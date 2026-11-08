/**
 * Maps a tracked click payload to a stable click_id for GTM / GA4 triggers.
 * Returns undefined for ordinary navigation so only conversion-intent clicks are tagged.
 * Extend with project-specific category / URL rules as needed.
 */
export function getClickId({ category, url } = {}) {
	const clickCategory = typeof category === 'string' ? category : '';
	const clickUrl = typeof url === 'string' ? url : '';
	const normalisedUrl = clickUrl.toLowerCase();

	if (clickCategory === 'open_form') return 'open_enquiry_form';

	if (normalisedUrl.startsWith('mailto:')) return 'email';
	if (normalisedUrl.startsWith('tel:')) return 'phone';
	if (/\.pdf(?:$|[?#])/.test(normalisedUrl)) return 'download_pdf';

	return undefined;
}
