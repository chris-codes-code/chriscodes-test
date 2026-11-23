import { prefersNativeScroll, prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

/**
 * Lazy-loads a GSAP animation module and binds it to a root element.
 * Follows the house pattern in assets/animations/README.md.
 *
 * On touch devices we skip scroll-reveals entirely — the opacity:0 holding
 * state + blur tweens were making mobile scroll feel broken / late.
 */
export const useScrollAnimation = (rootRef, importAnimation, exportName) => {
	const animationApi = shallowRef(null);
	let animation = null;
	let element = null;

	onMounted(async () => {
		if (!import.meta.client || !rootRef.value) return;

		const root = rootRef.value;

		if (prefersReducedMotion() || prefersNativeScroll()) return;

		root.setAttribute('data-scroll-reveal', '');

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
