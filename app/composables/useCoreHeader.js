export const coreHeaderContext = Symbol('coreHeaderContext');

export function useCoreHeader(headerRef) {
	const isSnap = ref(false);

	const { isVisible, isSticky, show, bind, unbind } = useScrollVisibility({
		getActivationDistance: () => headerRef.value?.offsetHeight || 0,
		showThreshold: 250,
		enableSticky: true,
		onShow: () => {
			isSnap.value = false;
		},
		onHide: ({ snap }) => {
			isSnap.value = snap;
		},
	});

	provide(coreHeaderContext, {
		isSticky,
		isVisible,
		isSnap,
		show,
	});

	onMounted(() => {
		bind();
	});

	onUnmounted(() => {
		unbind();
	});

	return {
		isSticky,
		isVisible,
		isSnap,
		show,
	};
}

export function useCoreHeaderContext() {
	return inject(coreHeaderContext, {
		isSticky: ref(false),
		isVisible: ref(true),
		isSnap: ref(false),
		show: () => {},
	});
}
