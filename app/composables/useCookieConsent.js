import { initGtm } from '~/utils/gtm.js';

const COOKIE_NAME = 'cookie_consent';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

const COOKIE_CONSENT = {
	ACCEPTED: 'accepted',
	ESSENTIAL: 'essential',
};

export function useCookieConsent() {
	const cookie = useCookie(COOKIE_NAME, {
		maxAge: COOKIE_MAX_AGE,
		path: '/',
		sameSite: 'lax',
		secure: !import.meta.dev,
		default: () => null,
	});

	const showCookies = ref(false);

	function hasAcceptedCookies() {
		return cookie.value === COOKIE_CONSENT.ACCEPTED;
	}

	function accept() {
		cookie.value = COOKIE_CONSENT.ACCEPTED;
		showCookies.value = false;
		return initGtm();
	}

	function decline() {
		cookie.value = COOKIE_CONSENT.ESSENTIAL;
		showCookies.value = false;
	}

	function showCookiesAfterDelay(delay) {
		if (!cookie.value) {
			setTimeout(() => {
				showCookies.value = true;
			}, delay);
		}
	}

	return {
		accept,
		decline,
		hasAcceptedCookies,
		showCookies,
		showCookiesAfterDelay,
	};
}
