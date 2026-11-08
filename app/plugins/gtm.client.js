import { useCookieConsent } from '~/composables/useCookieConsent.js';
import { initGtm } from '~/utils/gtm.js';

export default defineNuxtPlugin(() => {
	const { hasAcceptedCookies } = useCookieConsent();

	if (hasAcceptedCookies()) initGtm();
});
