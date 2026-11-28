import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { scrollTriggerConfig } from '~/assets/animations/utils/scroll-reveal.js';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const from = {
	opacity: 0,
	y: 56,
	scale: 0.94,
	filter: 'blur(6px)',
	transformOrigin: '50% 80%',
};

const to = {
	opacity: 1,
	y: 0,
	scale: 1,
	filter: 'blur(0px)',
};

const ensureInstance = (root) => {
	let instance = getInstance(root);

	if (!instance) {
		const { gsap } = getGSAP();
		instance = { context: gsap.context(() => {}, root) };
		setInstance(root, instance);
	}

	return instance;
};

const animateContentMasonry = {
	init(root) {
		if (!root || getInstance(root)) return;

		const items = root.querySelectorAll('.ContentMasonry__item');
		if (!items.length) return;

		const { gsap, ScrollTrigger } = getGSAP();
		const instance = ensureInstance(root);

		instance.context.add(() => {
			gsap.set(items, from);
			gsap.to(items, {
				...to,
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				stagger: {
					amount: 0.55,
					from: 'start',
					ease: 'power1.out',
				},
				scrollTrigger: scrollTriggerConfig(root),
			});
			ScrollTrigger.refresh();
		});
	},

	cleanup(root) {
		if (!root) return;

		getInstance(root)?.context?.revert();
		deleteInstance(root);
	},
};

export { animateContentMasonry };
