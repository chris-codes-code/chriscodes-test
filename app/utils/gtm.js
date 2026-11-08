/**
 * Loads the GTM script and noscript fallback. Call once after cookie consent.
 * Returns a Promise that resolves when the script has loaded.
 */
export function initGtm() {
	if (import.meta.server) return Promise.resolve();

	const config = useRuntimeConfig();
	const gtmId = config.public.GTM_ID;
	if (!gtmId) return Promise.resolve();
	if (document.getElementById('gtm-script')) return Promise.resolve();

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

	const script = document.createElement('script');
	script.id = 'gtm-script';
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;

	const loaded = new Promise((resolve) => {
		script.onload = () => resolve();
		script.onerror = () => resolve();
	});

	document.head.appendChild(script);

	const noscript = document.createElement('noscript');
	const iframe = document.createElement('iframe');
	iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
	iframe.height = '0';
	iframe.width = '0';
	iframe.style.display = 'none';
	iframe.style.visibility = 'hidden';
	noscript.appendChild(iframe);
	document.body.insertBefore(noscript, document.body.firstChild);

	return loaded;
}
