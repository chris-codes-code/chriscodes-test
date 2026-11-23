import { setIsAnchorScrolling } from '~/assets/animations/utils/anchor-scroll-state';
import { getLenis } from '~/assets/animations/utils/lenis-store';

const animateScrollTo = (target, { offset = 0, immediate = false } = {}) => {
	if (!import.meta.client) return false;

	const lenis = getLenis();

	setIsAnchorScrolling(true);

	const finish = () => {
		setIsAnchorScrolling(false);
	};

	if (lenis) {
		if (lenis.isStopped) lenis.start();

		lenis.scrollTo(target, {
			offset,
			immediate,
			force: true,
			duration: immediate ? undefined : 1.35,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			lock: !immediate,
			onComplete: finish,
		});

		if (immediate) finish();

		return true;
	}

	const top =
		typeof target === 'number'
			? target + offset
			: target.getBoundingClientRect().top + window.scrollY + offset;

	window.scrollTo({
		top,
		behavior: immediate ? 'auto' : 'smooth',
	});

	if (immediate) {
		finish();
	} else {
		const onScrollEnd = () => {
			window.removeEventListener('scrollend', onScrollEnd);
			window.clearTimeout(fallbackId);
			finish();
		};

		window.addEventListener('scrollend', onScrollEnd, { once: true });
		const fallbackId = window.setTimeout(onScrollEnd, 1000);
	}

	return true;
};

const scrollToTop = ({ immediate = false } = {}) => animateScrollTo(0, { immediate });

const scrollToAnchor = (hash, { immediate = false } = {}) => {
	if (!hash || hash === '#') return false;

	const id = hash.startsWith('#') ? hash.slice(1) : hash;
	const target = document.getElementById(id);

	if (!target) return false;

	return animateScrollTo(target, { immediate });
};

export { scrollToAnchor, scrollToTop };
