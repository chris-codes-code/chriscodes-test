const prefersReducedMotion = () => {
	if (typeof window === 'undefined') return true;

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Touch-first devices — native scroll (no Lenis) and no companion pointer tracking.
const prefersNativeScroll = () => {
	if (typeof window === 'undefined') return true;

	return window.matchMedia('(pointer: coarse)').matches;
};

export { prefersNativeScroll, prefersReducedMotion };
