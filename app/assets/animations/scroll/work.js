import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { scrollTriggerConfig } from '~/assets/animations/utils/scroll-reveal.js';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const rowsOf = (root) => root.querySelectorAll('.ContentWork__entries');

const from = {
	opacity: 0,
	y: 72,
	scale: 0.96,
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
		instance = {
			context: gsap.context(() => {}, root),
			modalTween: null,
			scrollTween: null,
		};
		setInstance(root, instance);
	}

	return instance;
};

const animateContentWork = {
	init(root) {
		if (!root || getInstance(root)) return;

		const rows = rowsOf(root);
		if (!rows.length) return;

		const { gsap } = getGSAP();
		const instance = ensureInstance(root);

		instance.context.add(() => {
			gsap.set(rows, from);
			instance.scrollTween = gsap.to(rows, {
				...to,
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				stagger: 0.14,
				scrollTrigger: scrollTriggerConfig(root),
			});
		});
	},

	out(root) {
		if (!root) return;

		const instance = getInstance(root);
		const rows = rowsOf(root);
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

	in(root) {
		if (!root) return;

		const instance = getInstance(root);
		const rows = rowsOf(root);
		if (!instance || !rows.length) return;

		const { gsap } = getGSAP();

		instance.modalTween?.kill();

		instance.context.add(() => {
			instance.modalTween = gsap.to(rows, {
				...to,
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

	cleanup(root) {
		if (!root) return;

		const instance = getInstance(root);
		if (!instance) return;

		instance.modalTween?.kill();
		instance.context?.revert();
		deleteInstance(root);
	},
};

export { animateContentWork };
