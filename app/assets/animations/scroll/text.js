import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const animateContentText = {
	init: (element) => {
		if (!element || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger, SplitText } = getGSAP();
		const title = element.querySelector('.ContentText__title');
		const body = element.querySelector('.StyleText');

		const context = gsap.context(() => {
			const targets = [];

			if (title) {
				const titleSplit = SplitText.create(title, {
					type: 'words',
					wordsClass: 'ContentText__split-word',
					aria: 'none',
				});

				gsap.set(titleSplit.words, {
					opacity: 0,
					y: 28,
					filter: 'blur(6px)',
				});

				targets.push({
					elements: titleSplit.words,
					stagger: 0.05,
					delay: 0,
				});
			}

			if (body) {
				const bodySplit = SplitText.create(body, {
					type: 'words',
					wordsClass: 'ContentText__split-word',
					aria: 'none',
				});

				gsap.set(bodySplit.words, {
					opacity: 0,
					y: 18,
					filter: 'blur(6px)',
				});

				targets.push({
					elements: bodySplit.words,
					stagger: 0.03,
					delay: title ? 0.1 : 0,
				});
			}

			if (!targets.length) return;

			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: config.scroll.start,
					end: config.scroll.end,
					toggleActions: config.scroll.toggleActions,
				},
			});

			targets.forEach(({ elements, stagger, delay }) => {
				timeline.to(
					elements,
					{
						opacity: 1,
						y: 0,
						filter: 'blur(0px)',
						duration: config.duration.reveal,
						ease: config.ease.reveal,
						stagger,
					},
					delay,
				);
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

export { animateContentText };
