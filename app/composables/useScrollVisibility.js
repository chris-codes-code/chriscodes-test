export function useScrollVisibility({
	getActivationDistance = () => 0,
	showThreshold = 250,
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

	const updateSticky = () => {
		if (!enableSticky) return;

		if (window.scrollY <= 0) isSticky.value = false;
		else if (window.scrollY > getActivationDistance()) isSticky.value = true;
	};

	const updateVisibility = () => {
		if (!isActive()) {
			scrollUpStartY = null;
			wasActive = false;
			if (!isVisible.value) show({ snap: true });
			return;
		}

		const justBecameActive = !wasActive;
		wasActive = true;

		const scrollingDown = window.scrollY > previousScrollY;
		const pastActivation = window.scrollY > getActivationDistance();

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

		if (scrollUpStartY === null) scrollUpStartY = window.scrollY;

		if (scrollUpStartY - window.scrollY >= showThreshold) {
			scrollUpStartY = null;
			show();
		}
	};

	const handleScroll = () => {
		if (scrollActionDisabled?.value && window.scrollY !== 0) return;

		updateSticky();
		updateVisibility();
		wasSticky = isSticky.value;
		previousScrollY = window.scrollY;
	};

	const bind = () => {
		previousScrollY = window.scrollY;
		updateSticky();
		wasSticky = isSticky.value;
		window.addEventListener('scroll', handleScroll, { passive: true });
	};

	const unbind = () => {
		window.removeEventListener('scroll', handleScroll, { passive: true });
	};

	return {
		isVisible,
		isSticky,
		show,
		hide,
		bind,
		unbind,
	};
}
