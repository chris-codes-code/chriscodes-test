export function useScrollVisibility({
	getActivationDistance = () => 0,
	showThreshold = 10,
	enableSticky = true,
	isActive = () => true,
	scrollActionDisabled = null,
	onShow = null,
	onHide = null,
} = {}) {
	const isVisible = ref(true);
	const isSticky = ref(false);

	let previousScrollY = 0;
	let scrollUpStartY = null;
	let wasSticky = false;
	let wasActive = true;

	const show = ({ snap = false } = {}) => {
		isVisible.value = true;
		onShow?.({ snap });
	};

	const hide = ({ snap = false } = {}) => {
		isVisible.value = false;
		onHide?.({ snap });
	};

	const getScrollY = () => window.scrollY;

	const updateSticky = () => {
		if (!enableSticky) return;

		const scrollY = getScrollY();

		if (scrollY <= 0) isSticky.value = false;
		else if (scrollY > getActivationDistance()) isSticky.value = true;
	};

	const updateVisibility = () => {
		const scrollY = getScrollY();

		if (!isActive()) {
			scrollUpStartY = null;
			wasActive = false;
			if (!isVisible.value) show({ snap: true });
			return;
		}

		const justBecameActive = !wasActive;
		wasActive = true;

		const scrollingDown = scrollY > previousScrollY;
		const pastActivation = scrollY > getActivationDistance();

		if (!pastActivation) {
			scrollUpStartY = null;
			if (!isVisible.value) show();
			return;
		}

		if (scrollingDown) {
			scrollUpStartY = null;
			if (isVisible.value && !justBecameActive) {
				hide({ snap: enableSticky && isSticky.value && !wasSticky });
			}
			return;
		}

		if (isVisible.value) {
			scrollUpStartY = null;
			return;
		}

		if (scrollUpStartY === null) scrollUpStartY = scrollY;

		if (scrollUpStartY - scrollY >= showThreshold) {
			scrollUpStartY = null;
			show();
		}
	};

	const handleScroll = () => {
		const scrollY = getScrollY();

		if (scrollActionDisabled?.value && scrollY !== 0) return;

		updateSticky();
		updateVisibility();
		wasSticky = isSticky.value;
		previousScrollY = scrollY;
	};

	let lenis = null;

	const resetScrollBaseline = () => {
		previousScrollY = getScrollY();
		scrollUpStartY = null;
		wasActive = false;
		updateSticky();
		wasSticky = isSticky.value;
	};

	const bind = () => {
		resetScrollBaseline();

		if (import.meta.client) {
			lenis = useLenis();
		}

		if (lenis) lenis.on('scroll', handleScroll);
		else window.addEventListener('scroll', handleScroll, { passive: true });
	};

	const unbind = () => {
		lenis?.off('scroll', handleScroll);
		window.removeEventListener('scroll', handleScroll, { passive: true });
	};

	return {
		isVisible,
		isSticky,
		show,
		hide,
		bind,
		unbind,
		resetScrollBaseline,
	};
}
