import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { scrollTriggerConfig } from '~/assets/animations/utils/scroll-reveal.js';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const from = {
	clipPath: 'inset(12% 0 12% 0)',
	opacity: 0,
	yPercent: 18,
	scale: 0.97,
	transformOrigin: '50% 50%',
};

const to = {
	clipPath: 'inset(0% 0 0% 0)',
	opacity: 1,
	yPercent: 0,
	scale: 1,
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

const animateContentTitle = {
	init(root) {
		if (!root || getInstance(root)) return;

		const { gsap } = getGSAP();
		const instance = ensureInstance(root);

		instance.context.add(() => {
			gsap.set(root, from);
			gsap.to(root, {
				...to,
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				scrollTrigger: scrollTriggerConfig(root, {
					start: 'top 88%',
					end: 'bottom 12%',
				}),
			});
		});
	},

	cleanup(root) {
		if (!root) return;

		getInstance(root)?.context?.revert();
		deleteInstance(root);
	},
};

export { animateContentTitle };
