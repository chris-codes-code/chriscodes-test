const prefersReducedMotion = () => {
	if (typeof window === 'undefined') return true;

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Touch-first devices — e.g. skip companion pointer look-at.
const prefersNativeScroll = () => {
	if (typeof window === 'undefined') return true;

	return window.matchMedia('(pointer: coarse)').matches;
};

export { prefersNativeScroll, prefersReducedMotion };
