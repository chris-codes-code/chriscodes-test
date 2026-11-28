import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const FADED = 0.18;

const getTargets = (root) =>
	[root.querySelector('.ContentText__title'), root.querySelector('.ContentText__text')].filter(Boolean);

const animateContentText = {
	init(root) {
		if (!root || getInstance(root) || prefersReducedMotion()) return;

		const targets = getTargets(root);
		if (!targets.length) return;

		const { gsap, SplitText, ScrollTrigger } = getGSAP();
		const splits = [];

		const context = gsap.context(() => {
			const words = targets.flatMap((target) => {
				const split = SplitText.create(target, {
					type: 'words',
					wordsClass: 'ContentText__split-word',
					aria: 'none',
				});
				splits.push(split);
				gsap.set(target, { opacity: 1 });
				return split.words;
			});

			if (!words.length) return;

			gsap.set(words, { opacity: FADED });

			gsap.to(words, {
				opacity: 1,
				ease: 'none',
				stagger: 0.04,
				scrollTrigger: {
					trigger: root,
					start: 'top 100%',
					end: 'center 25%',
					scrub: 0.35,
				},
			});
		}, root);

		setInstance(root, { context, splits });
		ScrollTrigger.refresh();
	},

	cleanup(root) {
		if (!root) return;

		const instance = getInstance(root);
		if (!instance) return;

		instance.splits?.forEach((split) => split.revert());
		instance.context?.revert();
		deleteInstance(root);
	},
};

export { animateContentText };
