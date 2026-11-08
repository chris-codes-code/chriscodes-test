import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { lockBodyScroll, unlockBodyScroll } from '~/assets/animations/utils/body-scroll-lock';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const tween = {
	duration: config.duration.secondary,
	ease: config.ease.primary,
};

const getDirection = (modal) => modal?.dataset?.modalDirection || 'ltr';

const getTrayOffset = (direction) => (direction === 'rtl' ? '100%' : '-100%');

const getElements = (modal) => ({
	header: modal.querySelector('.ModalSlideOut__section--header'),
	overlay: modal.querySelector('.ModalSlideOut__overlay'),
	tray: modal.querySelector('.ModalSlideOut__tray'),
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
			direction: getDirection(modal),
			elements: getElements(modal),
			timeline: instance.timeline,
		});
	});
};

const animateModalSlideOut = {
	beforeEnter: (modal) => {
		if (!modal) return;

		lockBodyScroll();

		const { gsap } = getGSAP();
		const instance = ensureInstance(modal);
		const { header, overlay, tray } = getElements(modal);

		instance.context.add(() => {
			gsap.set(overlay, { opacity: 0 });
			gsap.set(tray, { x: getTrayOffset(getDirection(modal)) });
			if (header) gsap.set(header, { opacity: 0 });
		});
	},

	onEnter: (modal, done, callbacks = {}) => {
		runAnimation(modal, done, {
			after: () => callbacks.afterEnter?.(),
			animate: ({ elements, timeline }) => {
				const { header, overlay, tray } = elements;

				timeline.to(overlay, { opacity: 1, ...tween }).to(tray, { x: 0, ...tween }, '<');
				if (header) timeline.to(header, { opacity: 1, ...tween, clearProps: 'opacity' }, '<');
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
			animate: ({ direction, elements, timeline }) => {
				const { header, overlay, tray } = elements;

				timeline.to(overlay, { opacity: 0, ...tween }).to(tray, { x: getTrayOffset(direction), ...tween }, '<');
				if (header) timeline.to(header, { opacity: 0, ...tween }, '<');
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

export { animateModalSlideOut };
