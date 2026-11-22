import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { lockBodyScroll, unlockBodyScroll } from '~/assets/animations/utils/body-scroll-lock';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

// Timing mirrors accordion content open/close
const openTween = {
	duration: config.duration.secondary,
	ease: config.ease.primary,
};

const closeTween = {
	duration: config.duration.primary,
	ease: config.ease.primary,
};

const trayScale = 0.985;
const offsetY = 6;

const getElements = (modal) => ({
	overlay: modal.querySelector('.ModalOverlay__overlay'),
	tray: modal.querySelector('.ModalOverlay__tray'),
});

const ensureInstance = (modal) => {
	let instance = getInstance(modal);

	if (!instance) {
		const { gsap } = getGSAP();
		instance = { context: gsap.context(() => {}, modal), timeline: null };
		setInstance(modal, instance);
	}

	return instance;
};

const runAnimation = (modal, done, { after, animate, before }) => {
	before?.();

	const { gsap } = getGSAP();
	const instance = ensureInstance(modal);

	instance.timeline?.kill();
	instance.timeline = null;

	instance.context.add(() => {
		instance.timeline = gsap.timeline({
			onComplete: () => {
				instance.timeline = null;
				after?.();
				done();
			},
		});

		animate({
			elements: getElements(modal),
			timeline: instance.timeline,
		});
	});
};

const animateModalOverlay = {
	beforeEnter: (modal) => {
		if (!modal) return;

		lockBodyScroll();

		const { gsap } = getGSAP();
		const instance = ensureInstance(modal);
		const { overlay, tray } = getElements(modal);

		instance.context.add(() => {
			gsap.set(overlay, { opacity: 0 });
			gsap.set(tray, {
				opacity: 0,
				scale: trayScale,
				transformOrigin: 'center center',
				y: offsetY,
			});
		});
	},

	onEnter: (modal, done, callbacks = {}) => {
		runAnimation(modal, done, {
			after: () => callbacks.afterEnter?.(),
			animate: ({ elements, timeline }) => {
				const { overlay, tray } = elements;

				timeline
					.to(overlay, { opacity: 1, ...openTween })
					.to(tray, { opacity: 1, scale: 1, y: 0, ...openTween }, '<');
			},
			before: () => callbacks.onEnter?.(),
		});
	},

	onLeave: (modal, done, callbacks = {}) => {
		if (!modal) {
			callbacks.onLeave?.();
			callbacks.afterLeave?.();
			done();
			return;
		}

		runAnimation(modal, done, {
			after: () => callbacks.afterLeave?.(),
			animate: ({ elements, timeline }) => {
				const { overlay, tray } = elements;

				timeline
					.to(overlay, { opacity: 0, ...closeTween })
					.to(tray, { opacity: 0, scale: trayScale, y: offsetY, ...closeTween }, '<');
			},
			before: () => callbacks.onLeave?.(),
		});
	},

	cleanup: (modal) => {
		if (!modal) return;

		getInstance(modal)?.context?.revert();
		deleteInstance(modal);
		unlockBodyScroll();
	},
};

export { animateModalOverlay };
