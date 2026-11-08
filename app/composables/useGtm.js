import { useCookieConsent } from '~/composables/useCookieConsent.js';
import { getClickId } from '~/utils/gtm-click-id.js';

export function useGtm() {
	const { hasAcceptedCookies } = useCookieConsent();

	const canTrack = () => import.meta.client && Array.isArray(window.dataLayer) && hasAcceptedCookies();

	function trackEvent(payload) {
		if (canTrack()) window.dataLayer.push(payload);
	}

	function trackPageView(path, title) {
		trackEvent({
			event: 'page_view',
			page_path: path,
			page_title: title,
		});
	}

	function trackClick({ clicked_from, type, category, label, url }) {
		const clickId = getClickId({ category, label, url });

		trackEvent({
			event: 'click',
			click_type: type,
			click_category: category,
			click_label: label,
			clicked_from,
			click_url: url,
			...(clickId ? { click_id: clickId } : {}),
		});
	}

	function trackSubmission({ form_name, form_location, status }) {
		trackEvent({
			event: 'form_submit',
			form_name,
			form_submission_status: status,
			...(form_location ? { form_location } : {}),
		});
	}

	return { trackEvent, trackPageView, trackClick, trackSubmission };
}
