import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { scrollTriggerConfig } from '~/assets/animations/utils/scroll-reveal.js';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const from = {
	opacity: 0,
	y: 64,
	scale: 0.97,
	filter: 'blur(8px)',
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

const animateContentImage = {
	init(root) {
		if (!root || getInstance(root)) return;

		const media = root.querySelector('.ContentImage__column') || root;
		const { gsap } = getGSAP();
		const instance = ensureInstance(root);

		instance.context.add(() => {
			gsap.set(media, from);
			gsap.to(media, {
				...to,
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				scrollTrigger: scrollTriggerConfig(root),
			});
		});
	},

	cleanup(root) {
		if (!root) return;

		getInstance(root)?.context?.revert();
		deleteInstance(root);
	},
};

export { animateContentImage };
