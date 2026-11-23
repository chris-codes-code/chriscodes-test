import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

/**
 * Lazy-loads a GSAP scroll module and binds it to a root element.
 * Skips only for reduced-motion — marks ready so CSS FOUC holds clear.
 */
export const useScrollAnimation = (rootRef, importAnimation, exportName) => {
	const animationApi = shallowRef(null);
	let animation = null;
	let element = null;

	onMounted(async () => {
		const root = import.meta.client && rootRef.value;
		if (!root) return;

		const skip = prefersReducedMotion();
		root.setAttribute('data-scroll-reveal', skip ? 'ready' : '');
		if (skip) return;

		const module = await importAnimation();
		animation = (exportName && module[exportName]) || module.default || Object.values(module)[0];
		animation?.init?.(root);
		animationApi.value = animation;
		root.setAttribute('data-scroll-reveal', 'ready');
	});

	onBeforeUnmount(() => {
		element = rootRef.value;
	});

	onUnmounted(() => {
		if (animation && element) animation.cleanup?.(element);
		animationApi.value = null;
	});

	return animationApi;
};
