<script setup>
	import { initTurnstile } from '~/utils/form/init-turnstile';

	const {
		public: { CLOUDFLARE_TURNSTILE_SITE_KEY: siteKey },
	} = useRuntimeConfig();

	const root = ref(null);
	let widgetId = null;
	let pendingToken = null;

	const settleToken = (token) => {
		pendingToken?.resolve(token);
		pendingToken = null;
	};

	const failToken = (error) => {
		pendingToken?.reject(error);
		pendingToken = null;
	};

	const renderWidget = async () => {
		const turnstile = await initTurnstile();
		if (!turnstile || !root.value) {
			throw new Error('Turnstile unavailable');
		}

		if (widgetId !== null) return turnstile;

		widgetId = turnstile.render(root.value, {
			sitekey: siteKey,
			execution: 'execute',
			appearance: 'interaction-only',
			callback: (token) => settleToken(token),
			'error-callback': () => failToken(new Error('Turnstile verification failed')),
		});

		return turnstile;
	};

	const getToken = async () => {
		if (!siteKey || !root.value) return '';

		const turnstile = await renderWidget();

		return new Promise((resolve, reject) => {
			pendingToken = { resolve, reject };
			turnstile.reset(widgetId);
			turnstile.execute(widgetId);
		});
	};

	const reset = () => {
		if (widgetId === null || !window.turnstile) return;
		window.turnstile.reset(widgetId);
	};

	onBeforeUnmount(() => {
		if (pendingToken) failToken(new Error('Turnstile unmounted'));

		if (widgetId === null || !window.turnstile) return;
		window.turnstile.remove(widgetId);
		widgetId = null;
	});

	defineExpose({ getToken, reset });
</script>

<template>
	<div
		v-if="siteKey"
		ref="root"
		class="FormTurnstile"
	/>
</template>
