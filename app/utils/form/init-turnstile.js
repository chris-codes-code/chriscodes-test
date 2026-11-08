const SCRIPT_ID = 'turnstile-script';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let initPromise = null;

const initTurnstile = () => {
	if (import.meta.server) {
		return Promise.reject(new Error('Turnstile is client-only'));
	}

	if (window.turnstile) {
		return Promise.resolve(window.turnstile);
	}

	if (initPromise) return initPromise;

	initPromise = new Promise((resolve, reject) => {
		const fail = (message) => {
			initPromise = null;
			reject(new Error(message));
		};

		const existing = document.getElementById(SCRIPT_ID);

		if (existing) {
			existing.addEventListener(
				'load',
				() => {
					if (window.turnstile) resolve(window.turnstile);
					else fail('Turnstile failed to initialise');
				},
				{ once: true },
			);
			existing.addEventListener('error', () => fail('Failed to load Turnstile'), { once: true });
			return;
		}

		const script = document.createElement('script');
		script.id = SCRIPT_ID;
		script.src = SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.onload = () => {
			if (window.turnstile) resolve(window.turnstile);
			else fail('Turnstile failed to initialise');
		};
		script.onerror = () => fail('Failed to load Turnstile');
		document.head.appendChild(script);
	});

	return initPromise;
};

export { initTurnstile };
