let activeScrollLocks = 0;

const lockBodyScroll = () => {
	activeScrollLocks += 1;
	document.body.style.overflow = 'hidden';
};

const unlockBodyScroll = () => {
	activeScrollLocks = Math.max(0, activeScrollLocks - 1);

	if (activeScrollLocks === 0) {
		document.body.style.overflow = '';
	}
};

export { lockBodyScroll, unlockBodyScroll };
