import { getLenis } from '~/assets/animations/utils/lenis-store';

let activeScrollLocks = 0;

const isBodyScrollLocked = () => activeScrollLocks > 0;

const lockBodyScroll = () => {
	activeScrollLocks += 1;

	if (activeScrollLocks !== 1) return;

	const lenis = getLenis();

	// Prefer Lenis stop — body overflow:hidden breaks position:sticky
	// (header/menu vanish when scrolled). Only clip as a no-Lenis fallback.
	if (lenis) {
		lenis.stop();
	} else {
		document.documentElement.style.overflow = 'clip';
		document.body.style.overflow = 'clip';
	}
};

const unlockBodyScroll = () => {
	activeScrollLocks = Math.max(0, activeScrollLocks - 1);

	if (activeScrollLocks !== 0) return;

	const lenis = getLenis();

	if (lenis) {
		lenis.start();
	} else {
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
	}
};

export { isBodyScrollLocked, lockBodyScroll, unlockBodyScroll };
