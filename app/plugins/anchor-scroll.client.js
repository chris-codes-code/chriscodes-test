import { scrollToAnchor, scrollToTop } from '~/assets/animations/utils/scroll-to-anchor';

export default defineNuxtPlugin(() => {
	const router = useRouter();
	const { closeAll } = useModal();

	const scrollForHash = (hash, { immediate = false, delay = 0 } = {}) => {
		if (!hash) return;

		const run = () => scrollToAnchor(hash, { immediate });

		window.setTimeout(() => {
			requestAnimationFrame(() => {
				if (run()) return;
				window.setTimeout(run, 150);
			});
		}, delay);
	};

	router.isReady().then(() => {
		if (router.currentRoute.value.hash) {
			scrollForHash(router.currentRoute.value.hash, { immediate: true });
		}
	});

	router.afterEach((to, from) => {
		if (to.fullPath === from.fullPath) return;

		if (to.hash) {
			const delay = to.path === from.path ? 40 : 120;
			scrollForHash(to.hash, { delay });
			return;
		}

		// Logo / home link: land at the top after navigating back to `/`.
		if (to.path === '/' && from.path !== '/') {
			window.setTimeout(() => scrollToTop(), 40);
		}
	});

	document.addEventListener(
		'click',
		(event) => {
			const link = event.target.closest('a[href*="#"]');
			if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey) return;

			const href = link.getAttribute('href');
			if (!href || href.startsWith('http')) return;

			const hashIndex = href.indexOf('#');
			if (hashIndex === -1) return;

			const hash = href.slice(hashIndex);
			if (!hash || hash === '#') return;

			const path = href.slice(0, hashIndex) || '/';
			const currentPath = router.currentRoute.value.path;

			if (path !== currentPath) return;

			// Stop the native/Nuxt hash snap and animate with window.scrollTo instead.
			event.preventDefault();
			closeAll();

			if (router.currentRoute.value.hash !== hash) {
				router.push({ path: currentPath, hash });
			} else {
				scrollForHash(hash, { delay: 40 });
			}
		},
		true,
	);
});
