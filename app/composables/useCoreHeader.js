import {
	getIsAnchorScrolling,
	onAnchorScrollingChange,
} from '~/assets/animations/utils/anchor-scroll-state';

export const coreHeaderContext = Symbol('coreHeaderContext');

export function useCoreHeader(headerRef) {
	const isSnap = ref(false);
	const isAnchorScrolling = ref(getIsAnchorScrolling());
	const { isHeaderPanelOpen } = useModal();

	const { isVisible, isSticky, show, bind, unbind } = useScrollVisibility({
		getActivationDistance: () => headerRef.value?.offsetHeight || 0,
		showThreshold: 50,
		enableSticky: true,
		// Keep the island visible while the panel is open or nav is scrolling
		// to a section (programmatic scroll would otherwise hide it).
		isActive: () => !isHeaderPanelOpen.value && !isAnchorScrolling.value,
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

	watch(isHeaderPanelOpen, (isOpen) => {
		if (isOpen) show({ snap: true });
	});

	watch(isAnchorScrolling, (scrolling) => {
		if (scrolling) show({ snap: true });
	});

	onMounted(() => {
		bind();

		const stopWatchingAnchorScroll = onAnchorScrollingChange((value) => {
			isAnchorScrolling.value = value;
		});

		onUnmounted(stopWatchingAnchorScroll);
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
