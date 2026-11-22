import type { RouterConfig } from '@nuxt/schema';

// Disable Nuxt's default hash snap — anchors are animated via Lenis.
export default {
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) return false;

		if (savedPosition) return savedPosition;

		if (to.path === from.path) return false;

		return { top: 0, left: 0 };
	},
} satisfies RouterConfig;
