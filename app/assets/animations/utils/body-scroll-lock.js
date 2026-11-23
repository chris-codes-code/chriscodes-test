let activeScrollLocks = 0;

const isBodyScrollLocked = () => activeScrollLocks > 0;

const clearDocumentOverflowLock = () => {
	if (!import.meta.client) return;

	document.documentElement.style.overflow = '';
	document.body.style.overflow = '';
};

const lockBodyScroll = () => {
	activeScrollLocks += 1;

	if (activeScrollLocks !== 1) return;

	// Don't set overflow on html/body — it breaks sticky header + mobile scroll.
	clearDocumentOverflowLock();
};

const unlockBodyScroll = () => {
	activeScrollLocks = Math.max(0, activeScrollLocks - 1);

	if (activeScrollLocks !== 0) return;

	clearDocumentOverflowLock();
};

export { isBodyScrollLocked, lockBodyScroll, unlockBodyScroll };
