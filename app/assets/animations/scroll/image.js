import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const animateContentImage = {
	init: (element) => {
		if (!element || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger } = getGSAP();
		const media = element.querySelector('.ContentImage__column') || element;

		const context = gsap.context(() => {
			gsap.set(media, {
				opacity: 0,
				y: 64,
				scale: 0.97,
				filter: 'blur(8px)',
				transformOrigin: '50% 80%',
			});

			gsap.to(media, {
				opacity: 1,
				y: 0,
				scale: 1,
				filter: 'blur(0px)',
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				scrollTrigger: {
					trigger: element,
					start: config.scroll.start,
					end: config.scroll.end,
					toggleActions: config.scroll.toggleActions,
				},
			});
		}, element);

		setInstance(element, { context });
		ScrollTrigger.refresh();
	},

	cleanup: (element) => {
		if (!element) return;

		getInstance(element)?.context?.revert();
		deleteInstance(element);
	},
};

export { animateContentImage };
