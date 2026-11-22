import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const getRows = (element) => element.querySelectorAll('.ContentWork__entries');

const animateContentWork = {
	init: (element) => {
		if (!element || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger } = getGSAP();
		const rows = getRows(element);

		if (!rows.length) return;

		let scrollTween = null;

		const context = gsap.context(() => {
			gsap.set(rows, {
				opacity: 0,
				y: 72,
				scale: 0.96,
				filter: 'blur(8px)',
				transformOrigin: '50% 80%',
			});

			scrollTween = gsap.to(rows, {
				opacity: 1,
				y: 0,
				scale: 1,
				filter: 'blur(0px)',
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				stagger: 0.14,
				scrollTrigger: {
					trigger: element,
					start: config.scroll.start,
					end: config.scroll.end,
					toggleActions: config.scroll.toggleActions,
				},
			});
		}, element);

		setInstance(element, { context, modalTween: null, scrollTween });
		ScrollTrigger.refresh();
	},

	out: (element) => {
		if (!element || prefersReducedMotion()) return;

		const instance = getInstance(element);
		const rows = getRows(element);
		if (!instance || !rows.length) return;

		const { gsap } = getGSAP();

		instance.scrollTween?.scrollTrigger?.disable(false);
		instance.modalTween?.kill();

		instance.context.add(() => {
			instance.modalTween = gsap.to(rows, {
				opacity: 0,
				y: 48,
				scale: 0.96,
				filter: 'blur(10px)',
				duration: config.duration.outro,
				ease: config.ease.outro,
				stagger: 0.08,
			});
		});
	},

	in: (element) => {
		if (!element || prefersReducedMotion()) return;

		const instance = getInstance(element);
		const rows = getRows(element);
		if (!instance || !rows.length) return;

		const { gsap } = getGSAP();

		instance.modalTween?.kill();

		instance.context.add(() => {
			instance.modalTween = gsap.to(rows, {
				opacity: 1,
				y: 0,
				scale: 1,
				filter: 'blur(0px)',
				duration: config.duration.reveal * 0.85,
				ease: config.ease.reveal,
				stagger: 0.1,
				onComplete: () => {
					instance.scrollTween?.progress(1);
					instance.scrollTween?.scrollTrigger?.enable();
				},
			});
		});
	},

	cleanup: (element) => {
		if (!element) return;

		getInstance(element)?.modalTween?.kill();
		getInstance(element)?.context?.revert();
		deleteInstance(element);
	},
};

export { animateContentWork };
