import { setIsAnchorScrolling } from '~/assets/animations/utils/anchor-scroll-state';

const animateScrollTo = (target, { offset = 0, immediate = false } = {}) => {
	if (!import.meta.client) return false;

	setIsAnchorScrolling(true);

	const finish = () => {
		setIsAnchorScrolling(false);
	};

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
