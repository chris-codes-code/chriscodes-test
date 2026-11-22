const prefersReducedMotion = () => {
	if (typeof window === 'undefined') return true;

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Touch-first devices — Lenis feels glitchy on mobile, prefer native scroll.
const prefersNativeScroll = () => {
	if (typeof window === 'undefined') return true;

	return window.matchMedia('(pointer: coarse)').matches;
};

export { prefersNativeScroll, prefersReducedMotion };
