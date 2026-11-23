import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

/** Promote targets to their own compositor layer. */
const gpu = {
	force3D: true,
	backfaceVisibility: 'hidden',
};

const scrollTriggerVars = (trigger, { start, end } = {}) => ({
	trigger,
	start: start ?? config.scroll.start,
	end: end ?? config.scroll.end,
	toggleActions: config.scroll.toggleActions,
});

/**
 * One-shot scroll reveal: optional from-state, then play on enter.
 * Keeps transform work on the GPU via force3D / backface-visibility.
 */
const reveal = (
	targets,
	{ trigger, from, to, stagger, start, end, duration = config.duration.reveal, ease = config.ease.reveal } = {},
) => {
	const { gsap } = getGSAP();

	if (from) gsap.set(targets, { ...gpu, ...from });

	return gsap.to(targets, {
		...gpu,
		duration,
		ease,
		stagger,
		...to,
		scrollTrigger: scrollTriggerVars(trigger, { start, end }),
	});
};

/**
 * Boilerplate init/cleanup + instance store around a setup() that builds tweens
 * inside a gsap.context. Setup may return extra fields (e.g. scrollTween).
 */
const createScrollReveal = (setup) => {
	const store = createElementInstanceStore();

	return {
		init: (element) => {
			if (!element || prefersReducedMotion()) return;

			const api = getGSAP();
			let extra = null;

			const context = api.gsap.context(() => {
				extra = setup(element, api) || null;
			}, element);

			store.setInstance(element, { context, ...extra });
			api.ScrollTrigger.refresh();
		},

		cleanup: (element) => {
			if (!element) return;

			const instance = store.getInstance(element);
			instance?.modalTween?.kill();
			instance?.context?.revert();
			store.deleteInstance(element);
		},

		getInstance: store.getInstance,
	};
};

export { createScrollReveal, gpu, reveal, scrollTriggerVars };
