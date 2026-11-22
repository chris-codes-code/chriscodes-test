import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const animateContentTitle = {
	init: (element) => {
		if (!element || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger } = getGSAP();

		const context = gsap.context(() => {
			// Only animate the section wrapper — never the marquee track.
			gsap.set(element, {
				clipPath: 'inset(12% 0 12% 0)',
				opacity: 0,
				yPercent: 18,
				scale: 0.97,
				transformOrigin: '50% 50%',
			});

			gsap.to(element, {
				clipPath: 'inset(0% 0 0% 0)',
				opacity: 1,
				yPercent: 0,
				scale: 1,
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				scrollTrigger: {
					trigger: element,
					start: 'top 88%',
					end: 'bottom 12%',
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

export { animateContentTitle };
