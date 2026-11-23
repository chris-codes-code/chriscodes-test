import {
	getIsAnchorScrolling,
	onAnchorScrollingChange,
} from '~/assets/animations/utils/anchor-scroll-state';

export const coreHeaderContext = Symbol('coreHeaderContext');

export function useCoreHeader(headerRef) {
	const isSnap = ref(false);
	const isAnchorScrolling = ref(getIsAnchorScrolling());
	const { isHeaderPanelOpen } = useModal();
	// Hold scroll-hide until the first-load intro finishes so load/Lenis jitter
	// can’t tuck the island away right after it animates in.
	const introLocked = ref(true);

	const { isVisible, isSticky, show, bind, unbind, resetScrollBaseline } = useScrollVisibility({
		getActivationDistance: () => headerRef.value?.offsetHeight || 0,
		showThreshold: 50,
		enableSticky: true,
		// Keep the island visible while the panel is open, nav is scrolling to a
		// section, or the first-load intro is still owning visibility.
		isActive: () => !isHeaderPanelOpen.value && !isAnchorScrolling.value && !introLocked.value,
		onShow: () => {
			isSnap.value = false;
		},
		onHide: ({ snap }) => {
			isSnap.value = snap;
		},
	});

	const releaseIntroLock = () => {
		if (!introLocked.value) return;

		introLocked.value = false;
		show({ snap: true });
		resetScrollBaseline();
	};

	provide(coreHeaderContext, {
		isSticky,
		isVisible,
		isSnap,
		show,
		releaseIntroLock,
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
		releaseIntroLock,
	};
}

export function useCoreHeaderContext() {
	return inject(coreHeaderContext, {
		isSticky: ref(false),
		isVisible: ref(true),
		isSnap: ref(false),
		show: () => {},
		releaseIntroLock: () => {},
	});
}
