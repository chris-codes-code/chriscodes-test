import { getLenis } from '~/assets/animations/utils/lenis-store';

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

	const lenis = getLenis();

	// Pause Lenis only — never set overflow on html/body (breaks sticky + mobile).
	if (lenis) lenis.stop();
	else clearDocumentOverflowLock();
};

const unlockBodyScroll = () => {
	activeScrollLocks = Math.max(0, activeScrollLocks - 1);

	if (activeScrollLocks !== 0) return;

	getLenis()?.start();
	clearDocumentOverflowLock();
};

export { isBodyScrollLocked, lockBodyScroll, unlockBodyScroll };
