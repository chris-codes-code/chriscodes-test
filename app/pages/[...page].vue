<script setup>
	import { buildHeadAttrs } from '~/utils/head-attrs.js';
	import { buildPageSchemas } from '~/utils/page-schema.js';

	const route = useRoute();
	const { SITE_URL } = useRuntimeConfig().public;
	const { hasAcceptedCookies } = useCookieConsent();
	const { trackPageView } = useGtm();

	const { content, hero, seo } = await usePageContent({ path: route.path });

	const schemas = buildPageSchemas({ path: route.path, seo, siteUrl: SITE_URL });

	useHead({
		...buildHeadAttrs({ seo, path: route.path }),
		...(schemas && {
			script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schemas) }],
		}),
	});

	onMounted(() => {
		if (hasAcceptedCookies()) trackPageView(route.fullPath, seo.title);
	});
</script>

<template>
	<div class="Page">
		<Hero
			v-if="hero"
			v-bind="hero"
		/>

		<Content
			v-if="content"
			:content="content"
		/>
	</div>
</template>
