import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const animateContentMasonry = {
	init: (element) => {
		if (!element || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger } = getGSAP();

		const context = gsap.context(() => {
			const revealItems = () => {
				const items = element.querySelectorAll('.ContentMasonry__item');
				if (!items.length) return;

				gsap.set(items, {
					opacity: 0,
					y: 56,
					scale: 0.94,
					filter: 'blur(6px)',
					transformOrigin: '50% 80%',
				});

				gsap.to(items, {
					opacity: 1,
					y: 0,
					scale: 1,
					filter: 'blur(0px)',
					duration: config.duration.reveal,
					ease: config.ease.reveal,
					stagger: {
						amount: 0.55,
						from: 'start',
						ease: 'power1.out',
					},
					scrollTrigger: {
						trigger: element,
						start: config.scroll.start,
						end: config.scroll.end,
						toggleActions: config.scroll.toggleActions,
					},
				});

				ScrollTrigger.refresh();
			};

			requestAnimationFrame(() => {
				requestAnimationFrame(revealItems);
			});
		}, element);

		setInstance(element, { context });
	},

	cleanup: (element) => {
		if (!element) return;

		getInstance(element)?.context?.revert();
		deleteInstance(element);
	},
};

export { animateContentMasonry };
