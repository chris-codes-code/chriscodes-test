import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const getElements = (root) => ({
	primary: root.querySelector('.HeroScroller__container--primary'),
	secondary: root.querySelector('.HeroScroller__container--secondary'),
});

const ensureInstance = (root) => {
	let instance = getInstance(root);

	if (!instance) {
		const { gsap } = getGSAP();
		instance = { context: gsap.context(() => {}, root), timeline: null };
		setInstance(root, instance);
	}

	return instance;
};

const from = {
	autoAlpha: 0,
	yPercent: 18,
	clipPath: 'inset(18% 0 18% 0)',
};

const to = {
	autoAlpha: 1,
	yPercent: 0,
	clipPath: 'inset(0% 0 0% 0)',
	duration: config.duration.intro,
};

const animateLandingIntro = {
	init(root) {
		if (!root || getInstance(root)) return;

		const { gsap, ScrollTrigger } = getGSAP();
		const { primary, secondary } = getElements(root);
		const targets = [primary, secondary].filter(Boolean);
		if (!targets.length) return;

		const instance = ensureInstance(root);

		instance.context.add(() => {
			gsap.set(targets, from);

			instance.timeline = gsap.timeline({
				defaults: {
					ease: config.ease.intro,
				},
			});

			instance.timeline.to(targets, { ...to, stagger: config.intro.secondaryDelay });

			// Scroll fade — separate scrub, armed immediately (idle at scroll 0).
			gsap.fromTo(
				root,
				{
					opacity: 1,
					scale: 1,
				},
				{
					opacity: 0.35,
					scale: 0.97,
					ease: 'none',
					scrollTrigger: {
						trigger: root,
						start: 'top top',
						end: 'bottom top',
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				},
			);

			ScrollTrigger.refresh();
		});
	},

	cleanup(root) {
		if (!root) return;

		const instance = getInstance(root);
		if (!instance) return;

		instance.timeline?.kill();
		instance.context?.revert();
		deleteInstance(root);
	},
};

export { animateLandingIntro };
